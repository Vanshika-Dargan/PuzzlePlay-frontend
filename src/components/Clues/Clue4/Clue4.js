import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTime } from '../../../reducers/gameReducer';
import { useDispatch } from 'react-redux';
import { updateScore } from '../../../reducers/scoreReducer';
import { Container, Typography,Button} from '@mui/material';

const EmotionalIntelligenceGame = () => {
  const navigate = useNavigate();
  const [gameTime, setGameTime] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(prevTime => {
        return prevTime + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    dispatch(updateTime(gameTime));
  }, [gameOver, dispatch, gameTime]);

  const questions = [
    {
      question: 'Which emotion does this face represent? 🤔',
      options: ['Deep Thought', 'Sadness', 'Anger'],
      correctAnswer: 0,
    },
    {
      question: 'Which emotion does this face represent? 😢',
      options: ['Sadness', 'Happiness', 'Anger'],
      correctAnswer: 0,
    },
    {
      question: 'Which emotion does this face represent? 😠',
      options: ['Anger', 'Happiness', 'Sadness'],
      correctAnswer: 0,
    },
  ];

  const handleAnswer = selectedOption => {
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setAnswerStatus('Correct');
      setScore(score + 1);
    } else {
      setAnswerStatus('Incorrect');
    }

    setTimeout(() => {
      if (currentQuestion === questions.length - 1) {
        setGameOver(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setAnswerStatus(null);
      }
    }, 1000);
  };

  const handleClick = () => {
    dispatch(updateScore(score));
    navigate('/clue5');
  };

  return (
    <Container sx={{color:'white'}}>
      <Typography variant="h6" sx={{color:'white',display:'flex',alignItems:'center',justifyContent:'end',marginTop:'10px'}}>Game time: {gameTime} seconds</Typography>
      
      {gameOver ? (
        <Container sx={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:"100px"}}>
          <Typography variant="h2">Fanstastic Job!</Typography>
          <Button sx={{backgroundColor: 'primary.main',
              width:"200px",
              display:'block', 
              color: 'white',borderRadius: '10px',
              padding: '10px 20px',
              marginRight: '10px',
              margin:'15px 0',
              '&:hover': {
                backgroundColor: 'primary.dark'}}}onClick={handleClick}>Proceed</Button>
        </Container>
      ) : (
        <Container >
          <Typography variant="h2" sx={{color:'white',marginBottom:"50px",marginLeft:'10px'}}>Feelings In a Hat 🎩</Typography>
          <Typography variant="body1" sx={{}}>Question {currentQuestion + 1}</Typography>
          <Typography variant="h5">{questions[currentQuestion].question}</Typography>
          <Container>
            {questions[currentQuestion].options.map((option, index) => (
              <Button sx={{backgroundColor: '#ACB1D6',
              width:"200px",
              display:'block', 
              color: 'black',borderRadius: '10px',
              padding: '10px 20px',
              marginRight: '10px',
              margin:'15px 0',
              '&:hover': {
                backgroundColor: 'secondary.dark'
              }}} key={index} onClick={() => handleAnswer(index)}>
                {option}
              </Button>
            ))}
          </Container>
          {answerStatus && <Typography>{answerStatus}</Typography>}
        </Container>
      )}
    </Container>
  );
};

export default EmotionalIntelligenceGame;

