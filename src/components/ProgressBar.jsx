import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProgressBar({ completedDays }) {
  const progress = (completedDays / 30) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
          <span><FontAwesomeIcon icon={faBarsProgress}/></span> Progres Ramadhan
        </h3>
        <span className="text-sm text-emerald-300">{completedDays}/30 hari</span>
      </div>
      <div className="w-full bg-slate-900/50 rounded-full h-4 overflow-hidden border border-emerald-500/20">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-4 rounded-full transition-all duration-500 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        {progress < 33 && "Awal yang baik, semangat!"}
        {progress >= 33 && progress < 66 && " Pertahankan, setengah jalan!"}
        {progress >= 66 && progress < 100 && "Hampir finish, kuatkan iman!"}
        {progress === 100 && "Selamat menyelesaikan puasa!"}
      </p>
    </div>
  );
}
