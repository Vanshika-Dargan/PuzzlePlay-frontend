import React from 'react'
import {Button,Container,Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
const DeadEnd1 = () => {
    const navigate=useNavigate()
  return (
    <>
    <Container sx={{color:'white',display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',marginTop:'150px'}}>
    <Typography variant="h3">You Reached a Dead End</Typography>
    <Typography variant="h1" >"404"</Typography>
    <Button 
  sx={{
    width:"200px",
    backgroundColor: 'secondary.main',
    color: 'white',
    borderRadius: '10px',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: 'secondary.dark'
    },
    
  }} 
  onClick={()=>navigate('/')}
>
  Home
</Button>
    </Container>
    </>
  )
}

export default DeadEnd1