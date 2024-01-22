import React, {useEffect} from 'react';
import {Container} from "./components/Container";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Button, TextField} from "@mui/material";
import {FlexWrapper} from "./components/Flex-wrapper";
import preloader from "./assets/images/30.gif";
import axios from "axios";
import s from "./Page.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    currentDateAC,
    dayFormatter,
    endDateAC,
    monthFormatter,
    requestAC, srcAC,
    startDateAC,
    yearFormatter
} from "./redux/reducer";
import {api} from "./api/api";

export const Page = () => {
    let dispatch = useDispatch()
    const state = useSelector(state => state.appPage)
    useEffect(() => {
        api.getStartData()
            .then((response) => dispatch(srcAC([response.data])))
    }, [])
    const onButtonClick = () => {
        dispatch(requestAC(true))
        api.getDataFromInterval(state.startDate, state.endDate)
            .then((response) => {
                dispatch(srcAC(response.data))
                dispatch(requestAC(false))
            })
    }
    const onButton2Click = () => {
        dispatch(requestAC(true))
        api.getDataFromCurrentDay(state.currentDate)
            .then((response) => {
                dispatch(srcAC(response.data))
                dispatch(requestAC(false))
            })
    }
    return <Container>
            <h1 className={s.h1}>NASA picture of the day</h1>
            <FlexWrapper justify={"center"} align={"center"} gap={"20px"} margin={"50px 0 50px"}>
                <span>Input date range</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        format={"DD/MM/YYYY"}
                        label="Start date"
                        value={""}
                        onChange={(newValue) => {
                            const lDate = `${yearFormatter.format(newValue.$d)}-${monthFormatter.format(newValue.$d)}-${dayFormatter.format(newValue.$d)}`
                            dispatch(startDateAC(lDate))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        format={"DD/MM/YYYY"}
                        label="End date"
                        value={""}
                        onChange={(newValue) => {
                            const lDate = `${yearFormatter.format(newValue.$d)}-${monthFormatter.format(newValue.$d)}-${dayFormatter.format(newValue.$d)}`
                            dispatch(endDateAC(lDate))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button onClick={onButtonClick} variant="contained">Set date interval</Button>
            </FlexWrapper>
            <FlexWrapper justify={"center"} align={"center"} gap={"20px"} margin={"50px 0 50px"}>
                <span>Input specific date</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        format={"DD/MM/YYYY"}
                        label="Specific date"
                        value={""}
                        onChange={(newValue) => {
                            const lDate = `${yearFormatter.format(newValue.$d)}-${monthFormatter.format(newValue.$d)}-${dayFormatter.format(newValue.$d)}`
                            dispatch(currentDateAC(lDate))
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Button onClick={onButton2Click} variant="contained">Set specific date</Button>
            </FlexWrapper>
            <FlexWrapper wrap={"wrap"} justify={"space-around"} gap={"20px"}>
                {state.request ? <img src={preloader} height={"500px"} width={"500px"} alt={"preloader"}/>
                    : state.src.map((el, index) => <img key={index} height={"500px"} width={"500px"} src={el.url} alt={"no data"}/>)}
            </FlexWrapper>
    </Container>
}