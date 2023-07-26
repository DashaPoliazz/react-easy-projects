import React, { useState } from "react";
import "./style/index.scss";

const questions = [
  {
    title: "React is .... ?",
    variants: ["library", "framework", "application"],
    correct: 0,
  },
  {
    title: "A component is .... ",
    variants: [
      "application",
      "part of an application or page",
      "something I don't know what it is",
    ],
    correct: 1,
  },
  {
    title: "What is JSX?",
    variants: [
      "It's simple HTML",
      "It's a function",
      "It's the same HTML, but with the ability to execute JS code",
    ],
    correct: 2,
  },
];

type ResultProps = {
  guessed: number;
  onStart: () => void;
};

const Result: React.FC<ResultProps> = ({ guessed, onStart }) => {
  return (
    <div className="result">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
        alt="End game icon"
      />
      <h2>
        You guessed {guessed} out of {questions.length} answers
      </h2>
      <button onClick={onStart}>Try again</button>
    </div>
  );
};

type QuestionProps = {
  title: string;
  variants: string[];
  onAnswer: (answerIndex: number) => void;
  step: number;
};

const Question: React.FC<QuestionProps> = ({
  title,
  variants,
  onAnswer,
  step,
}) => {
  const progress = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${progress}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{title}</h1>
      <ul>
        {variants.map((variant, i) => (
          <li onClick={() => onAnswer(i)} key={i}>
            {variant}
          </li>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  const [step, setStep] = useState(0);
  const [guessed, setGuessed] = useState(0);

  const handleStep = (answerIndex: number) => {
    setStep(step + 1);

    if (answerIndex === questions[step].correct) {
      setGuessed(guessed + 1);
    }
  };

  const handleStart = () => {
    setStep(0);
    setGuessed(0);
  };

  return (
    <div className="App">
      {step < questions.length ? (
        <Question
          title={questions[step].title}
          variants={questions[step].variants}
          onAnswer={handleStep}
          step={step}
        />
      ) : (
        <Result guessed={guessed} onStart={handleStart} />
      )}
    </div>
  );
};

export default App;
