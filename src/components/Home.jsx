import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Input,
  Stack,
} from '@mui/material';
 
const Home = () => {
  const [step, setStep] = useState('userInfo');
  const vehicle = ['a', 'b', 'c', 'd'];
  const model = ['x', 'y', 'z', 'f'];

  const wheel = ["2", "4"]
  
  const [info, setInfo] = useState({
    fname: '',
    lname: '',
    wheel: '',
    vehicleType: '',
    model: '',
    startDate: '',
    endDate: '',
  });

 //api call to send data
  const handleSubmit = () => {
    
  };

  const handleChangeWheel = (event) => {
    const wheel = event.target.value;
    setInfo({ ...info, wheel: wheel });
  };

  const handleChangeVehicle = (event) => {
    const vehicle = event.target.value;
    setInfo({ ...info, vehicleType: vehicle });
  };

  const handleChangeModel = (event) => {
    const model = event.target.value;
    setInfo({ ...info, model: model });
  };


  const changeScreen = (screen) => {
    setStep(screen)
    console.log(step)
  }

 

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        {/* user info */}
        {step === 'userInfo' && (
          <Grid item xs={3} style={{ margin: '10px' }}>
            <Typography
              style={{
                color: '#0B3558',
                fontWeight: 'bold',
                fontSize: '3rem',
              }}
              align="center"
            >
              What is your name
            </Typography>
            <form>
              <Typography>First Name</Typography>
              <TextField
                label="First Name"
                type="text"
                value={info.fname}
                onChange={(e) =>
                  setInfo({ ...info, fname: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <Typography>Last Name</Typography>
              <TextField
                label="Last Name"
                type="text"
                value={info.lname}
                onChange={(e) =>
                  setInfo({ ...info, lname: e.target.value })
                }
                fullWidth
                margin="normal"
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => changeScreen('wheel')}
                style={{
                  marginTop: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#003FB9',
                }}
              >
                Next
              </Button>
            </form>
          </Grid>
        )}

       {/*  Type of wheel     */}
       {
         step === 'wheel' && (
      <Grid item xs={3} style={{ margin: '10px' }}>
      <Typography style={{color:'#0B3558',fontWeight:'bold',fontSize:'3rem'}} align='center'>Number of wheels</Typography>     
      <FormControl>
        <RadioGroup
          name="wheel"
          value={info.wheel}
          onClick={handleChangeWheel}
        >
          {wheel.map((e) => (
            <FormControlLabel
              key={e}
              value={e}
              control={<Radio />}
              label={e}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Stack direction={'row'} spacing={2} gap={2}>
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("userInfo")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Prev
        </Button>
                
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("vehicle")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Next
        </Button>
                
      </Stack>
         </Grid> )
        }
        
        
    {/*  Type of vehicle     */}
    
     {
      step === 'vehicle' && (
      <Grid item xs={3} style={{ margin: '10px' }}>
      <Typography style={{color:'#0B3558',fontWeight:'bold',fontSize:'3rem'}} align='center'>Type of vehicle</Typography>     
      <FormControl>
        <RadioGroup
          name="vehicle"
          value={info.vehicleType}
          onClick={handleChangeVehicle}
        >
          {vehicle.map((e) => (
            <FormControlLabel
              key={e}
              value={e}
              control={<Radio />}
              label={e}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Stack direction={'row'} spacing={2} gap={2}>
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("wheel")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Prev
        </Button>
                
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("model")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Next
        </Button>
                
      </Stack>
         </Grid> )
        }


    {/*  Type of model     */}
    
    {
      step === 'model' && (
      <Grid item xs={3} style={{ margin: '10px' }}>
      <Typography style={{color:'#0B3558',fontWeight:'bold',fontSize:'3rem'}} align='center'>Type of vehicle</Typography>     
      <FormControl>
        <RadioGroup
          name="model"
          value={info.model}
          onClick={handleChangeModel}
        >
          {model.map((e) => (
            <FormControlLabel
              key={e}
              value={e}
              control={<Radio />}
              label={e}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Stack direction={'row'} spacing={2} gap={2}>
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("vehicle")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Prev
        </Button>
                
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("date")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Next
        </Button>
                
      </Stack>
         </Grid> )
        }
        
     {/*  date     */}
    
     {
      step === 'date' && (
      <Grid item xs={3} style={{ margin: '10px' }}>
      <Typography style={{color:'#0B3558',fontWeight:'bold',fontSize:'3rem'}} align='center'>Select Date</Typography>     
      
        <Stack >
          <Typography>Start Date</Typography>
          <Input type='date'></Input>     
        </Stack>
        
         <Stack>     
          <Typography>End Date</Typography>
          <Input type='date'>End Date</Input>
        </Stack>

        <Stack direction={'row'} spacing={2} gap={2}>
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("model")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Prev
        </Button>
                
        <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:'#003FB9' }}
        >
        Submit
        </Button>
                
        </Stack>
       
         </Grid> )
        }     
        
     
      </Grid>
     
     
    </>
    
  );
};

export default Home;
