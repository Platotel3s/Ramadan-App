import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Calendar({ calendar, toggleDay }) {
  const weeks = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }

  return (
    <div className="space-y-2">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-2">
          {week.map((day) => (
            <button
              key={day.day}
              onClick={() => toggleDay(day.day - 1)}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center
                transition-all transform hover:scale-105 font-medium
                ${day.done 
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-slate-900/50 text-slate-300 hover:bg-slate-800 border border-emerald-500/10'
                }
              `}
            >
              <span className="text-sm">{day.day}</span>
              {day.done && <span className="text-xs mt-0.5"><FontAwesomeIcon icon={faCheck}/></span>}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
