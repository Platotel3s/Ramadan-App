import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PrayerTimes({ prayerTimes }) {
  if (!prayerTimes) {
    return (
      <div className="text-center text-slate-400 py-4">
        <div className="animate-pulse">Memuat jadwal sholat...</div>
      </div>
    );
  }

  const prayerNames = {
    Fajr: "Subuh",
    Sunrise: "Syuruk",
    Dhuhr: "Dzuhur",
    Asr: "Ashar",
    Maghrib: "Maghrib",
    Isha: "Isya"
  };

  const prayerIcons = {
    Fajr: "🌅",
    Dhuhr: "☀️",
    Asr: "🌤️",
    Maghrib: "🌇",
    Isha: "🌙"
  };

  const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <div>
      <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
        <span><FontAwesomeIcon icon={faClock}/></span> Waktu Sholat
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {prayerOrder.map((prayer) => (
          <div key={prayer} className="text-center p-3 bg-slate-900/50 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
            <div className="text-xl mb-1">{prayerIcons[prayer] || '🕌'}</div>
            <div className="text-xs text-emerald-300 mb-1">{prayerNames[prayer]}</div>
            <div className="text-sm font-bold text-white">{prayerTimes[prayer]}</div>
          </div>
        ))}
      </div>
      {prayerTimes.Fajr && (
        <div className="mt-3 text-center">
          <div className="inline-block bg-slate-900/50 px-4 py-2 rounded-full border border-emerald-500/20">
            <span className="text-xs text-emerald-300">Imsak: </span>
            <span className="text-sm font-bold text-white">
              {(() => {
                const [hour, minute] = prayerTimes.Fajr.split(':');
                const imsakHour = parseInt(hour);
                const imsakMinute = parseInt(minute) - 10;
                if (imsakMinute < 0) {
                  return `${imsakHour - 1}:${60 + imsakMinute}`;
                }
                return `${imsakHour}:${imsakMinute.toString().padStart(2, '0')}`;
              })()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
