import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Api from './Api'

import colors from './event-utils'
import { InputLabel, MenuItem, Select, Checkbox, FormControlLabel} from '@mui/material';

export default function Optimize({openDialog, setOpenSelect, date, getCookie, events}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem("preferences");
    console.log("Retrieved preferences from local storage:", savedPrefs);
    return savedPrefs ? JSON.parse(savedPrefs) : { question1: "", question2: "", question3: "", question4: "" };
  });

  const getLocalStoragePreferences = () => {
    const savedPrefs = localStorage.getItem("preferences");
    return savedPrefs ? JSON.parse(savedPrefs) : { question1: "", question2: "", question3: "", question4: "" };
  }

  const getPreferences = () => {
    setPreferences(getLocalStoragePreferences());
    return `My preferences include the following:\n\nI want the day to start at: ${preferences.question1}\nI want the day to end at: ${preferences.question2}\nI want to: ${preferences.question3}\nI want to: ${preferences.question4}\n`
  }

  const getEvents = (date) => {
    const eventStr = events.map((event) => {
      // Ignore events which do not occur on date
      if (event.start.split('T')[0] !== date) {
        return '';
      }
      // Get times for the events
      const startTime = event.start.split('T')[1].split('-')[0];
      const endTime = event.end.split('T')[1].split('-')[0];
      return `* '${event.title}' (flexible: ${event.flexible}) from ${startTime} to ${endTime}`;
    }).join('\n');
    return `My events include the following:\n\n${eventStr}\n`;
  }

  const handleClickOpen = () => {
    const csrfToken = getCookie('csrftoken');
    const api = new Api(csrfToken);
    let message = '';
    // 2024-04-15
    const currentDateStr = date.split('T')[0];
    message += '\n\n' + getPreferences();
    message += '\n\n' + getEvents(currentDateStr);
    console.log(message);
    api.eventy(message).then((response) => {
      console.log(response);
      setText(response.data.message);
    });
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
                Optimize
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle>Optimizing {date}...</DialogTitle>
            {console.log(date)}
            <DialogContent>
                <div dangerouslySetInnerHTML={{__html: text}} />
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
            </DialogContent>
        </Dialog>
        </React.Fragment>

    );
}
