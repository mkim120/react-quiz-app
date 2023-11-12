//import logo from './logo.svg';
import './App.css';

import { useState } from 'react';

function App() {
  const questions = [
    {
      question: 'What was able to kill Godzilla in the original 1954 film?',
      answerOptions: [
        { answer: 'A Volcano', isCorrect: false },
        { answer: 'The Oxygen Destroyer', isCorrect: true },
        { answer: 'Tankers full of Coagulant', isCorrect: false },
        { answer: 'Nuclear Bombs', isCorrect: false },
      ],
      comment: 'The Oxygen Destroyer was a powerful weapon that eliminated all oxygen from the surrounding area, suffocating and disintegrating any living organism within its range. It was created by Dr. Daisuke Serizawa, a scientist who sacrificed himself to use the weapon against Godzilla after realizing the destructive power it held and fearing it would lead to another arms race.',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Godzilla_%281954%29.jpg/1280px-Godzilla_%281954%29.jpg',
    },
    {
      question: 'What is the name of the team who assists Ultraman Z?',
      answerOptions: [
        { answer: 'S.T.O.R.A.G.E.', isCorrect: true },
        { answer: 'Z.A.T.', isCorrect: false },
        { answer: 'E.G.I.S.', isCorrect: false },
        { answer: 'T.P.U.', isCorrect: false },
      ],
      comment: 'STORAGE (Special Tactical Operations Regimental Airborne and Ground Equipment) is a unit that deals with the use of robot mechas in order to combat daily monster attacks and participate in rescue missions.',
      img: 'ultramanz.png',
    },
    {
      question: 'Who is the son of Bright Noa?',
      answerOptions: [
        { answer: 'Cheimin', isCorrect: false },
        { answer: 'Char', isCorrect: false },
        { answer: 'Mirai', isCorrect: false },
        { answer: 'Hathaway', isCorrect: true },
      ],
      comment: 'Hathaway Noa is the son of Bright and Mirai Noa, and the older brother of Cheimin Noa. He is a supporting character in Mobile Suit Zeta Gundam and Mobile Suit Gundam: Char\'s Counterattack, and later the titular protagonist of Mobile Suit Gundam: Hathaway.',
      img: 'https://media.tenor.com/AG7aUF56g4oAAAAC/amuro-ray-gundam.gif',
    },
    {
      question: 'What does the "SSSS" stand for in "SSSS.Dynazenon"?',
      answerOptions: [
        { answer: 'Superhuman Samurai Syber-Squad', isCorrect: false },
        { answer: 'Scarred Souls Shine like Stars', isCorrect: true },
        { answer: 'Special Signature to Save a Soul', isCorrect: false },
        { answer: 'Special Science Search Squad', isCorrect: false },
      ],
      comment: 'The meaning of the acronym differs from the previous installment, SSSS.Gridman, where it is revealed to stand for "Special Signature to Save a Soul". The SSSS in both series was included as a reference to the American television series "Superhuman Samurai Syber-Squad", an adaptation of the Tsuburaya Productions series "Gridman the Hyper Agent".',
      img: 'https://www.bs11.jp/anime/img/ssssdynazenon_main_1.jpg',
    },
  ];

  // initialize state objects
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswered, setUserAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerClick = (answerValue) => {
    // after user selects an answer, show correct answer with explanation if available
    setUserAnswered(true);
    setSelectedAnswer(answerValue);

    // increment score when answer is correct
    const isCorrect = questions[currentQuestion].answerOptions.find(option => option.answer === answerValue).isCorrect;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    // move on to the next question
    setUserAnswered(false);
    setSelectedAnswer(null);

    // increment currentQuestion when user clicks answer
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // show results screen at the end of the quiz
      setShowScore(true);
    }
  };

  // determine which image to show based on the user's score
  const getScoreImage = () => {
    return score > questions.length / 2 ? 'ultraman-up.gif' : 'https://media.tenor.com/UuYA_M3CvBcAAAAC/ultraman-ultraman-gaia.gif';
  };


  // update states and re-render quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
  }

  return (
    <div className='app'>
      {/* if showScore true, render score section, else show next question */}
			{showScore ? (
        <div className="score-container">
          <div className='score-section'>Your Score: {score} out of {questions.length}</div>
          <img src={getScoreImage()} alt="Result Image" />
          <div className="restart-button"><button onClick={restartQuiz}>Restart quiz</button></div>
        </div>
			) : (
				<> {/* React Fragment 
      https://react.dev/reference/react/Fragment */}
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}/{questions.length}</span>
						</div>
            <img src={questions[currentQuestion].img} alt={`Question ${currentQuestion + 1} Image`} />
						<div className='question-text'>{questions[currentQuestion].question}</div>
					</div>
					<div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <div key={index}>
                <button onClick={() => handleAnswerClick(answerOption.answer)} 
                  disabled={userAnswered} 
                  style={{
                    backgroundColor:
                      userAnswered && answerOption.answer === selectedAnswer
                        ? answerOption.isCorrect
                          ? '#2f922f' // green if true
                          : '#ff3333' // else red
                        : 'initial',
                  }}>
                  {answerOption.answer}
                </button>
              </div>
            ))}
            {/* show correct answer after user selects incorrect answer */}
            {userAnswered && !questions[currentQuestion].answerOptions.find(option => option.answer === selectedAnswer).isCorrect && (
              <div className="correct-answer">
                Correct Answer: {questions[currentQuestion].answerOptions.find(option => option.isCorrect).answer}
                <br/>
              </div>
            )}
            {/* show next question button */}
            {userAnswered && !showScore && (
              <>
                <div className="comment">
                  {questions[currentQuestion].comment}
                </div>
                <div className="next-question-button">
                  <button onClick={handleNextQuestion}>Next</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
