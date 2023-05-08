import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { addDashboardData } from '../../../actions/dashboard';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux'
import { updateTime } from "../../../reducers/gameReducer";
import {updateScore} from '../../../reducers/scoreReducer'
import { Typography,Button,Container } from '@mui/material';
function Game({setFinished}) {
  const time=useSelector((state)=>state.gameReducer.value);
  const finalScore=useSelector((state)=>state.scoreReducer.value);
  const [gameTime, setGameTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime((prevTime) => {
        return prevTime + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem('profile'));
  const duration=time+gameTime;
  const net=finalScore;
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([
    {
      text: "One of your team members is struggling with a task. What do you do?",
      answers: [
        {
          text: "Take over and complete the task for them.",
          score: -1,
        },
        {
          text: "Ask if they need help and provide guidance if necessary.",
          score: 2,
        },
        {
          text: "Ignore it and hope they figure it out on their own.",
          score: -2,
        },
      ],
    },
    {
      text: "Your team is falling behind schedule. What do you do?",
      answers: [
        {
          text: "Push everyone to work harder and longer hours.",
          score: -1,
        },
        {
          text: "Re-evaluate the project timeline and delegate tasks more effectively.",
          score: 2,
        },
        {
          text: "Blame individual team members for the delay.",
          score: -2,
        },
      ],
    },
    {
      text: "You notice a team member struggling with a task. How do you handle it?",
      answers: [
      {
      text: "Ignore it and hope they figure it out on their own.",
      score: -2,
      },
      {
      text: "Offer to help them with the task.",
      score: 1,
      },
      {
      text: "Assign them to a different task to avoid holding up the team.",
      score: 0,
      },
      ],
      },
      {
      text: "Your team is facing a difficult challenge. How do you approach it?",
      answers: [
      {
      text: "Panic and start assigning blame.",
      score: -2,
      },
      {
      text: "Analyze the situation and come up with a plan of action.",
      score: 2,
      },
      {
      text: "Ignore the problem and hope it goes away.",
      score: -1,
      },
      ],
      },
      {
      text: "You receive feedback from a team member that conflicts with your own opinion. How do you handle it?",
      answers: [
      {
      text: "Dismiss their feedback and stick with your own opinion.",
      score: -2,
      },
      {
      text: "Listen to their feedback and consider their perspective.",
      score: 1,
      },
      {
      text: "Get defensive and argue with the team member.",
      score: -1,
      },
      ],
      },
      {
      text: "Your team is experiencing conflict between members. How do you address the situation?",
      answers: [
      {
      text: "Ignore the situation and hope it resolves on its own.",
      score: -1,
      },
      {
      text: "Schedule a team meeting to address the conflict and facilitate discussion.",
      score: 2,
      },
      {
      text: "Take sides and assign blame to individual team members.",
      score: -2,
      },
      ],
      },
      {
      text: "A team member comes to you with a personal issue that is affecting their work. How do you handle it?",
      answers: [
      {
      text: "Tell them to leave their personal problems at home and focus on work.",
      score: -2,
      },
      {
      text: "Listen to their issue and offer support and resources to help them.",
      score: 2,
      },
      {
      text: "Dismiss their issue and tell them to deal with it on their own time.",
      score: -1,
      },
      ],
      }
  ]);

  function handleAnswer(score) {

    setScore(score + score);
    dispatch(updateScore(score));
    setQuestionIndex(questionIndex + 1);
  }

  function dashboard() {
    const userId=user?.result?._id;
   
    dispatch(addDashboardData({userId,duration,net}))
    setFinished(true);
    navigate('/dashboard')
  }

  const currentQuestion = questions[questionIndex];

  return (
    <div>
     
      

      
      {questionIndex < questions.length ? (
        <div >
           <Typography variant="h6" sx={{color:'white',display:'flex',alignItems:'center',justifyContent:'end',marginTop:'10px'}}>Game time: {gameTime} seconds</Typography>
          <Typography variant="h2" sx={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '50px' }}>Let's See How Good Of a Leader You Are?</Typography>
          <Typography variant="body1" sx={{color:'white'}}>{currentQuestion.text}</Typography>
          {currentQuestion.answers.map((answer, index) => (
            <Button sx={{backgroundColor: '#ACB1D6',
            display:'block', 
            color: 'black',borderRadius: '10px',
            padding: '10px 20px',
            marginRight: '10px',
            margin:'10px 0',
            '&:hover': {
              backgroundColor: 'secondary.dark'
            }}} key={index} onClick={() => handleAnswer(answer.score)}>
              {answer.text}
            </Button>
          ))}
        </div>
      ) : (
        <Container sx={{display:'flex', alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:'120px'}}>
          <Typography variant='h1' sx={{color:'white'}}><span>Game over...</span><br/> Your final score is {finalScore}.</Typography>
          {!(user?.result?.email==='admin@gmail.com') && <Button 
  sx={{
    width:"150px",
    backgroundColor: 'secondary.main',
    color: 'white',
    borderRadius: '10px',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: 'secondary.dark',
      marginTop: '40px',
    },
    
  }} 
  onClick={()=>navigate('/')}
>
  Home
</Button>}
          {user?.result?.email==='admin@gmail.com' &&<Button sx={{ 
  backgroundColor: 'primary.main', 
  marginTop:'30px',
  color: 'white',
  borderRadius: '10px',
  padding: '10px 20px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: 'primary.dark'
  }} } onClick={dashboard}>Dashboard</Button>}
        </Container>
      )}
    </div>
  );
}

export default Game;
