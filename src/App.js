import React from "react";
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

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
    const [startDate,setStartDate] = useState(date)
    const [endDate,setEndDate] = useState(date)
    const [src,setSrc] = useState([])
    const [request, setRequest] = useState(false)
    debugger
/*    useEffect(()=>{
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl`)
        .then((response)=>setSrc(response.data.hdurl))
    },[])*/
    const onButtonClick = ()=>{
        setRequest(true)
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl&start_date=${startDate}&end_date=${endDate}`)
            .then((response)=>{
                setSrc([])
                response.data.map(el=>setSrc([...src,el.hdurl]))
                setRequest(false)
            })
    }
  return (
    <div className="App">
      <div className={"date-wrapper"}>
          <input value={startDate} onChange={(e)=>setStartDate(e.currentTarget.value)} type={"date"}/>
          <input value={endDate} onChange={(e)=>setEndDate(e.currentTarget.value)} type={"date"}/>
          <button onClick={onButtonClick}>Get data</button>
      </div>
        <div className={"img-wrapper"}>
            {request?<div>крутилка</div>:src.map(el=> <img src={el} width={"500px"} height={"500px"}/>)}
        </div>
    </div>
  );
}

export default App;
