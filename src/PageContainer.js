import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    currentDateAC,
    dayFormatter, endDateAC,
    monthFormatter,
    requestAC, srcAC, startDateAC, yearFormatter,
} from "./redux/reducer";
import {api} from "./api/api";
import {Page} from "./Page";

export const PageContainer = () => {
    let dispatch = useDispatch()
    const state = useSelector(state => state.appPage)
    useEffect(() => {
        api.getStartData()
            .then((response) => dispatch(srcAC([response.data])))
    }, [])
    const onButtonGetDataFromIntervalClick = () => {
        dispatch(requestAC(true))
        api.getDataFromInterval(state.startDate, state.endDate)
            .then((response) => {
                dispatch(srcAC(response.data))
                dispatch(requestAC(false))
            })
    }
    const onButtonGetDataFromCurrentDayClick = () => {
        dispatch(requestAC(true))
        api.getDataFromCurrentDay(state.currentDate)
            .then((response) => {
                dispatch(srcAC(response.data))
                dispatch(requestAC(false))
            })
    }
    const onStartDateChange = (newValue) => {
        const lDate = `${yearFormatter.format(newValue.$d)}-${monthFormatter.format(newValue.$d)}-${dayFormatter.format(newValue.$d)}`
        dispatch(startDateAC(lDate))
    }
    const onEndDateChange = (newValue) => {
        const lDate = `${yearFormatter.format(newValue.$d)}-${monthFormatter.format(newValue.$d)}-${dayFormatter.format(newValue.$d)}`
        dispatch(endDateAC(lDate))
    }
    const onCurrentDateChange = (newValue) => {
        const lDate = `${yearFormatter.format(newValue.$d)}-${monthFormatter.format(newValue.$d)}-${dayFormatter.format(newValue.$d)}`
        dispatch(currentDateAC(lDate))
    }
    return <Page onButtonGetDataFromIntervalClick={onButtonGetDataFromIntervalClick}
                 onButtonGetDataFromCurrentDayClick={onButtonGetDataFromCurrentDayClick}
                 onStartDateChange={onStartDateChange}
                 onEndDateChange={onEndDateChange}
                 onCurrentDateChange={onCurrentDateChange}
    />
}