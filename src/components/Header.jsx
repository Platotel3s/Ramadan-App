import { LogOut, Moon } from "lucide-react";

export default function Header({ user, onLogout }) {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center gap-3">
        <div className="text-2xl text-white"><FontAwesomeIcon icon={faMoon}/></div>
        <div>
          <h1 className="text-xl font-bold text-white">
            Ramadhan Mubarak, <span className="text-emerald-400">{user}</span>
          </h1>
          <p className="text-xs text-slate-400"><FontAwesomeIcon icon={faCloudMoon}/> Marhaban ya Ramadhan 1446 H</p>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm text-slate-300 transition-all border border-emerald-500/20 hover:border-emerald-500/50"
      >
        <FontAwesomeIcon icon={faSignOut}/> Keluar
      </button>
    </div>
  );
}
