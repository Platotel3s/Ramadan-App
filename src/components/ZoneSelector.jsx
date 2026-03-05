import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ZoneSelector({ zone, setZone, city, setCity, indonesiaZones }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
        <span><FontAwesomeIcon icon={faLocation}/></span> Lokasi
      </h3>
      <div className="flex gap-3">
        <select 
          value={zone} 
          onChange={(e) => {
            setZone(e.target.value);
            setCity(indonesiaZones[e.target.value][0]);
          }}
          className="flex-1 p-3 bg-slate-900/50 rounded-xl border border-emerald-500/20 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
        >
          {Object.keys(indonesiaZones).map(z => (
            <option key={z} value={z} className="bg-slate-800">{z}</option>
          ))}
        </select>
        <select 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-3 bg-slate-900/50 rounded-xl border border-emerald-500/20 text-white focus:border-emerald-400 focus:outline-none cursor-pointer"
        >
          {indonesiaZones[zone].map(c => (
            <option key={c} value={c} className="bg-slate-800">{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
