import React from 'react';
import {Container,Button, Typography }from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate=useNavigate();
  return (
    <Container sx={{display:"flex",alignItem:"center",justifyContent:"center"}}>
      <Typography variant='h3' sx={{color:'white'}}>Welcome to my game</Typography>
      <Button variant="contained" color="primary" size="large" onClick={()=>navigate('/clue1')}>
        Start Game
      </Button>
    </Container>
  );
};

export default Home;


