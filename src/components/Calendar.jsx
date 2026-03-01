import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Calendar({ calendar, toggleDay }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="font-semibold text-green-700 mb-3">
        <FontAwesomeIcon icon={faCalendar}/> Kalender Ramadhan
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
  );
}
