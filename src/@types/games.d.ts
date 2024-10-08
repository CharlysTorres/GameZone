
export interface RulesProps {
  step: number;
  description: string;
}

export interface QuestionProps {
  id: number;
  xp: number;
  title: string;
  questions: QuestionContentProps[];
}

export interface QuestionContentProps {
  id: number;
  title: string;
}

export interface GamesProps {
  id: number;
  name: string;
  description: string;
  objective: string;
  category: string;
  icon: string;
  indication: number;
  rules: RulesProps[];
  questions: QuestionProps[];
  testAnswerKey: { [key: string]: string};
}
