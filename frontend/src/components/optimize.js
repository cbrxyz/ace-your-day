import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import colors from './event-utils'
import { InputLabel, MenuItem, Select, Checkbox, FormControlLabel} from '@mui/material';

export default function AddEventDialog({handleSubmit, openDialog, setOpenSelect}) {
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
                    
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleSubmit}>Add</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
        </React.Fragment>

    );
}
