import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddEventDialog({handleSubmit, formData, handleInputChange, openDialog}) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=> {
    setOpen(openDialog);
  }, [openDialog]);
    
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Event
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle>Add Event</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill out the fields below to add an event to your calendar!</DialogContentText>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Event Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    
                    <TextField
                        required
                        margin="dense"
                        id="start"
                        name="start"
                        label="Start Date and Time"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        value={formData.start}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="end"
                        name="end"
                        label="End Date and Time"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        value={formData.end}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="color"
                        name="color"
                        label="Event Color"
                        type="color"
                        fullWidth
                        variant="standard"
                        value={formData.color}
                        onChange={handleInputChange}
                    />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleClose}>Add</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
        </React.Fragment>
        
    );
}
