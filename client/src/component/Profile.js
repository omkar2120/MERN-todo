import { Grid, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate()
  const [data, setData] = useState('')
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    setData(getData)
    console.log(getData);
  },[])
  
 
  const clearData = () => {
    localStorage.clear("userInfo")
    navigate("/")
  }

  if(data === null){
    console.log("No Data")
    navigate('/')
    
  }else{
    return (
   
      <div>
        <Grid
          margin={8}
          padding={6.5}
          height={500}
          boxShadow={5}
          style={{ width: "90%", display: "flex" }}
        >
          <Grid
            style={{
              height: "400px",
              width: "500px",
              padding: "10",
              justifyContent: "center",
            }}
          >
            <Grid>
              <img
                height={200}
                src="https://www.clipartmax.com/png/full/405-4050774_avatar-icon-flat-icon-shop-download-free-icons-for-avatar-icon-flat.png"
                // src={setImage}
              />
              <Typography textTransform={'capitalize'} fontSize={30}>
                Fullname: {data.firstname + " " + data.lastname}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            style={{
              height: "400px",
              width: "700px",
            }}
          >
            <Box margin={2} mt={4}>
              <Typography textTransform={'capitalize'} fontSize={30}>
                Firstname: {data.firstname}
              </Typography>
              <Typography textTransform={'capitalize'} fontSize={30}> Lastname: {data.lastname}</Typography>
              <Typography fontSize={30}> EmailId: {data.email}</Typography>
              <Typography fontSize={30}> Phone No: {data.pno}</Typography>
              <Typography fontSize={30}> Password: {data.password}</Typography>
            </Box>
            <Button variant="contained" onClick={clearData} >Logout</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
 
};

export default Profile;
