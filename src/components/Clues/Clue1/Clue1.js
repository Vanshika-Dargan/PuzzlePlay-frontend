import React,{useState,useEffect} from 'react'
import YouTube from 'react-youtube'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { updateTime } from '../../../reducers/gameReducer'
import {updateScore} from '../../../reducers/scoreReducer'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, Typography, Button, TextField} from '@mui/material'
import './styles.css'
const Clue1 = () => {
  const location=useLocation();
 
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [gameTime, setGameTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0)
  const [hasWatched,setHasWatched]=useState(false);
  const [answer, setAnswer] = useState("");

   const handleWatch = (event) => {
    setVideoDuration(event.target.getDuration()); // set the video duration when the video starts playing
  }
  const handleStateChange = (event) => {
    if (event.data === 1) { // 1 represents 'playing' state
      const timer = setInterval(() => {
        if (event.target.getCurrentTime() >= 40) { // pause the video after 60 seconds
          setHasWatched(true);
          clearInterval(timer);
        }
      }, 1000);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTime(gameTime));
    if(answer==="16")
    dispatch(updateScore(5));
    navigate('/clue2')
  };


  useEffect(()=>{
    
    const timer=setTimeout(() => {
      setGameTime(gameTime+1);
      
    }, 1000);}
    ,[gameTime]);

  const opts={
    height:"350",
    width:"640",
    playerVars:
    {
      autoplay:1,
    }
  };
  
  const videoId='IGQmdoK_ZfY';
  return (
    <>
      <div>
      <Typography variant="h6" sx={{color:'white',display:'flex',alignItems:'center',justifyContent:'end',marginTop:'10px'}}>Game time: {gameTime} seconds</Typography>
      
    
    </div>
      {!hasWatched &&(
        <>
        <Typography
  sx={{
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    
    fontSize: '2.0rem',
    color: 'white',
    marginTop:'90px',
    marginBottom:'20px'
  }}
>
Keep your eyes peeled while the video reveals!
</Typography>
        <Container sx={{ display: 'flex',  justifyContent: 'center'}}>
      <YouTube videoId={videoId} opts={opts} onStateChange={handleStateChange} onPlay={handleWatch}/>
    </Container>
    </>
    )}
    {
      hasWatched &&(
        <form onSubmit={handleSubmit}>
          <Typography sx={{display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    
    fontSize: '2.0rem',
    color: 'white',
    marginTop:'90px',
    marginBottom:'20px'}}>So how attentive you are? </Typography>
    <Container sx={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
}}>
  <TextField 
    type="text"
    id="answer"
    value={answer}
    onChange={(event) => setAnswer(event.target.value)}
    sx={{
      fontSize: '2.0rem',
      color: 'white',
      border: '1px solid white',
      borderRadius: '5px',
      padding: '10px',
      backgroundColor: 'transparent',
      marginBottom: '20px',
      width: '50%',
      maxWidth: '400px',
      boxSizing: 'border-box',
    }} 
  />
  <Button  
    sx={{
      color: 'white',
      backgroundColor: 'primary.main',
      borderRadius: '5px',
      padding: '10px 20px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    }} 
    type="submit"
  >
    Submit
  </Button>
</Container>

        </form>
      )
      
    }
   
    </>
  )
}

export default Clue1
