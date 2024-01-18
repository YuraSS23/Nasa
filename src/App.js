import React from "react";
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import preloader from "./assets/images/30.gif"
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
    useEffect(()=>{
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl`)
            .then((response)=>setSrc([response.data]))
    },[])
    const onButtonClick = ()=>{
        setRequest(true)
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl&start_date=${startDate}&end_date=${endDate}`)
            .then((response)=>{
                setSrc([])
                setSrc(response.data)
                debugger
                //response.data.map(el=>setSrc([...src,el.hdurl]))
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
            {request?<img src={preloader} height={"500px"} width={"500px"}/>:src.map((el,index)=> <div key={index}>{<img height={"500px"} width={"500px"} src={el.url} alt={"no data"}/>}</div>)}
        </div>
    </div>
  );
}

export default App;
