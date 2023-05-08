import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../actions/dashboard';
import { Button,Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate=useNavigate();
  const { dashboardData } = useSelector(state => state.dashboard);
  console.log(dashboardData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  return (
    <>
    <div style={{ padding: '24px' }}>
    <Button 
  sx={{
    display: 'flex',
    backgroundColor: 'secondary.main',
    color: 'white',
    borderRadius: '10px',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: 'secondary.dark'
    },
    ml: 'auto' // Add ml-auto to push the button to the right end of the container
  }} 
  onClick={()=>navigate('/home')}
>
  Home
</Button>


    
      <Typography variant="h4" sx={{ mb: '16px',color:'white',display:'flex',justifyContent:'center'}}>Dashboard</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {dashboardData?.map(item => (
          <ListItem key={item.name} sx={{ mb: '8px' }}>
            <ListItemText
              primary={item.name}
              secondary={`Duration: ${item.duration} | Score: ${item.net}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
    </>
  );
};

export default Dashboard;
