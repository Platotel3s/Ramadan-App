export default function ZoneSelector({zone,setZone,city,setCity,indonesiaZones}){
  return(
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="flex gap-4">
        <select 
           value={zone}
           onChange={(e)=>{
             setZone(e.target.value);
             setCity(indonesiaZones[e.target.value][0])
           }
           }
           className="p2 rounded-xl border"
           >
            {Object.keys(indonesiaZones).map((z)=>(
              <option key={z} value={z}>{z}</option>
            ))}
        </select>
        <select
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          className="p-2 rounded-xl border"
        >
          {indonesiaZones[zone].map((c)=>(
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
