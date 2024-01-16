import React, { useState,useEffect } from'react';
import {Card,CardHeader,CardContent, Grid, Container, Typography} from "@mui/material";
import { useSecretContext } from '../hooks/useSecretContext';
import { useAuthContext } from '../hooks/useAuthContext';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Secret() {

  const {secrets,dispatch} = useSecretContext();
  const {user} = useAuthContext();
  const [userID,setUserID] = useState(null);

  useEffect(()=>{

    const fetchSecrets = async ()=>{
      const response = await fetch("https://secret-service-pb1n.onrender.com/secrets",{
        headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}
      });
      const json = await response.json();

      if(response.ok){
        const jsonResponseSecret = json.securedSecrets;
        const userID = json.userID;
        setUserID(userID);
        dispatch({type:"GET_SECRETS",payload:jsonResponseSecret});
      }
      if(!response.ok){
        console.log(json);
      }
    }
    if (user) {
      fetchSecrets();
    }
  },[dispatch,user,secrets]);

  const handleDelete = async(id)=>{

    const response = await fetch(`https://secret-service-pb1n.onrender.com/secrets/delete/${id}`,{
        method:"DELETE",
        headers:{'Authorization':`Bearer ${localStorage.getItem('token')}`}
      });
      const json = await response.json();

      if(response.ok){
        dispatch({type:"DELETE_SECRET",payload:id});
      }
      if(!response.ok){
        console.log(json);
      }
  }

  // const securedSecrets = secrets && secrets.secrets ? secrets.secrets.securedSecrets : [];
  // console.log(secrets.secrets);

    return(
        <>
        <Container maxWidth="lg">
            <Grid container spacing={2} marginTop={2}>
        {
          secrets.secrets ? secrets.secrets.map(secret => (
                    <Grid item xs={12} sm={6} md={4} key={secret._id}>
                    <Card key={secret.id}>
                    <CardHeader title={secret.title} />
                    <CardContent>{secret.content}</CardContent>
                {
                    userID === secret.createdBy && 
                    <DeleteForeverIcon 
                      sx={{
                        position:"relative",
                        bottom:'5px',
                        left:'10px',
                        color:'red',
                        fontFamily:"60px",
                        cursor:'pointer',
                        '&:hover':{
                          color:'red',
                          opacity:0.5
                        },
                        '&:active':{
                          color:'red',
                          opacity:1
                        }
                      }}

                      onClick={()=>{handleDelete(secret._id)}}
                    />
                }
                    </Card>
                    </Grid>
                ))
                :
            <Typography variant="h5" component="h2" sx={{marginTop:'20px'}}>
              There is no secret yet! Click on the add button to add a secret.
            </Typography>
          }
            </Grid>
            </Container>
        </>
    )
}
