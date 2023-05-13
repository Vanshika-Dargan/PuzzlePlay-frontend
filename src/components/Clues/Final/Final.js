import { Button, Typography,Container} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDashboardData } from "../../../actions/dashboard";
import { useNavigate } from "react-router-dom";
const Final = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const duration = useSelector((state) => state.gameReducer.value);
  console.log(duration);
  const net = useSelector((state) => state.scoreReducer.value);
  console.log(net);
  const user = JSON.parse(localStorage.getItem("profile"));
  const handleClick = () => {
    const userId = user?.result?._id;
    dispatch(addDashboardData({ userId, duration, net }));
    navigate("/");
  };
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "200px",
          color:'white'
        }}
      >
        
        <Typography variant='h4'>
          Congratulations! You have successfully completed the game
        </Typography >
        <Container sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',margin:'10px'}}>
        <Typography fontSize='25px'>Your score is {net}</Typography>
        <Typography fontSize='25px'>You completed the game in {duration} seconds</Typography>
        </Container>
        <Button
          sx={{
            width: "150px",
            backgroundColor: "secondary.main",
            color: "white",
            borderRadius: "10px",
            padding: "10px 20px",
           
          }}
          onClick={handleClick}
        >
          Home
        </Button>
      </Container>
    </div>
  );
};

export default Final;
