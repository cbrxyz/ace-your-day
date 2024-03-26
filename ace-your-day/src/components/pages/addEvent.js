import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import colors from './event-utils'
import { MenuItem, Select } from '@mui/material';

export default function AddEventDialog({handleSubmit, formData, handleInputChange, openDialog, setOpenSelect}) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSelect(false);
    
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
                    <br /><br />
                    Start Date/Time
                    <TextField
                        required
                        margin="dense"
                        id="start"
                        name="start"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        value={formData.start}
                        onChange={handleInputChange}
                    />
                    <br /><br />
                    End Date/Time
                    <TextField
                        required
                        margin="dense"
                        id="end"
                        name="end"
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                        value={formData.end}
                        onChange={handleInputChange}
                    />
                    <br /><br />
                    Event Background Color
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
                    <Select
                        labelId = 'event-category-label'
                        id = 'event-category'
                        value={formData.color}
                        label = "Event Category"
                        onChange = {handleInputChange}
                    >
                        <MenuItem value="Event Category"> Event Category </MenuItem>
                        {colors.map((category) => <MenuItem value={category.color}>{category.category}</MenuItem>)}
                    </Select>
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
