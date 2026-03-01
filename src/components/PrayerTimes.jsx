export default function PrayerTimes({prayerTimes}){
  if (!prayerTimes) {
    return null;
  }
  const items=[
    ["Imsak",prayerTimes.Imsak],
    ["Subuh",prayerTimes.Fajr],
    ["Dzuhur",prayerTimes.Dhuhr],
    ["Ashar",prayerTimes.Asr],
    ["Maghrib",prayerTimes.Maghrib],
    ["Isya",prayerTimes.Isha]
  ];
  return(
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
    {items.map(([name,time])=>(
      <div key={name} className="bg-gradient-to-br from-green-300 to-yellow-200 p-4 rounded-2xl text-center shadow">
        <div className="font-semibold">
          {name}
        </div>
        <div>
          {time}
        </div>
      </div>
    ))}
    </div>
  );
}
