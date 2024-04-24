// Create a class that calls the backend API
// using axios using http://localhost:8000
// supported operations
// - addUser
// - getUsers
// - addEvent
// - getEvents
// - deleteEvent

export default class Api {
    constructor() {
        this.axios = require('axios');
        this.baseUrl = "http://localhost:8000/api";
    }

    async getUsers() {
        let users = this.axios.get(this.baseUrl + "/users/");
        return users;
    }

    async addUser(user) {
        return this.axios.post(this.baseUrl + "/users/", user);
    }

    async getEvents() {
        let events = this.axios.get(this.baseUrl + "/events/");
        return events;
    }

    async addEvent(event) {
        return this.axios.post(this.baseUrl + "/events/", event);
    }

    async deleteEvent(eventId) {
        return this.axios.delete(this.baseUrl + "/events/" + eventId + "/");
    }
}
