import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Badge from "./components/Badge";
import Calendar from "./components/Calendar";
import PrayerTimes from "./components/PrayerTimes";
import ProgressBar from "./components/ProgressBar";
import ZoneSelector from "./components/ZoneSelector";

export default function App(){
  const [user,setUser]=useState(null);
  const [calendar,setCalendar]=useState(
    Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      done: false,
    }))
  );
  const indonesiaZones={
    WIB:["Jakarta","Medan","Bandung"],
    WITA:["Denpasar","Makassar"],
    WIT:["Jayapura","Ambon"]
  };
  const [zone,setZone]=useState("WIB");
  const [city,setCity]=useState("Jakarta");
  const [prayerTimes,setPrayerTimes]=useState(null);
  const completedDays=calendar.filter((d)=>d.done).length;
  useEffect(()=>{
    const savedUser=localStorage.getItem("ramadhan_user");
    const savedCalendar=JSON.parse(
      localStorage.getItem("ramadhan_calendar")
    );
    if(savedUser) setUser(savedUser);
    if(savedCalendar) setCalendar(savedCalendar);
  },[]);
  useEffect(()=>{
    localStorage.setItem(
      "ramadhan_calendar",
      JSON.stringify(calendar)
    );
    if(completedDays===30){
      confetti({particleCount:200,spread:120})
    }
  },[calendar]);
  useEffect(()=>{
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=2`
    )
    .then((res)=>res.json())
    .then((data) => {
      console.log(data);
      setPrayerTimes(data.data.timings);
    })
.catch((err) => console.error(err));
  },[city]);
  const toggleDay=(index)=>{
    const updated=[...calendar]
    updated[index].done=!updated[index].done;
    setCalendar(updated)
  };
  const handleLogin=(username)=>{
    localStorage.setItem("ramadhan_user",username);
    setUser(username);
  };
  const handleLogout=()=>{
    localStorage.removeItem("ramadhan_user");
    setUser(null);
  };
  if(!user){
    return <Login onLogin={handleLogin}/>
  }
  return(
    <div>
      <div>
        <Header user={user} onLogout={handleLogout}/>
        <ZoneSelector 
          zone={zone}
          setZone={setZone}
          city={city}
          setCity={setCity}
          indonesiaZones={indonesiaZones}
        />
        <PrayerTimes prayerTimes={prayerTimes}/>
        <ProgressBar completedDays={completedDays}/>
        <Badge completedDays={completedDays}/>
        <Calendar calendar={calendar} toggleDay={toggleDay}/>
      </div>
    </div>
  );
}
