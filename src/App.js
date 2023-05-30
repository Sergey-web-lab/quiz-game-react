import './index.scss';
import { useState } from 'react';
import sadImg from './img/sad.png';
import round from './img/round.svg';
import wrong from './img/wrong.svg';
import right from './img/right.svg';


const questions = [
  {
    title: 'Ужасная оконная колючка. Что это?',
    variants: [
      'Книга',
      'Пчела',
      'Кактус'
    ],
    correct: 2,
  },
  {
    title: 'Эту посуду мы можем найти в то время, когда играют участники оркестра. Какую?',
    variants: [
      'Блюдца',
      'Тарелки',
      'Чашки'
    ],
    correct: 1,
  },
  {
    title: 'Что можно найти у устаревшего анекдота?',
    variants: [
      'Монокль',
      'Трость',
      'Бороду',
    ],
    correct: 2,
  },
  {
    title: 'Какое количество раз из 25 можно вычесть 3?',
    variants: [
      'Один',
      'Три',
      'Пять',
    ],
    correct: 0,
  },
  {
    title: 'Каждый человек уносит это, если сейчас будет опасность. Что?',
    variants: [
      'Ценности',
      'Ноги',
      'Ботинки',
    ],
    correct: 1,
  },
  {
    title: 'Наполеон полагал, что именно это отделяет великое от смешного. Что?',
    variants: [
      'Один шаг',
      'Верное слово',
      'Усердный труд',
    ],
    correct: 0,
  },
  {
    title: 'И день, и ночь этим заканчиваются. Чем?',
    variants: [
      'Ответом',
      'Сном',
      'Мягким знаком',
    ],
    correct: 2,
  },
];

function Result({ correctChoices }) {
  return (
    <div className="result">
      {
        correctChoices <= questions.length / 2
          ?
          <img src={sadImg} alt="sad image" />
          :
          <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt='success' />
      }

      <h2>Вы правильно ответили на {correctChoices} из {questions.length} вопросов</h2>
      <a href="/">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ question, onClickVariant, step, clickedOnRightChoice, clickedOnWrongChoice }) {

  const percentage = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul id='ul'>
        {question.variants.map((text, index) =>
          <div key={text}>
            <li onClick={() => onClickVariant(index)} >
              {clickedOnRightChoice
                ?
                <img className='img__round' src={right} alt="round" />
                :
                clickedOnWrongChoice
                  ?
                  <img className='img__round' src={wrong} alt="round" />
                  :
                  <img className='img__round' src={round} alt="round" />
              }
              {text}
            </li>
          </div>
        )}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correctChoices, setCorrectChoices] = useState(0);
  const [clickedOnRightChoice, setClickedOnRightChoice] = useState(false);
  const [clickedOnWrongChoice, setClickedOnWrongChoice] = useState(false);
  const question = questions[step];

  const onClickVariant = (index) => {

    setTimeout(() => {
      setStep(step + 1);
      setClickedOnRightChoice(false);
      setClickedOnWrongChoice(false);
    }, 1000)

    if (index === question.correct) {
      setClickedOnRightChoice(true);
      setCorrectChoices(correctChoices + 1);
    } else
      setClickedOnWrongChoice(true);
  }

  return (
    <div className="App">
      {
        step !== questions.length
          ?
          <Game
            step={step}
            question={question}
            onClickVariant={onClickVariant}
            clickedOnRightChoice={clickedOnRightChoice}
            clickedOnWrongChoice={clickedOnWrongChoice}
          />
          :
          <Result correctChoices={correctChoices} />
      }
    </div>
  );
}

export default App;
