import { createEventInstance } from "@fullcalendar/core/internal"

const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))
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
    },
    {
        id: createEventId(),
        title: "Study Time",
        start: "2024-04-15T08:00:00-04:00",
        end: "2024-04-15T10:00:00-04:00",
        color: "#cf6daa",
        textColor: "purple",
        description: "Do math homework",
        flexible: true
    },
    {
        id: createEventId(),
        title: "Meeting 1",
        start: "2024-04-15T10:00:00-04:00",
        end: "2024-04-15T11:00:00-04:00",
        color: "#cf6daa",
        textColor: "purple",
        description: "My event",
        flexible: false
    },
    {
        id: createEventId(),
        title: "Gym",
        start: "2024-04-15T11:10:00-04:00",
        end: "2024-04-15T12:10:00-04:00",
        color: "#cf6daa",
        textColor: "purple",
        description: "upper body",
        flexible: true
    },
    {
        id: createEventId(),
        title: "Study time 2",
        start: "2024-04-15T12:20:00-04:00",
        end: "2024-04-15T14:20:00-04:00",
        color: "#cf6daa",
        textColor: "purple",
        description: "study for finals",
        flexible: true
    },
    {
        id: createEventId(),
        title: "Meeting 2",
        start: "2024-04-15T17:00:00-04:00",
        end: "2024-04-15T19:00:00-04:00",
        color: "#cf6daa",
        textColor: "purple",
        description: "My event",
        flexible: false
    },
    {
        id: createEventId(),
        title: "Free Time",
        start: "2024-04-15T19:10:00-04:00",
        end: "2024-04-15T22:00:00-04:00",
        color: "#cf6daa",
        textColor: "purple",
        description: "Leisure/Relaxation",
        flexible: true
    }
]

export function createEventId(){
    return ObjectId();
}


const colors = [
    {category: 'Classes', color: 'blue', text: 'white'},
    {category: 'Meetings', color: 'purple', text: 'white'},
    {category: 'Activities', color: '#AEF9c8', text: 'black'}
];

export default colors;
