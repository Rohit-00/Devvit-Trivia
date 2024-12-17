type Question = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers?: string[]; // Optional since it will be removed
};

type ApiResponse = {
  response_code: number;
  results: Question[];
};

type ProcessedQuestion = Omit<Question, 'incorrect_answers'> & {
  options: string[];
};

export const  shuffleArray =(array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

export function processQuestionData(data: ApiResponse): ProcessedQuestion[] {
  return data.results.map((question) => {
    // Combine correct answer with incorrect answers
    const options = question.incorrect_answers
      ? [...question.incorrect_answers, question.correct_answer]
      : [question.correct_answer];

    // Shuffle the options
    const shuffledOptions = shuffleArray(options);

    // Remove `incorrect_answers` field and add `options`
    const { incorrect_answers, ...rest } = question;
    return {
      ...rest,
      options: shuffledOptions,
    };
  });
}