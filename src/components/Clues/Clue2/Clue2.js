import React, { useState,useEffect} from "react";
import "./MagicSquare.css";
import { updateTime } from "../../../reducers/gameReducer";
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {updateScore} from '../../../reducers/scoreReducer'
import { Typography,Container,Button} from "@mui/material";
function MagicSquare({updateTotalTime}) {
  const navigate=useNavigate();
  const time=useSelector((state)=>state.gameReducer.value);
  const dispatch=useDispatch();
  const [gameTime, setGameTime] = useState(0);
  const [grid, setGrid] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime((prevTime) => {
        return prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCellChange = (rowIndex, colIndex, event) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = parseInt(event.target.value, 10) || null;
    setGrid(newGrid);
  };
  const handleSubmit=()=>{
    dispatch(updateTime(gameTime))
    navigate('/clue3')
  }
  const checkSolution = () => {
    const rowSums = [0, 0, 0];
    const colSums = [0, 0, 0];
    let diagonalSum1 = 0;
    let diagonalSum2 = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        rowSums[i] += grid[i][j];
        colSums[j] += grid[i][j];
        if (i === j) {
          diagonalSum1 += grid[i][j];
        }
        if (i + j === 2) {
          diagonalSum2 += grid[i][j];
        }
      }
    }

    const sums = [...rowSums, ...colSums, diagonalSum1, diagonalSum2];
   
    if(sums.every((sum) => sum === 15)===true)
    dispatch(updateScore(5));
    else
    navigate('/deadend1');
  };
 
  return (
    <>
    <Typography variant="h6" sx={{color:'white',display:'flex',alignItems:'center',justifyContent:'end',marginTop:'10px'}}>Game time: {gameTime} seconds</Typography>
   
    <div className="magic-square">
      
      <Container sx={{  color: 'white', padding: '20px' }}>
  <Typography variant="h4">The Maaaaagic Square</Typography>
  <Typography>
    A magic square is a square grid filled with numbers such that the sum of
    each row, column, and diagonal is the same. Your task is to create a 3x3
    magic square using the numbers 1 to 9.
  </Typography>
  
</Container>

      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    value={cell || ""}
                    onChange={(event) =>
                      handleCellChange(rowIndex, colIndex, event)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Container sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Button sx={{ 
  backgroundColor: 'primary.main', 
  color: 'white',
  borderRadius: '10px',
  padding: '10px 20px',
  marginRight: '10px',
  '&:hover': {
    backgroundColor: 'primary.dark'
  }
}} onClick={checkSolution}>See Solution</Button>

<Button sx={{ 
  backgroundColor: 'secondary.main', 
  color: 'white',
  borderRadius: '10px',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: 'secondary.dark'
  }
}} onClick={handleSubmit}>Submit</Button>

</Container>
    </>
  );
}

export default MagicSquare;
