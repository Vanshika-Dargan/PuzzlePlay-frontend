import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTime } from "../../../reducers/gameReducer";
import { updateScore } from "../../../reducers/scoreReducer";
import { Typography,Container,Button } from "@mui/material";

function HiddenLinkGame() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const time = useSelector((state) => state.gameReducer.value);
  console.log(time);
  const [gameStarted, setGameStarted] = useState(false);
  const [secretLinkFound, setSecretLinkFound] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [gameTime, setGameTime] = useState(0);

  const handleClick = () => {
    dispatch(updateScore(5));
    navigate("/clue4");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime((prevTime) => {
        return prevTime + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secretLinkFound) {
      dispatch(updateTime(gameTime));
    }
  }, [dispatch, secretLinkFound, gameTime]);

  const startGame = () => {
    setGameStarted(true);
  };

  const handleSecretLinkClick = () => {
    setClickCount(clickCount + 1);

    // Introduce random element that can reset click count
    if (Math.random() < 0.1) {
      setClickCount(0);
    }

    // Trigger fake message when click count reaches a certain number
    if (clickCount >= 9) {
      setSecretLinkFound(true);
    } else if (clickCount === 5) {
      alert("You're on the right track, keep clicking!");
    }
  };

  const renderGame = () => {
    if (secretLinkFound) {
      // Change the message displayed to make the player think they have found the link, but it leads to a dead-end
      return (
        <div>
          <Container sx={{textAlign: 'center', padding: '20px', display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'150px'}}>
  <Typography sx={{color: 'white', fontSize: '2rem', marginBottom: '10px'}}>Congratulations, you found the hidden link!</Typography>
  <Button color='primary' sx={{ backgroundColor: 'primary.main', 
  color: 'white',
  borderRadius: '10px',
  padding: '10px 20px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: 'primary.dark'}}} onClick={handleClick}>Proceed</Button>
</Container>

        </div>
      );
    } else {
      return (
        <div>
         <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'50px'}}>
  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: '1rem' }}>
    Find the hidden link!
  </Typography>
  <Typography sx={{ color: 'white', mb: '2rem' }}>
    Somewhere on this page, there's a hidden link waiting to be found. But be careful - it won't be easy to find!
  </Typography>
  {clickCount === 5 && <Typography sx={{ color: 'white', mb: '1rem' }}>You're on the right track, keep clicking!</Typography>}
  <Button sx={{ color: '#2A2F4F', mb: '2rem' }} onClick={handleSecretLinkClick}>
    Click me!
  </Button>
</Container>

        </div>
      );
    }
  };

  return (
    <div>
      <Typography variant="h6" sx={{color:'white',display:'flex',alignItems:'center',justifyContent:'end',marginTop:'10px'}}>Game time: {gameTime} seconds</Typography>
      {!gameStarted ? (
        <Container sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          marginTop: '10px',
        }}>
          <Typography sx={{ 
            fontWeight: 'bold', 
            fontSize: '2rem', 
            marginBottom: '20px',
            textAlign: 'center',
            color: '#333'
          }}>
            You've Made It This Far! Great Work!
          </Typography>
          <Button sx={{ 
            backgroundColor: '#3f51b5',
            color: '#fff',
            borderRadius: '5px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#303f9f',
            }
          }} onClick={startGame}>
            Move Forward
          </Button>
        </Container>
        
      ) : (
        renderGame()
      )}
    </div>
  );
}

export default HiddenLinkGame;
