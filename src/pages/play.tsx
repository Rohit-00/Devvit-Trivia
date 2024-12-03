import { Devvit, Context, useState, useAsync, useChannel } from '@devvit/public-api';
import { Button } from '../components/button.js';
import { ModalButton } from '../components/modalButton.js';
import { shuffleArray } from '../utils/shuffleOptions.js';
import OptionsList from '../components/options.js';
import Modal from '../components/modal.js';

Devvit.configure({
  realtime: true,
  redis: true,
});

type Question = {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
};

type FormattedQuestions = Record<string, Question>;

type PlayPageProps = {
  context: Context;
  setPage: (page: string) => void;
};

export const PlayPage = ({ context, setPage }: PlayPageProps) => {
  let question: string | undefined;

  // Async hook to fetch the question number from Redis
  const { data: keyData, loading: keyLoading } = useAsync(async () => {
    const allKey = await context.redis.zRange('quetionNumber', 0, 1, { by: 'score' });
    return allKey;
  });

  const questionNumber: string | undefined = keyData ? keyData[0].member : undefined;

  // Async hook to fetch all questions from Redis
  const { data: questionsData, loading: questionsLoading, error } = useAsync(async () => {
    return (await context.redis.get('questions')) as string;
  });

  const formattedQuestions: FormattedQuestions | undefined = questionsData ? JSON.parse(questionsData) : undefined;

  question = questionNumber && formattedQuestions ? atob(formattedQuestions[questionNumber].question) : undefined;

  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);

  const changePage = (page: string) => {
    setPage(page);
  };

  // Prepare options for the question
  const allOptions =
    questionNumber && formattedQuestions
      ? formattedQuestions[questionNumber].incorrect_answers.concat(
          formattedQuestions[questionNumber].correct_answer
        )
      : [];

  const options: Array<{ option: string; background: string; text: string }> = [];

  questionNumber &&
    formattedQuestions &&
    allOptions.forEach((answer: string) => {
      options.push({ option: atob(answer), background: 'white', text: 'black' });
    });

  const handleSubmit = async () => {
    if (
      questionNumber &&
      formattedQuestions &&
      answer === atob(formattedQuestions[questionNumber].correct_answer).toString()
    ) {
      setModal(true);
      setAnswer('right');
      try {
        const data = await context.redis.zAdd('quetionNumber', { member: questionNumber, score: 2 });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setModal(true);
      setAnswer('wrong');
    }
  };

  return (
    <blocks>
      <zstack height="100%" width="100%">
        <vstack backgroundColor="#56CCF2" height="100%" width="100%" alignment="center" grow>
          <spacer size="medium" />
          <hstack alignment="end" width="90%" gap="large">
            <zstack alignment="start top">
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
                onPress={() => changePage('none')}
              >
                <icon name="close-fill" color="white" size="large"></icon>
              </hstack>
            </zstack>
          </hstack>

          <hstack>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity-fill" color="#D93A00" size="large"></icon>
            <icon name="activity" color="#D93A00" size="large"></icon>
          </hstack>

          <spacer />

          <text>{answer}</text>

          {questionsLoading && keyLoading && (
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

          {keyData && questionsData && (
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

          {keyData &&
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

          {keyData && questionsData && (
            <Button label="Submit" background="#D93A00" textColor="white" onClick={handleSubmit} />
          )}
        </vstack>

        {modal && 
         <Modal
         answer={answer}
         onClose={() => setPage('')}
         onRetry={() => setPage('')}
         onPost={() => setPage('')}
       />
        }
      </zstack>
    </blocks>
  );
};
