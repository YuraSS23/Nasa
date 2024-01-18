import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [src,setSrc] = useState("")
/*  useEffect(()=>{
    axios.get("https://api.nasa.gov/planetary/apod?api_key=EfaW0Se22lvyshyw2NjYZrUgvxLEX8pp3mVtUmEl")
        .then((data)=>setSrc(data.data.hdurl))
  },[])*/
  return (
    <div className="App">
      <div className={"date-wrapper"}>
          <input type={"date"}/>
          <input type={"date"}/>
      </div>
        <div className={"img-wrapper"}>
            <img src={src} width={"500px"} height={"500px"}/>
        </div>
    </div>
  );
}

export default App;
