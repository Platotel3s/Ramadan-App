import { LogOut, Moon } from "lucide-react";

export default function Header({user,onLogout}){
  return(
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
        <Moon /> Ramadhan Mubarak, {user}
      </h1>
      <button onClick={onLogout} className="border px-3 py-1 rounded-xl">
        <LogOut />
      </button>
    </div>
  );
}
