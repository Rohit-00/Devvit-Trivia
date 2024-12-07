import { Devvit, Context, useState, useAsync, useInterval } from '@devvit/public-api';
import { Button } from '../components/button.js';
import OptionsList from '../components/options.js';
import Modal from '../components/modal.js';
import { Countdown } from '../components/countdown.js';
import { Attempts } from '../components/attempts.js';
import { processAttemptedQuestions } from '../utils/processAttemptedQuestions.js';


Devvit.configure({
  realtime: true,
  redis: true,
  redditAPI:true
});


type PlayPageProps = {
  context: Context;
  setPage: (page: string) => void;
};

export const PlayPage = ({ context, setPage }: PlayPageProps) => {
  let question: string | undefined;

 
  const { data:questionNumber, loading:questionNumberLoading } = useAsync(async () => {
    return await context.redis.zRange('questionNumber',0,0,{by:'score'})
  });

  const {data:userQuestions} = useAsync(async () => {
    const data  =  await context.reddit.getCurrentUser() 
    const userName : any = data?.username
   
    const userData = {
      userName : userName,

    }
    return userData as any
  })



  const questionIndex : any = questionNumber && questionNumber[0].member;

   questionNumber && console.log('member',questionNumber[0].member)

  const { data: questionsData, loading: questionsLoading, error } = useAsync(async () => {
    return await context.redis.get('questions') as string
  });



  const {data} = useAsync(
    async () => {
      if (!questionNumber) return null;   
      // Use firstData in your second async operation
      return await context.redis.zAdd('questionNumber',{member:`${questionIndex}`,score:2})
    },
    {
      depends: questionNumber,
    }
  )


  const formattedQuestion = questionsData &&  JSON.parse(questionsData)

  question = questionsData && questionIndex && atob(formattedQuestion.results[questionIndex].question)

  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [checkAnswer, setCheckAnswer] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false);


  // Prepare options for the question
  const allOptions =
     questionIndex && questionsData
      ? formattedQuestion.results[questionIndex].incorrect_answers.concat(
          formattedQuestion.results[questionIndex].correct_answer
        )
      : [];

  const options: Array<{ option: string; background: string; text: string }> = [];

  
    questionsData &&
    allOptions.forEach((answer: string) => {
      options.push({ option: atob(answer), background: 'white', text: 'black' });
    });

  const handleSubmit = async () => {
    if ( 
      questionsData && questionNumber && userQuestions &&
      answer === atob(formattedQuestion.results[questionIndex].correct_answer)
    ) {
      setModal(true);
      setCheckAnswer('right');
      await context.redis.zIncrBy('ranking',userQuestions.userName,1)
      await context.redis.zIncrBy('attempts',userQuestions.userName+context.postId?.toString(),1) 

      await context.redis.zAdd('questionNumber',{member:`${questionIndex}`,score:1})
      
     
    } else {

      await context.redis.zAdd('questionNumber',{member:`${questionIndex}`,score:0})
      setModal(true);
      setCheckAnswer('wrong');
      await context.redis.zIncrBy('attempts',userQuestions.userName+context.postId,1) 
      
    }
  };
  return (
    <blocks>
      <zstack height="100%" width="100%">
        <vstack backgroundColor="#56CCF2" height="100%" width="100%" alignment="center" grow>
       <Countdown handleSubmit={handleSubmit}/>
          <spacer />
          <hstack width="100%" alignment="middle">
              <hstack width="30%" alignment="start">
                <spacer/>
                <spacer/>
            </hstack>
                <hstack width="40%" alignment="center">
            <Attempts context={context} />
              </hstack>
          <hstack alignment="end" width="30%" >
            <zstack alignment="start top">
              {/* Shadow */}
              <vstack width="100%" height="100%">
                <spacer height="3px" />
                <hstack width="100%" height="100%">
                  <spacer width="3px" />
                  <hstack height="35px" width="35px" backgroundColor="black" cornerRadius="small" />
                </hstack>
              </vstack>
              <hstack
                backgroundColor="#D93A00"
                padding="xsmall"
                cornerRadius="small"
                border="thick"
                borderColor="black"
                onPress={()=>setPage('')}
              >
                <icon name="close-fill" color="white" size="large"></icon>
                
              </hstack>
            </zstack>
            <spacer/>
          </hstack>
              
</hstack>
          <spacer />

          {questionsLoading && (
            <text
              overflow="ellipsis"
              color="white"
              size="xxlarge"
              alignment="center"
              wrap
              width="100%"
              weight="bold"
            >
              Loading
            </text>
          )}

          { questionsData && (
            <text
              overflow="ellipsis"
              color="white"
              size="xxlarge"
              alignment="center"
              wrap
              width="100%"
              weight="bold"
            >
              {question!}
            </text>
          )}
          <spacer />

          {
            questionsData &&
              <OptionsList
          options={options}
          selected={selected}
          onSelect={(index, option) => {
          setSelected(index);
          setAnswer(option);
        }}
      />}
          <spacer size="small" />

          {questionsData && questionNumber&&(
            <Button label="Submit" background="#D93A00" textColor="white" onClick={handleSubmit} />
          )}
        </vstack>

        {modal && 
         <Modal
         answer={checkAnswer}
         onClose={() => setPage('')}
         onRetry={() => setPage('')}
         onPost={() => setPage('')}
       />
        }
      </zstack>
    </blocks>
  );

};
