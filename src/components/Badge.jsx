import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Badge({completedDays}){
  if (completedDays !==30) {
    return null;
  }
  return(
    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-6 rounded-2xl shadow flex justify-center items-center gap-3">
      <FontAwesomeIcon icon={faTrophy}/>
      <span className="text-xl font-bold">
        Ramadhan Perfect !
      </span>
    </div>
  );
}
