import React from "react";
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import preloader from "./assets/images/30.gif"
import {Container} from "./components/Container";
import {FlexWrapper} from "./components/Flex-wrapper";

function App() {
    let dayFormatter = new Intl.DateTimeFormat("en", {
        day: "2-digit",
    })
    let monthFormatter = new Intl.DateTimeFormat("en", {
        month: "2-digit",
    })
    let yearFormatter = new Intl.DateTimeFormat("en", {
        year: "numeric"
    })
    const date = `${yearFormatter.format(new Date())}-${monthFormatter.format(new Date())}-${dayFormatter.format(new Date())}`
    const [startDate, setStartDate] = useState(date)
    const [endDate, setEndDate] = useState(date)
    const [currentDate, setCurrentDate] = useState(date)
    const [src, setSrc] = useState([])
    const [request, setRequest] = useState(false)
    debugger
    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl`)
            .then((response) => setSrc([response.data]))
    }, [])
    const onButtonClick = () => {
        setRequest(true)
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl&start_date=${startDate}&end_date=${endDate}`)
            .then((response) => {
                setSrc([])
                setSrc(response.data)
                setRequest(false)
            })
    }
    const onButton2Click = () => {
        setRequest(true)
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl&start_date=${currentDate}&end_date=${currentDate}`)
            .then((response) => {
                setSrc([])
                setSrc(response.data)
                setRequest(false)
            })
    }
    return (
        <Container>
            <div className="App">
                <h1>NASA picture of the day</h1>
                <div className={"date-wrapper"}>
                    <span>Input date</span>
                    <input value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)} type={"date"}/>
                    <input value={endDate} onChange={(e) => setEndDate(e.currentTarget.value)} type={"date"}/>
                    <button onClick={onButtonClick}>Get data</button>
                </div>
                <div className={"date-wrapper"}>
                    <span>Input current date</span>
                    <input value={currentDate} onChange={(e) => setCurrentDate(e.currentTarget.value)} type={"date"}/>
                    <button onClick={onButton2Click}>Get data</button>
                </div>
                <FlexWrapper wrap={"wrap"} justify={"space-around"} gap={"20px"}>
                    {request ? <img src={preloader} height={"500px"} width={"500px"} alt={"preloader"} className={"nasa-img"}/>
                        : src.map((el, index) => <img key={index} height={"500px"} width={"500px"} src={el.url} alt={"no data"}/>)}
                </FlexWrapper>
                </div>
        </Container>
    );
}

export default App;
