import React, { useState, useRef } from "react";
import './calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {formatDate} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default function Calendar() {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])
    const [formData, setFormatData] = useState({
        title: '',
        start: '',
        end: '',
        color: '',
    })


    const calendarRef = useRef(null)

    function handleWeekendsToggle(){
        setWeekendsVisible(!weekendsVisible)
    }

    function handleDateSelect(selectInfo){
        // let title = prompt("please enter a new title for your event")
        // let calendarApi = selectInfo.view.calendar;

        // calendarApi.unselect() // clear date selection

        // if(title){
        //     calendarApi.addEvent({
        //         id: createEventId(),
        //         title,
        //         start: selectInfo.startStr,
        //         end: selectInfo.endStr,
        //         allDay: selectInfo.allDay
        //     })
        // }
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
        console.log("Start: ", selectInfo.startStr);
        console.log("End: ", selectInfo.endStr);

        // const formatStart = formatDate(selectInfo.start, {timeZone: 'UTC', format: 'yyyy-MM-ddTHH:mm:ss'});
        // const formatEnd = formatDate(selectInfo.end, {timeZone: 'UTC', format: 'yyyy-MM-ddTHH:mm:ss'});

        const start = new Date(selectInfo.startStr);
        const end = new Date(selectInfo.endStr);
    
        const formatStart = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}T${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`;
        const formatEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}T${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`;


        setFormatData(prevFormData => ({
            ...formData,
            start: formatStart,
            end: formatEnd
        }));

        console.log("Form Start: ", formData.start);
        console.log("Form End: ", formData.end);

    }

    function handleEventClick(clickInfo) {
        if(window.confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"`)) {
            clickInfo.event.remove()
        }
    }

    function handleEvents(events){
        setCurrentEvents(events)
    }

    function handleInputChange(event){
        const {name, value} = event.target;
        setFormatData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        const {title, start, end, color} = formData;
        if (title && start && end) {
            if(start < end){
                const calendarApi = calendarRef.current.getApi()
                calendarApi.addEvent({
                    id: createEventId(),
                    title,
                    start,
                    end,
                    color
                });
    
                setFormatData({
                    title: '',
                    start: '',
                    end: '',
                    color: '',
                });
            } else {
                alert("Start date/time must occur before the end date/time!")
            }
            
        } else {
            alert("Please fill out all fields!")
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
                    initialEvents={INITIAL_EVENTS} // or use 'events' setting to fetch from feed
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

function Sidebar({weekendsVisible, handleWeekendsToggle, currentEvents, formData, handleInputChange, handleSubmit}) {
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
                <label>
                    <input
                        type='checkbox'
                        checked={weekendsVisible}
                        onChange={handleWeekendsToggle}
                    ></input>
                    toggle weekends
                </label>
            </div>
            <div className="calendar-sidebar-section">
                <h2>Add Event</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='title'
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={handleInputChange} 
                    />
                    <input 
                        type="datetime-local"
                        name='start'
                        placeholder="Start Date and Time"
                        value={formData.start}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="datetime-local"
                        name='end'
                        placeholder="End Date and Time"
                        value={formData.end}
                        onChange={handleInputChange}
                    />
                    <input 
                        type="color"
                        name="color"
                        placeholder="Event Color"
                        value={formData.color}
                        onChange={handleInputChange}
                    />
                    <button type='submit'>Add Event</button>
                </form>
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
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>&nbsp;&nbsp;&nbsp;&nbsp;{event.title}</i>
        </li>
    )
}