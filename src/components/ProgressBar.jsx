import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProgressBar({completedDays}){
  const progress=(completedDays/30)*100;
  return(
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="font-semibold text-green-700 mb-2">
        <FontAwesomeIcon icon={faBarsProgress}/> Progres Ramadhan
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-green-500 h-4 rounded-full" style={{width:`${progress}%`}} />
      </div>
      <p className="text-sm mt-2">
        {completedDays}/30 days
      </p>
    </div>
  );
}
