import Alert from '@mui/material/Alert';
import { Button, CircularProgress,Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { AlertTitle } from '@mui/material';

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData,setFormData]=useState({
    username: '',
    password: ''
  });
  const [flag,setFlag]=useState(true);


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (e) => {
    console.log(formData);
    await axios.post(`${config.endpoint}/auth/register`,{
      username: formData.username,
      password: formData.password
     
    },{
      headers: {'Content-Type': 'application/json'}
    }
    )
    .then((res)=>{
      console.log(res);
      //alert('success');
      setFlag(true);
       
      
      enqueueSnackbar("success", { autoHideDuration: 3000,variant: 'success' });
  
    })
    .catch((err)=>{
      setFlag(true);
  
      if(err.response && err.response.status===400){
        enqueueSnackbar(err.response.data.message, { autoHideDuration: 3000,variant: 'error' });
      }
      else{
        enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', { autoHideDuration: 3000,variant: 'error' });
      }
    })
   };

  

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if(formData.username==='' || formData.password==='' || formData.confirmPassword===''){
      enqueueSnackbar('All the fields are required',{autoHideDuration: 3000, variant: 'warning'});
    }
    else if(formData.username.length<6){
      enqueueSnackbar('Username must be atleast 6 characters length',{autoHideDuration: 3000, variant: 'warning'})
    }
    else if(formData.password.length<6){
      enqueueSnackbar('Password must be atleast 6 characters length',{autoHideDuration: 3000, variant: 'warning'})
    }
    else if(formData.password!==formData.confirmPassword){
      enqueueSnackbar('Password and Confirm Password do not match',{autoHideDuration: 3000, variant: 'warning'})
    }
    else{
      setFlag(false);
      register();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            onChange={(e)=>{setFormData({...formData,username: e.target.value})}}
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange={(e)=>{setFormData({...formData,password: e.target.value})}}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            onChange={(e)=>{setFormData({...formData,confirmPassword: e.target.value})}}
            name="confirmPassword"
            type="password"
            fullWidth
          />
           {flag ? (<Button className="button" variant="contained" onClick={validateInput} type='submit'>
            Register Now
           </Button>):  <Box sx={{ display: 'flex',justifyContent: 'center'}}>
                          <CircularProgress style={{width:'30px',height:'30px'}} />
                      </Box>}
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
