import { Devvit, Context, useState, useAsync, useInterval } from '@devvit/public-api';
import { Button } from '../components/button.js';
import OptionsList from '../components/options.js';
import Modal from '../components/modal.js';
import { Countdown } from '../components/countdown.js';
import { Attempts } from '../components/attempts.js';
import { processAttemptedQuestions } from '../utils/processAttemptedQuestions.js';
import { getAttemptedQuestions } from '../components/getAttempted.js';

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
   
  const {data:eventId} = useAsync(async() => {
    return await context.redis.get('eventId') as string //get current event
  })
 


  const {data:userQuestions} = useAsync(async () => {
    const data  =  await context.reddit.getCurrentUser() 
    const userName : any = data?.username
    const avatar = await context.reddit.getSnoovatarUrl(userName)
   
    const userData = {
      userName : userName,
      avatar : avatar
    }
    return userData as any
  })

  const key : string = userQuestions && eventId && 'attempts'+userQuestions.userName+eventId

  const {data} = useAsync(async()=>{
    const event = await context.redis.get('eventId')
    const user = await context.reddit.getCurrentUser()
    const username = user?.username
    return await context.redis.get('attempts'+username+event) as any
  })
const formatted = data && JSON.parse(data)

  const { data:questionNumber, loading:questionNumberLoading } = useAsync(async () => {
    return await context.redis.zRange('questionNumber',0,0,{by:'score'})
  });

  const {data:answeredQuestions} = useAsync(async() => {
    return await context.redis.zRange('questionNumber',1,2,{by:'score'})
  })
  const isInPrevAttempts = formatted && questionNumber && formatted.filter((element:string)=>element===questionNumber[0].member)
  const largest = formatted && Math.max(...formatted.map(Number));
  // const questionIndex : any = data && questionNumber&& isInPrevAttempts === null || isInPrevAttempts === undefined ? questionNumber && questionNumber[0].member: questionNumber && largest ?  questionNumber[largest+1].member:questionNumber&&questionNumber[largest+1].member;
  const questionIndex : any = questionNumber&& isInPrevAttempts && isInPrevAttempts?questionNumber && largest ?  questionNumber[largest===49?largest-1:largest+1].member:questionNumber&&questionNumber[largest+1].member : questionNumber && questionNumber[0].member

  const { data: questionsData, loading: questionsLoading, error } = useAsync(async () => {
    return await context.redis.get('questions') as string
  });
  const {data:setQuestion} = useAsync(
    async () => {
      if (!questionNumber) return null;   
      return await context.redis.zAdd('questionNumber',{member:`${questionIndex}`,score:2})
    },
    {
      depends: data,
    }
  )


//  const {data} =  useAsync(async() => {
//   const data = await context.redis.get(key) as string
//   if(data){
//   return data as string}
//   else return null
//  }, 
//  {
//   depends: { key, userQuestions }
// })

// data && console.log(data)

  const formattedQuestion = questionsData &&  JSON.parse(questionsData)

  question = questionIndex && formattedQuestion && atob(formattedQuestion[questionIndex].question)

  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [checkAnswer, setCheckAnswer] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false);


  // Prepare options for the question
  // const allOptions =
  //    questionIndex && questionsData
  //     ? formattedQuestion.results[questionIndex].incorrect_answers.concat(
  //         formattedQuestion.results[questionIndex].correct_answer
  //       )
  //     : [];
  const allOptions = formattedQuestion && questionIndex && questionsData && formattedQuestion[questionIndex].options 
  const options: Array<{ option: string; background: string; text: string }> = [];

  
  formattedQuestion && questionIndex && questionsData && 
    allOptions.forEach((answer: string) => {
      options.push({ option: atob(answer), background: 'white', text: 'black' });
    });

  const postData = formattedQuestion && questionIndex && userQuestions  &&{ 
    question : atob(formattedQuestion[questionIndex].question),
    answer : atob(formattedQuestion[questionIndex].correct_answer),
    avatar : userQuestions.avatar
  }

  const handleSubmit = async () => {
    if ( 
      questionsData && questionNumber && userQuestions && eventId && key &&
      answer === atob(formattedQuestion[questionIndex].correct_answer)
    ) {
      setModal(true);
      setCheckAnswer('right');
      await context.redis.zAdd('questionNumber',{member:`${questionIndex}`,score:1});
      await context.redis.zIncrBy('ranking',userQuestions.userName,1);
      await context.redis.zIncrBy('attempts',userQuestions.userName+eventId,1);
     
    } else {
      setModal(true);
      setCheckAnswer('wrong');
      const allAttempts = processAttemptedQuestions(formatted,questionIndex)
      await context.redis.zAdd('questionNumber',{member:`${questionIndex}`,score:0})
      await context.redis.set(key,JSON.stringify(allAttempts));
      await context.redis.zIncrBy('attempts',userQuestions.userName+eventId,1) //attempts
    }
  };
  return (
    <blocks>
      <zstack height="100%" width="100%">
        <vstack backgroundColor="#56CCF2" height="100%" width="100%" alignment="center" grow>
      {questionsLoading&&<vstack height="5px" width='100%' />}
       {questionsData&&<Countdown handleSubmit={handleSubmit}/>}

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
                onPress={()=>handleSubmit()}
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
         onPost={async() => {
          const subreddit = await context.reddit.getCurrentSubreddit()
          
          const post = await context.reddit.submitPost({
            title: `${answeredQuestions && answeredQuestions.length + 1}/30 - answered by ${userQuestions.userName}`,
            subredditName: subreddit.name,
            // The preview appears while the post loads
            preview: (
              <vstack height="100%" width="100%" alignment="middle center" backgroundColor='#56ccf2'>
              <image
                url={`loadingIndicator.gif`}
                imageWidth={400}
                imageHeight={400}
                description="Rank Badge"/>
              </vstack>
            ),
          });
          await context.redis.set(post.id, JSON.stringify(postData));
          await context.reddit.approve(post.id)
          setPage('')
          }
        }
       />
        }
      </zstack>
    </blocks>
  );

};
