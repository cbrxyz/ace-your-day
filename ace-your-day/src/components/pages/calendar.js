import React, { useState } from "react";
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

    function handleWeekendsToggle(){
        setWeekendsVisible(!weekendsVisible)
    }

    function handleDateSelect(selectInfo){
        let title = prompt("please enter a new title for your event")
        let calendarApi = selectInfo.view.calendarApi

        calendarApi.unselect() // clear date selection

        if(title){
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    function handleEventClick(clickInfo) {
        if(window.confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"`)) {
            clickInfo.event.remove()
        }
    }

    function handleEvents(events){
        setCurrentEvents(events)
    }

    return (
        <div classname = 'calendar'>
            <Sidebar
                weekendsVisible = {weekendsVisible}
                handleWeekendsToggle = {handleWeekendsToggle}
                currentEvents = {currentEvents}
            />
            <div className='calendar-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                    eventContect={renderEventContent} // custom render function
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

function Sidebar({weekendsVisible, handleWeekendsToggle, currentEvents}) {
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
            <i>{event.title}</i>
        </li>
    )
}

// const Calendar = () => {
//     return (
//         <FullCalendar 
//             plugins={[dayGridPlugin]}
//             initialView='dayGridMonth'
//             events={[
//                 {title: 'event 1', date: '2024-03-21'}
                 
//             ]
//         }
            
//         />
//     )
// }

// export default Calendar;