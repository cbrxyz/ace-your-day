import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import colors from './event-utils'
import { InputLabel, MenuItem, Select, Checkbox, FormControlLabel } from '@mui/material';

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
                    <InputLabel>Start Date/Time</InputLabel>
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
                    <InputLabel>End Date/Time</InputLabel>
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
                    <InputLabel>Choose Event Category</InputLabel>
                    <Select
                        labelId = 'event-category-label'
                        name = 'category'
                        id = 'event-category'
                        value={formData.category}
                        label = "Event Category"
                        onChange = {handleInputChange}
                        fullWidth
                    >
                        {/* <MenuItem value="#483957"> Event Category </MenuItem>
                        <MenuItem value='#ab39c3'>Meetings</MenuItem> */}
                        {colors.map((category) =>
                            <MenuItem value={category.category}>{category.category}</MenuItem>
                        )}
                    </Select>
                    <br /><br />
                    <InputLabel>Notes</InputLabel>
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                    />
                    <br /><br />
                    <FormControlLabel control={<Checkbox onChange={handleInputChange} value={formData.flex}/>} label="Flexible" />
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
