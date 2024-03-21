import { createEventInstance } from "@fullcalendar/core/internal"

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '')

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: "All Day event",
        start: todayStr
    },
    {
        id: createEventId(),
        title: "Timed event",
        start: todayStr + 'T12:00:00'
    }
]

export function createEventId(){
    return String(eventGuid++)
}