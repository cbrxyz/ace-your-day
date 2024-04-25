// Create a class that calls the backend API
// using axios using http://localhost:8000
// supported operations
// - addUser
// - getUsers
// - addEvent
// - getEvents
// - deleteEvent

export default class Api {
    constructor(csrftoken) {
        this.axios = require('axios');
        this.baseUrl = "http://localhost:8000/api";
        this.csrftoken = csrftoken;
    }

    getHeaders() {
      return {
        'accept': "application/json",
        'Content-Type': 'application/json',
        'X-CSRFToken': this.csrftoken,
      }
    }

    getConfig() {
      return {
        withCredentials: true,
        headers: this.getHeaders(),
      }
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
        let config = this.getConfig();
        return this.axios.post(this.baseUrl + "/events/", event, config);
    }

    async deleteEvent(eventId) {
        let config = this.getConfig();
        return this.axios.delete(this.baseUrl + "/events/" + eventId + "/", config);
    }

    async eventy(message) {
      let config = this.getConfig();
      return this.axios.get(this.baseUrl + "/eventy?message=" + message, config);
    }
}
