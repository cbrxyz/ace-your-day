import { createEventInstance } from "@fullcalendar/core/internal"

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '')

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: "All Day event",
        start: todayStr,
        color: "#cf6daa",
        textColor: "purple",
        description: "My event"
    },
    {
        id: createEventId(),
        title: "Timed event",
        start: todayStr + 'T12:00:00',
        textColor: 'purple'
    }
]

export function createEventId(){
    return String(eventGuid++)
}


const colors = [
    {category: 'Classes', color: 'blue', text: 'white'},
    {category: 'Meetings', color: 'purple', text: 'white'},
    {category: 'Activities', color: '#AEF9c8', text: 'black'}
];

export default colors;