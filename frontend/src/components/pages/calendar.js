import React, { useEffect, useState, useRef } from "react";
import './calendar.css';

//FullCalendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {formatDate} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from "../event-utils";

//MUI Imports
import AddEventDialog from '../addEvent'
import EventDesDialog from '../eventDescription'
import { InputLabel, TextField} from '@mui/material';
import OptimizeDialog from '../optimize'
import Api from '../Api'

//Other imports
import colors from '../event-utils'


export default function Calendar(){
    const [events, setEvents] = useState([]);
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])
    const [formData, setFormatData] = useState({
        title: '',
        start: '',
        end: '',
        color: '',
        textColor: '',
        category: '',
        description: '',
        flex: false
    })


    const [showAdd, openShowAdd] = useState(false)
    const [openDes, setOpenDes] = useState(false);
    const [clickInfo, setClickInfo] = useState(null);
    const [openOpt, setOpenOpt] = useState(false);




    const calendarRef = useRef(null)

    function handleWeekendsToggle(){
        setWeekendsVisible(!weekendsVisible)
        setOpenOpt(true);
    }

    function handleDateSelect(selectInfo){
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
        console.log("Start: ", selectInfo.startStr);
        console.log("End: ", selectInfo.endStr);

        const start = new Date(selectInfo.startStr);
        const end = new Date(selectInfo.endStr);

        const formatStart = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}T${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;
        const formatEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}T${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;


        setFormatData(prevFormData => ({
            ...formData,
            start: formatStart,
            end: formatEnd
        }));

        openShowAdd(true);

    }

    function deleteEvent(){
        const csrftoken = getCookie('csrftoken');
        const api = new Api(csrftoken);
        api.deleteEvent(clickInfo.event.id).then((res) => console.log(res));
        clickInfo.event.remove();
        setOpenDes(false);
    }

    function handleEventClick(clickInfo) {
        // if(window.confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"`)) {
        //     clickInfo.event.remove()
        // }
        setClickInfo(clickInfo);
        setOpenDes(true);

    }

    function handleEvents(events){
        setCurrentEvents(events)
    }

    function handleInputChange(event){
        const {name, value} = event.target;

        if(name === 'category'){
            const bgcolor = colors.find(category => category.category === value);
            setFormatData(prevFormData => ({
                ...formData,
                category: value,
                color: bgcolor.color,
                textColor: bgcolor.text
            }));
        } else {
            setFormatData(prevFormData => ({
                ...formData,
                [name] : value
            }));
        }




    }

    async function getEvents() {
      const api = new Api();
      let outputted = [];
      let events = await api.getEvents();
      for (let i = 0; i < events.data.length; i++) {
          let event = events.data[i];
          let id = event._id;
          let title = event.title;
          let start = event.start;
          let end = event.end;
          let color = event.color;
          let textColor = event.text_color;
          let category = event.category;
          let description = event.description;
          let flex = event.flexible;
          outputted.push({
              id: id,
              title: title,
              start: start,
              end: end,
              color: color,
              textColor: textColor,
              extendedProps: {
                  category: category,
                  description: description,
                  flex: flex
              }
          });
      }
      return outputted;
    }

    useEffect(() => {
        async function fetchEvents() {
            let events = await getEvents();
            setEvents(events);
        }

        fetchEvents();
    }, []);

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function handleSubmit(event){
        event.preventDefault();
        const {title, start, end, color, textColor, category, description, flex} = formData;
        if (title && start && end) {
            if(start < end){
                const calendarApi = calendarRef.current.getApi();
                const eventId = createEventId();
                calendarApi.addEvent({
                    id: eventId,
                    title,
                    start,
                    end,
                    color,
                    textColor,
                    extendedProps: {
                        category,
                        description,
                        flex
                    }
                });
                // const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                const csrftoken = getCookie('csrftoken');
                const api = new Api(csrftoken);
                api.addEvent({
                    _id: eventId,
                    title: title,
                    start: start,
                    end: end,
                    color: color,
                    text_color: textColor,
                    category: category,
                    description: description,
                    flexible: flex,
                    owner: "6626efb40ee328dfba01fa3c"
                }).then((res) => console.log(res));

                setFormatData({
                    title: '',
                    start: '',
                    end: '',
                    color: '',
                    textColor: '',
                    category: '',
                    description: '',
                    flex: false
                });
                openShowAdd(false);
            } else {

                alert("Start date/time must occur before the end date/time!")
            }

        } else {

            alert("d;lfkjsjsk9332309d")
        }
    }

    return (
        <div className = 'calendar'>
            <Sidebar
                weekendsVisible = {weekendsVisible}
                handleWeekendsToggle = {handleWeekendsToggle}
                currentEvents = {currentEvents}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                showAdd={showAdd}
                setShowAdd={openShowAdd}
                openOpt={openOpt}
                setOpt={setOpenOpt}
                events={events}
            />
            <EventDesDialog
                open={openDes}
                setOpen={setOpenDes}
                currEvent={clickInfo}
                deleteEvent={deleteEvent}
            />
            <div className='calendar-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={calendarRef}
                    headerToolbar={{
                        left: 'prev, next today',
                        center: 'title',
                        right: 'dayGridMonth, timeGridWeek, timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={weekendsVisible}
                    events={events} // or use 'events' setting to fetch from feed
                    select={handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={handleEventClick} // defined in function above
                    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                    /* can update remote database when these fire:
                        eventAdd = {function(){}}
                        eventChange = {function(){}}
                        eventRemove = {function(){}}
                    */
                />
            </div>
        </div>
    )
}

function renderEventContent(eventInfo){
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function Sidebar({weekendsVisible, handleWeekendsToggle, currentEvents, formData, handleInputChange, handleSubmit, showAdd, setShowAdd, showOpt, setOpt, events}) {
    const [chosenDate, setChosenDate] = useState('');

    useEffect(() => {
        const storedDate = localStorage.getItem("opt");
        console.log("Stored Date:", storedDate);
        if(storedDate) {
            setChosenDate(storedDate);
        }
    }, []);

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        console.log("New Date Selected:", newDate);
        setChosenDate(newDate);
        localStorage.setItem("opt", newDate);
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    return (
        <div className="calendar-sidebar">
            <div className="calendar-sidebar-section">
                <h2>Instructions</h2>
                <ul>
                    <li>Select dates and you will be prompted to create a new event</li>
                    <li>Drag, drop, and reize events</li>
                    <li>Click an event to delete it</li>
                </ul>
            </div>
            <div className="calendar-sidebar-section">
                <InputLabel>Select a Day to Optimize</InputLabel>
                        <TextField
                            required
                            margin="dense"
                            id="opt"
                            name="opt"
                            type="date"
                            fullWidth
                            variant="standard"
                            value={chosenDate}
                            onChange={handleDateChange}
                        />
                <OptimizeDialog
                    openDialog={showOpt}
                    setOpenSelect={setOpt}
                    date={chosenDate}
                    getCookie={getCookie}
                    events={events}
                />
            </div>

            <div className="calendar-sidebar-section">
                <label>
                    <input
                        type='checkbox'
                        checked={weekendsVisible}
                        onChange={handleWeekendsToggle}
                    ></input>
                    toggle weekends
                </label>
            </div>
            <div className="Calendar-sidebar-section">
               <AddEventDialog
                    handleSubmit={handleSubmit}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    openDialog={showAdd}
                    setOpenSelect={setShowAdd}
                />
            </div>
            <div className="calendar-sidebar-section">
                <h2>All Events ({currentEvents.length})</h2>
                <ul>
                    {currentEvents.map((event) => (
                        <SidebarEvent key={event.id} event={event} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

function SidebarEvent({event}) {
    if(new Date(event.end) < new Date()){
        return (
            <li key={event.id} style={{textDecoration: 'line-through'}}>

            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>&nbsp;&nbsp;&nbsp;&nbsp;{event.title}</i>
        </li>
        )
    } else {
        return (
            <li key={event.id}>

                <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
                <i>&nbsp;&nbsp;&nbsp;&nbsp;{event.title}</i>
            </li>
        )
    }

}
