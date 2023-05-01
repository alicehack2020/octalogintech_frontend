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
  Snackbar,
  IconButton,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 import axios from "axios"
import { url } from '../constants/constants';
const Home = () => {
  const [step, setStep] = useState('userInfo');
  const [vehicle,setvehicle] = useState([]);
  const [model,setModel] = useState([]);

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
  const handleSubmit = async () => {
    
    if (info.startDate === info.endDate)
    {
      toast("start date and end date is same")
    }
    else if (info.startDate > info.endDate)
    {
      toast("end date must be greater than start date")
    }
    else {
  await axios.post(`${url}/book`,info)
    .then(response => {
      toast(response.data.message)
      setStep("userInfo")
      setInfo({})
  })
  .catch(error => {
    toast(error.data.message)
  }); 
  }

  };


  //api get vehicle
  const handleVehicelData = async() => {
    await axios.get(`${url}/vehicle?wheelData=${info.wheel}`)
     .then(response => {
       console.log('vehicle:', response.data);
       setvehicle(response.data.data)
     })
     .catch(error => {
       console.error('Error:', error);
     });
  };
  
 //api get Model
 const handleModelData = async() => {
  await axios.get(`${url}/model?wheelData=${info.wheel}&vehicleData=${info.vehicleType}`)
   .then(response => {
     console.log('Model:', response.data);
    setModel(response.data.data)
   })
   .catch(error => {
     console.error('Error:', error);
   });
};



  const handleChangeWheel = (event) => {
    const wheelData = event.target.value;
    setInfo({ ...info, wheel: wheelData });
  };

  const handleChangeVehicle = (event) => {
    const vehicleData = event.target.value;
    setInfo({ ...info, vehicleType: vehicleData });
  };

  const handleChangeModel = (event) => {
    const modelData = event.target.value;
    setInfo({ ...info, model: modelData });
  };


  const changeScreen = (screen) => {
   
    
    if ("vehicle" === screen)
    {

      handleVehicelData()
      setStep(screen)
    }
    else if ("model" === screen)
    {
      handleModelData()
      setStep(screen)
    }
    else {
      setStep(screen)
    }
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
                disabled={info.fname && info.lname ?false:true}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => changeScreen('wheel')}
                style={{
                  marginTop: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: info.fname && info.lname ?'#003FB9':'gray',
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
       disabled={info.wheel?false:true}   
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("vehicle")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor:info.wheel ?'#003FB9':'gray' }}
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
              key={e._id}
              value={e.vehicle}
              control={<Radio />}
              label={e.vehicle}
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
        disabled={info.vehicleType ? false : true}           
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("model")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor: info.vehicleType ?'#003FB9':'gray' }}
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
      <Typography style={{color:'#0B3558',fontWeight:'bold',fontSize:'3rem'}} align='center'>Select Model</Typography>     
      <FormControl>
        <RadioGroup
          name="model"
          value={info.model}
          onClick={handleChangeModel}
        >
          {model.map((e) => (
            <FormControlLabel
              key={e._id}
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
        disabled={info.model ? false : true}
        variant="contained"
        color="primary"
        fullWidth
        onClick={()=>changeScreen("date")}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor: info.model ?'#003FB9':'gray'}}
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
          <Input type='date' value={info.startDate}
            onChange={(e) =>
              setInfo({ ...info, startDate: e.target.value })
             }></Input>     
        </Stack>
        
         <Stack>     
          <Typography>End Date</Typography>
            <Input type='date'
            value={info.endDate}
            onChange={(e) =>
              setInfo({ ...info, endDate: e.target.value })
             }>End Date</Input>
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
        disabled={info.startDate&&info.endDate ? false : true}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: '1rem',fontWeight:'bold',backgroundColor: info.startDate&&info.endDate?'#003FB9':'gray'}}
        >
        Submit
        </Button>
                
        </Stack>
       
         </Grid> )
        }       
        <ToastContainer />
      </Grid>
     
      
    </>
    
  );
};

export default Home;
