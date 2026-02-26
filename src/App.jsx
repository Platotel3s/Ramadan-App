import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Moon,
  LogOut,
  Trophy,
} from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [calendar, setCalendar] = useState(
    Array.from({ length: 30 }, (_, i) => ({ day: i + 1, done: false }))
  );

  const indonesiaZones = {
    WIB: ["Jakarta", "Medan", "Bandung"],
    WITA: ["Makassar", "Denpasar"],
    WIT: ["Jayapura", "Ambon"],
  };

  const [zone, setZone] = useState("WIB");
  const [city, setCity] = useState("Jakarta");
  const [prayerTimes, setPrayerTimes] = useState(null);

  const completedDays = calendar.filter(d => d.done).length;
  const progress = (completedDays / 30) * 100;

  useEffect(() => {
    const savedUser = localStorage.getItem("ramadan_user");
    const savedCalendar = JSON.parse(localStorage.getItem("ramadan_calendar"));
    if (savedUser) setUser(savedUser);
    if (savedCalendar) setCalendar(savedCalendar);
  }, []);

  useEffect(() => {
    localStorage.setItem("ramadan_calendar", JSON.stringify(calendar));
    if (completedDays === 30) {
      confetti({ particleCount: 200, spread: 120 });
    }
  }, [calendar]);

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=2`
    )
      .then(res => res.json())
      .then(data => setPrayerTimes(data.data.timings));
  }, [city]);

  const toggleDay = (index) => {
    const updated = [...calendar];
    updated[index].done = !updated[index].done;
    setCalendar(updated);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-yellow-100">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
            🌙 Ramadan Login
          </h1>
          <input
            className="w-full p-2 border rounded-xl mb-4"
            placeholder="Nama kamu"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button
            onClick={() => {
              localStorage.setItem("ramadan_user", username);
              setUser(username);
            }}
            className="w-full bg-green-500 text-white py-2 rounded-xl"
          >
            Masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-yellow-50 to-green-200 p-4">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
            <Moon /> Ramadan Mubarak, {user}
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("ramadan_user");
              setUser(null);
            }}
            className="border px-3 py-1 rounded-xl"
          >
            <LogOut />
          </button>
        </div>

        {/* Zona & Kota */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="flex gap-4">
            <select
              value={zone}
              onChange={e => {
                setZone(e.target.value);
                setCity(indonesiaZones[e.target.value][0]);
              }}
              className="p-2 rounded-xl border"
            >
              {Object.keys(indonesiaZones).map(z => (
                <option key={z}>{z}</option>
              ))}
            </select>

            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="p-2 rounded-xl border"
            >
              {indonesiaZones[zone].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Jadwal Sholat */}
        {prayerTimes && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              ["Imsak", prayerTimes.Imsak],
              ["Subuh", prayerTimes.Fajr],
              ["Dzuhur", prayerTimes.Dhuhr],
              ["Ashar", prayerTimes.Asr],
              ["Maghrib", prayerTimes.Maghrib],
              ["Isya", prayerTimes.Isha],
            ].map(([name, time]) => (
              <div
                key={name}
                className="bg-gradient-to-br from-green-300 to-yellow-200 p-4 rounded-2xl text-center shadow"
              >
                <div className="font-semibold">{name}</div>
                <div className="text-xl font-bold">{time}</div>
              </div>
            ))}
          </div>
        )}

        {/* Progress */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="font-semibold text-green-700 mb-2">
            📊 Progress Ramadhan
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-2">{completedDays} / 30 hari</p>
        </div>

        {/* Badge */}
        {completedDays === 30 && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl shadow flex justify-center items-center gap-3">
            <Trophy />
            <span className="text-xl font-bold">Ramadhan Perfect!</span>
          </div>
        )}

        {/* Kalender */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold text-green-700 mb-3">
            🗓️ Kalender Ramadhan
          </h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {calendar.map((item, i) => (
              <div
                key={i}
                onClick={() => toggleDay(i)}
                className={`cursor-pointer text-center p-2 rounded-xl font-semibold ${
                  item.done
                    ? "bg-green-500 text-white"
                    : "bg-yellow-100 text-green-700"
                }`}
              >
                {item.day}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

