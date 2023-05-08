import React,{useState} from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar.js"
import Home from './components/Home/Home'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Clue1 from "./components/Clues/Clue1/Clue1.js";
import Clue2 from "./components/Clues/Clue2/Clue2.js";
import Clue3 from "./components/Clues/Clue3/Clue3.js";
import Clue4 from "./components/Clues/Clue4/Clue4.js";
import Clue5 from "./components/Clues/Clue5/Clue5.js";
import DeadEnd1 from "./components/DeadEnd/DeadEnd1/DeadEnd1.js"
import Dashboard from "./components/Dashboard/Dashboard.js";

const App = () => {

  const [finished,setFinished]=useState(false);
 
  const theme = createTheme({
    palette: {
        primary: {
            main: '#98D8AA',
        },
        secondary: {
            main: '#F7D060',
        },
       
    },
    
});
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Container maxWidth="xl" sx={{backgroundColor:'#2A2F4F'}}>
      
      <Routes>
        <Route path="/home" element={<Navbar finished={finished} setFinished={setFinished}/>}/>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/deadend1" element={<DeadEnd1/>}/>
        <Route  path="/dashboard" element={user?.result?.email==='admin@gmail.com'&&<Dashboard/>}/>
        <Route key={window.location.pathname} path="/clue1" element={user&&<Clue1 />}/>
        <Route path="/clue2" element={user&&<Clue2 />}/>
        <Route path="/clue3" element={user&&<Clue3 />}/>
        <Route path="/clue4" element={user&&<Clue4 />}/>
        <Route path="/clue5" element={user&&<Clue5 setFinished={setFinished}/>}/>
        <Route path="/auth" element={!user?<Auth/>:<Navigate to="/home"/>}/>
      </Routes>
      
    </Container>
    </ThemeProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};
export default App;