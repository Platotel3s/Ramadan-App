import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Badge from "./components/Badge";
import Calendar from "./components/Calendar";
import PrayerTimes from "./components/PrayerTimes";
import ProgressBar from "./components/ProgressBar";
import ZoneSelector from "./components/ZoneSelector";
import DailyStats from "./components/DailyStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { faCalendar, faLocation } from "@fortawesome/free-solid-svg-icons";
import { faBarsProgress } from "@fortawesome/free-solid-svg-icons/faBarsProgress";

export default function App(){
  const [user,setUser]=useState(null);
  const [calendar,setCalendar]=useState(
    Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      done: false,
    }))
  );

  const indonesiaZones={
    WIB:["Jakarta","Medan","Bandung","Semarang","Surabaya"],
    WITA:["Denpasar","Makassar","Balikpapan","Mataram"],
    WIT:["Jayapura","Ambon","Sorong","Ternate"]
  };

  const [zone,setZone]=useState("WIB");
  const [city,setCity]=useState("Bandung");
  const [prayerTimes,setPrayerTimes]=useState(null);
  const completedDays=calendar.filter((d)=>d.done).length;
  
  const [showDailyStats, setShowDailyStats] = useState(false);

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
      confetti({particleCount:200,spread:120, colors: ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f59e0b']})
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-emerald-500/30">
        <div className="container mx-auto px-4">
          <Header user={user} onLogout={handleLogout}/>
         
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setShowDailyStats(false)}
              className={`flex-1 py-2 px-4 rounded-t-lg transition-all font-medium
                ${!showDailyStats 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-emerald-300'}`}
            >
              <FontAwesomeIcon icon={faCalendar}/> Ramadhan Tracker
            </button>
            <button
              onClick={() => setShowDailyStats(true)}
              className={`flex-1 py-2 px-4 rounded-t-lg transition-all font-medium
                ${showDailyStats 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-emerald-300'}`}
            >
              <FontAwesomeIcon icon={faBarsProgress}/> Daily Stats
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {!showDailyStats ? (
          <div className="space-y-5">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
              <ZoneSelector 
                zone={zone}
                setZone={setZone}
                city={city}
                setCity={setCity}
                indonesiaZones={indonesiaZones}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl border border-emerald-500/20 shadow-xl">
                <div className="text-4xl font-bold text-emerald-400 mb-1">
                  {completedDays}/30
                </div>
                <div className="text-sm text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Hari Puasa
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl border border-emerald-500/20 shadow-xl">
                <div className="text-4xl font-bold text-amber-400 mb-1">
                  {30 - completedDays}
                </div>
                <div className="text-sm text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                  Sisa Hari
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-emerald-500/20 shadow-xl">
              <PrayerTimes prayerTimes={prayerTimes}/>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-emerald-500/20 shadow-xl">
              <ProgressBar completedDays={completedDays}/>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl border border-emerald-500/20 shadow-xl">
                <Badge completedDays={completedDays}/>
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-2xl border border-emerald-500/20 shadow-xl">
                <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-1">
                  <span><FontAwesomeIcon icon={faStar}/></span> Info Ramadhan
                </h3>
                <p className="text-lg text-white font-medium">
                  {new Date().toLocaleDateString('id-ID', { 
                    day: 'numeric', 
                    month: 'long'
                  })}
                </p>
                <p className="text-sm text-emerald-300 mt-2 flex items-center gap-1">
                  <span><FontAwesomeIcon icon={faLocation}/></span> {city}, {zone}
                </p>
                <div className="mt-3 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg">
                  ✨ {30 - completedDays} hari lagi menuju kemenangan
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-emerald-500/20 shadow-xl">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                <span><FontAwesomeIcon icon={faCalendar}/></span> Kalender Ramadhan
              </h3>
              <Calendar calendar={calendar} toggleDay={toggleDay}/>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <DailyStats />
          </div>
        )}
      </div>

      <div className="text-center py-4 text-xs text-slate-500 border-t border-emerald-500/20 bg-slate-900/50">
        <span className="text-emerald-400">✨</span> Ramadan Mubarak 1446 H • {user} <span className="text-emerald-400">✨</span>
      </div>
    </div>
  );
}
