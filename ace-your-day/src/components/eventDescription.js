import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({open, setOpen, currEvent, deleteEvent}) {


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if(currEvent === null){
    return (
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modal title
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={deleteEvent}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          
          <DialogContent dividers>
            <Typography gutterBottom>
              Nothing to say!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  } else {
    console.log(currEvent.event.extendedProps.flex);
    return (
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {currEvent.event.title}
            <Typography gutterBottom>
              {currEvent.event.extendedProps.category}
          </Typography>
          </DialogTitle>
          <Tooltip title="Close">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={deleteEvent}
            sx={{
              position: 'absolute',
              right: 50,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <DialogContent dividers>
            <Typography gutterBottom>
              Start: {currEvent.event.startStr} <br />
              End: {currEvent.event.endStr} <br />
              Flexible? {currEvent.event.extendedProps.flex}
            </Typography>
            <Typography gutterBottom>
              Event Notes: <br />
              {currEvent.event.extendedProps.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            {/* <Button autoFocus onClick={handleClose}>
              Save changes
            </Button> */} 
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
  
}