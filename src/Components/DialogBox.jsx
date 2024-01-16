import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Box} from '@mui/material';
import { useSecretContext } from '../hooks/useSecretContext';

export default function DialogBox() {
  const [open, setOpen] = useState(false);
  const {dispatch} = useSecretContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = async(event) => {
      event.preventDefault();
      
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const title = formJson.title;
      const content = formJson.content;

      const response = await fetch("https://secret-service-pb1n.onrender.com/secrets",{
        method:"POST",
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({title,content}),
      });

      const json = await response.json();

      if(response.ok){
        const jsonResponseSecret = json.securedSecrets;
        dispatch({type:'ADD_SECRET',payload:jsonResponseSecret});

      }
      if(!response.ok){
        console.log(json);
      }

      handleClose();
  }

  return (
    <>
        <Box  sx={{ position: 'fixed', bottom: 16, right: 20 }}>
            <AddCircleIcon 
                sx={{
                    fontSize: 60,cursor:'pointer',
                    '&:hover':{ transform: 'scale(1.3)', 
                    transition: 'transform 0.2s ease-in-out', 
                }}
            } 
            onClick={handleClickOpen}
            />
        </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Secret</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your secret here. It will be encrypted and stored in the database.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Secret</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
