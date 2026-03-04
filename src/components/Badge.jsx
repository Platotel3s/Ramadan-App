import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Badge({ completedDays }) {
  const getBadgeInfo = () => {
    if (completedDays >= 30) return { emoji: "🏆", text: "Ramadhan Warrior", color: "from-yellow-400 to-amber-500" };
    if (completedDays >= 20) return { emoji: "⭐", text: "Pesilat Tangguh", color: "from-emerald-400 to-emerald-500" };
    if (completedDays >= 10) return { emoji: "🌙", text: "Pejuang Ramadhan", color: "from-blue-400 to-blue-500" };
    if (completedDays >= 5) return { emoji: "✨", text: "Pemula Bersemangat", color: "from-purple-400 to-purple-500" };
    return { emoji: "🌱", text: "Musafir Ramadhan", color: "from-slate-400 to-slate-500" };
  };

  const badge = getBadgeInfo();

  return (
    <div>
      <h3 className="text-sm font-semibold text-emerald-400 mb-2"><FontAwesomeIcon icon={faMedal}/> Prestasi</h3>
      <div className={`bg-gradient-to-r ${badge.color} p-4 rounded-xl text-white text-center shadow-lg`}>
        <div className="text-3xl mb-1">{badge.emoji}</div>
        <div className="font-bold text-sm">{badge.text}</div>
      </div>
    </div>
  );
}
