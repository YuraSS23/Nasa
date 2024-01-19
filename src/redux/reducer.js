const SET_START_DATE = "SET-START-DATE"
const SET_END_DATE = "SET-END-DATE"
const SET_CURRENT_DATE = "SET-CURRENT-DATE"
const SET_SRC = "SET-SRC"
const SET_REQUEST = "SET-REQUEST"

export let dayFormatter = new Intl.DateTimeFormat("en", {
    day: "2-digit",
})
export let monthFormatter = new Intl.DateTimeFormat("en", {
    month: "2-digit",
})
export let yearFormatter = new Intl.DateTimeFormat("en", {
    year: "numeric"
})
const date = `${yearFormatter.format(new Date())}-${monthFormatter.format(new Date())}-${dayFormatter.format(new Date())}`

let initialState = {
    startDate: date,
    endDate: date,
    currentDate: date,
    src: [],
    request: false
}

export const Reducer  = (state=initialState, action) => {
    switch (action.type) {
        case SET_START_DATE:
            return {...state, startDate: action.date}
        case SET_END_DATE:
            return {...state,endDate: action.date}
        case SET_CURRENT_DATE:
            return {...state, currentDate: action.date}
        case SET_SRC:{
            return {...state, src: [...action.src]}
        }
        case SET_REQUEST:
            return {...state, request: action.value}
        default:
            return {...state}
    }
}

export const startDateAC = (date)=>({type: SET_START_DATE, date})
export const endDateAC = (date)=>({type: SET_END_DATE, date})
export const currentDateAC = (date)=>({type: SET_CURRENT_DATE, date})
export const requestAC = (value)=>({type: SET_REQUEST, value})
export const srcAC = (src)=>({type: SET_SRC, src})