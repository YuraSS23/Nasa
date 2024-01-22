import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.nasa.gov/planetary"
})

export const api = {
    getStartData() {
        return instance.get(`apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl`)
    },
    getDataFromInterval(startDate, endDate) {
        return instance.get(`apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl&start_date=${startDate}&end_date=${endDate}`)
    },
    getDataFromCurrentDay(currentDate) {
        return instance.get(`apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl&start_date=${currentDate}&end_date=${currentDate}`)
    }
}