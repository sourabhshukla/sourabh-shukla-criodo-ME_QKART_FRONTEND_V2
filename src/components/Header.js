import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useHistory, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
// import avatar from '../../public/avatar.png';
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const backToExplore = () => {
    history.push('/');
  }

  const login = () => {
    history.push('/login');
  }

  const register = () => {
    history.push('/register');
  }

  const logout = () => {
    localStorage.clear();
    enqueueSnackbar("Logged out successfully", { variant: "success" });
    history.push('/');
    window.location.reload();
  }

    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {!hasHiddenAuthButtons?
          !localStorage.getItem('username') ? (
            <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            >
              <Button className='button'  onClick={login}>
                 Login
              </Button>
              <Button variant='contained'  onClick={register}>
                Register
              </Button>
            </Stack>
          ) : (
            
            <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={1}
            >
              <Avatar src='avatar.png' alt={localStorage.getItem('username')} />
              {localStorage.getItem('username')!==undefined? <p>{localStorage.getItem('username')}</p>:<p></p>}
              <Button className='button' onClick={logout}>LOGOUT</Button>
            </Stack>
          )
        :(<Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={backToExplore}
        >
          Back to explore
        </Button>)}
        
       
      </Box>
    );
};

export default Header;