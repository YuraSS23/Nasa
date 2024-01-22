import React from 'react';
import {Container} from "./components/Container";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Button, TextField} from "@mui/material";
import {FlexWrapper} from "./components/Flex-wrapper";
import preloader from "./assets/images/30.gif";
import s from "./Page.module.css"
import {useSelector} from "react-redux";

export const Page = (props) => {
    const state = useSelector(state => state.appPage)
    return <Container>
        <h1 className={s.h1}>NASA picture of the day</h1>
        <FlexWrapper justify={"center"} align={"center"} gap={"20px"} margin={"50px 0 50px"}>
            <span>Input date range</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    format={"DD/MM/YYYY"}
                    label="Start date"
                    value={""}
                    onChange={(newValue) => props.onStartDateChange(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    format={"DD/MM/YYYY"}
                    label="End date"
                    value={""}
                    onChange={(newValue) => props.onEndDateChange(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button onClick={props.onButtonGetDataFromIntervalClick} variant="contained">Set date interval</Button>
        </FlexWrapper>
        <FlexWrapper justify={"center"} align={"center"} gap={"20px"} margin={"50px 0 50px"}>
            <span>Input specific date</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    format={"DD/MM/YYYY"}
                    label="Specific date"
                    value={""}
                    onChange={(newValue) => props.onCurrentDateChange(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Button onClick={props.onButtonGetDataFromCurrentDayClick} variant="contained">Set specific date</Button>
        </FlexWrapper>
        <FlexWrapper wrap={"wrap"} justify={"space-around"} gap={"20px"}>
            {state.request ? <img src={preloader} height={"500px"} width={"500px"} alt={"preloader"}/>
                : state.src.map((el, index) => <img key={index} height={"500px"} width={"500px"} src={el.url}
                                                    alt={"no data"}/>)}
        </FlexWrapper>
    </Container>
}