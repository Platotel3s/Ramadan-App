import { useState, useEffect } from 'react';
import { 
  FaMoon, 
  FaQuran, 
  FaHandHoldingHeart,
  FaPray,
  FaCheckCircle,
  FaRegCircle,
  FaChartLine,
  FaMosque,
} from 'react-icons/fa';

const DailyStats = () => {
  const [dailyStats, setDailyStats] = useState({
    date: new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    hijriDate: '',
    puasa: {
      sahur: false,
      berbuka: false,
      niat: false
    },
    sholat: {
      subuh: false,
      dzuhur: false,
      ashar: false,
      maghrib: false,
      isya: false,
      tarawih: false
    },
    quran: {
      juz: 0,
      halaman: 0,
      targetHalaman: 20
    },
    sedekah: {
      nominal: 0,
      catatan: ''
    },
    amalanTambahan: []
  });

  const [showSedekahInput, setShowSedekahInput] = useState(false);
  const [newAmalan, setNewAmalan] = useState('');
  const [quranProgress, setQuranProgress] = useState(0);
  useEffect(() => {
    const savedStats = localStorage.getItem('dailyStats');
    if (savedStats) {
      setDailyStats(JSON.parse(savedStats));
    }
    calculateHijriDate();
  }, []);
  useEffect(() => {
    localStorage.setItem('dailyStats', JSON.stringify(dailyStats));
    calculateQuranProgress();
  }, [dailyStats]);
  const calculateHijriDate = () => {
    const today = new Date();
    const hijri = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(today);
    setDailyStats(prev => ({ ...prev, hijriDate: hijri }));
  };
  const calculateQuranProgress = () => {
    const progress = (dailyStats.quran.halaman / dailyStats.quran.targetHalaman) * 100;
    setQuranProgress(Math.min(progress, 100));
  };
  const toggleSholat = (waktu) => {
    setDailyStats(prev => ({
      ...prev,
      sholat: {
        ...prev.sholat,
        [waktu]: !prev.sholat[waktu]
      }
    }));
  };
  const togglePuasa = (item) => {
    setDailyStats(prev => ({
      ...prev,
      puasa: {
        ...prev.puasa,
        [item]: !prev.puasa[item]
      }
    }));
  };
  const updateQuranPages = (type) => {
    setDailyStats(prev => ({
      ...prev,
      quran: {
        ...prev.quran,
        halaman: type === 'add' 
          ? prev.quran.halaman + 1 
          : Math.max(0, prev.quran.halaman - 1)
      }
    }));
  };
  const updateQuranJuz = (type) => {
    setDailyStats(prev => ({
      ...prev,
      quran: {
        ...prev.quran,
        juz: type === 'add' 
          ? Math.min(30, prev.quran.juz + 1)
          : Math.max(0, prev.quran.juz - 1)
      }
    }));
  };
  const updateSedekah = (nominal, catatan = '') => {
    setDailyStats(prev => ({
      ...prev,
      sedekah: {
        nominal: parseInt(nominal) || 0,
        catatan: catatan
      }
    }));
    setShowSedekahInput(false);
  };
  const addAmalan = () => {
    if (newAmalan.trim()) {
      setDailyStats(prev => ({
        ...prev,
        amalanTambahan: [...prev.amalanTambahan, {
          id: Date.now(),
          nama: newAmalan,
          selesai: false
        }]
      }));
      setNewAmalan('');
    }
  };
  const toggleAmalan = (id) => {
    setDailyStats(prev => ({
      ...prev,
      amalanTambahan: prev.amalanTambahan.map(item =>
        item.id === id ? { ...item, selesai: !item.selesai } : item
      )
    }));
  };
  const deleteAmalan = (id) => {
    setDailyStats(prev => ({
      ...prev,
      amalanTambahan: prev.amalanTambahan.filter(item => item.id !== id)
    }));
  };
  const countCompletedSholat = () => {
    return Object.values(dailyStats.sholat).filter(Boolean).length;
  };
  const calculateOverallProgress = () => {
    const sholatWeight = 40;
    const puasaWeight = 30;
    const quranWeight = 20;
    const sedekahWeight = 10;
    const sholatProgress = (countCompletedSholat() / 6) * sholatWeight;
    const puasaProgress = (Object.values(dailyStats.puasa).filter(Boolean).length / 3) * puasaWeight;
    const quranProgressValue = (dailyStats.quran.halaman / dailyStats.quran.targetHalaman) * quranWeight;
    const sedekahProgress = dailyStats.sedekah.nominal > 0 ? sedekahWeight : 0;

    return Math.min(
      Math.round(sholatProgress + puasaProgress + quranProgressValue + sedekahProgress),
      100
    );
  };

  return (
    <div className="daily-stats-container p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl text-white">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400">Daily Stats</h2>
          <p className="text-sm text-gray-400">{dailyStats.date}</p>
          <p className="text-xs text-emerald-300">{dailyStats.hijriDate}</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-400">
            {calculateOverallProgress()}%
          </div>
          <p className="text-xs text-gray-400">Overall Progress</p>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-700 stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            />
            <circle
              className="text-emerald-400 stroke-current transition-all duration-1000 ease-in-out"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - calculateOverallProgress() / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaMosque className="text-3xl text-emerald-400" />
          </div>
        </div>
      </div>
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaMoon className="text-yellow-400" /> Puasa
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(dailyStats.puasa).map(([key, value]) => (
            <button
              key={key}
              onClick={() => togglePuasa(key)}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all transform hover:scale-105
                ${value 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              {value ? <FaCheckCircle /> : <FaRegCircle />}
              <span className="text-xs capitalize">{key}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaPray className="text-emerald-400" /> Sholat ({countCompletedSholat()}/6)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(dailyStats.sholat).map(([waktu, selesai]) => (
            <button
              key={waktu}
              onClick={() => toggleSholat(waktu)}
              className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all transform hover:scale-105
                ${selesai 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
            >
              {selesai ? <FaCheckCircle /> : <FaRegCircle />}
              <span className="text-xs capitalize">{waktu}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaQuran className="text-emerald-400" /> Tilawah
        </h3>
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress Hari Ini</span>
            <span>{dailyStats.quran.halaman}/{dailyStats.quran.targetHalaman} hlm</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${quranProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Juz:</span>
            <button 
              onClick={() => updateQuranJuz('subtract')}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >-</button>
            <span className="w-8 text-center">{dailyStats.quran.juz}</span>
            <button 
              onClick={() => updateQuranJuz('add')}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >+</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Halaman:</span>
            <button 
              onClick={() => updateQuranPages('subtract')}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >-</button>
            <span className="w-8 text-center">{dailyStats.quran.halaman}</span>
            <button 
              onClick={() => updateQuranPages('add')}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >+</button>
          </div>
        </div>
      </div>
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaHandHoldingHeart className="text-emerald-400" /> Sedekah
        </h3>
        
        {!showSedekahInput ? (
          <button
            onClick={() => setShowSedekahInput(true)}
            className="w-full p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {dailyStats.sedekah.nominal > 0 
              ? `Rp ${dailyStats.sedekah.nominal.toLocaleString()} - ${dailyStats.sedekah.catatan || 'Tanpa catatan'}`
              : '+ Tambah Sedekah'}
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Nominal (Rp)"
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-emerald-400 outline-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateSedekah(e.target.value, '');
                }
              }}
            />
            <input
              type="text"
              placeholder="Catatan (opsional)"
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-emerald-400 outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const nominal = document.querySelector('input[type="number"]').value;
                  const catatan = document.querySelector('input[type="text"]').value;
                  updateSedekah(nominal, catatan);
                }}
                className="flex-1 p-2 bg-emerald-600 rounded hover:bg-emerald-700"
              >
                Simpan
              </button>
              <button
                onClick={() => setShowSedekahInput(false)}
                className="p-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FaChartLine className="text-emerald-400" /> Amalan Tambahan
        </h3>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newAmalan}
            onChange={(e) => setNewAmalan(e.target.value)}
            placeholder="Tambah amalan..."
            className="flex-1 p-2 bg-gray-700 rounded border border-gray-600 focus:border-emerald-400 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && addAmalan()}
          />
          <button
            onClick={addAmalan}
            className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700"
          >
            Tambah
          </button>
        </div>

        <div className="space-y-2">
          {dailyStats.amalanTambahan.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 bg-gray-700 rounded">
              <div className="flex items-center gap-2">
                <button onClick={() => toggleAmalan(item.id)}>
                  {item.selesai 
                    ? <FaCheckCircle className="text-emerald-400" />
                    : <FaRegCircle className="text-gray-400" />
                  }
                </button>
                <span className={item.selesai ? 'line-through text-gray-400' : ''}>
                  {item.nama}
                </span>
              </div>
              <button
                onClick={() => deleteAmalan(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                Hapus
              </button>
            </div>
          ))}
          {dailyStats.amalanTambahan.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-2">
              Belum ada amalan tambahan
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          if (window.confirm('Reset semua progress hari ini?')) {
            localStorage.removeItem('dailyStats');
            window.location.reload();
          }
        }}
        className="w-full p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 text-sm"
      >
        Reset Hari Ini
      </button>
    </div>
  );
};

export default DailyStats;
