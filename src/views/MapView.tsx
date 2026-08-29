import React, { useState } from 'react';
import { MapPin, Navigation, Volume2, PenTool, Sparkles, Filter, Search, Plus, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Trace, TraceCategory } from '../types';
import { MAP_PREVIEW_IMG } from '../data/mockData';

interface MapViewProps {
  traces: Trace[];
  onSelectTrace: (trace: Trace) => void;
  onOpenAdd: () => void;
}

export const MapView: React.FC<MapViewProps> = ({
  traces,
  onSelectTrace,
  onOpenAdd,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePin, setActivePin] = useState<Trace | null>(traces[0] || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTraces = traces.filter((t) => {
    const matchCity = selectedCity === 'all' || t.city === selectedCity;
    const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchCat && matchSearch;
  });

  const cities = ['الرياض', 'جدة', 'العلا', 'الخبر'];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-3 space-y-4 pb-20 animate-fadeIn">
      
      {/* Search & Filter Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900">خريطة الآثار</h2>
          <span className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full font-medium">
            {filteredTraces.length} أثر متاح
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن مكان أو أثر أو قصة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-neutral-100/90 rounded-2xl text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
          <Search className="w-5 h-5 text-neutral-400 absolute right-3.5 top-3.5" />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`touch-target water-glass-surface px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-all ${
              selectedCategory === 'all'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedCategory('audio')}
            className={`touch-target water-glass-surface px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1.5 transition-all ${
              selectedCategory === 'audio'
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 glass-icon-optic" />
            <span>آثار صوتية</span>
          </button>
          <button
            onClick={() => setSelectedCategory('draw')}
            className={`touch-target water-glass-surface px-4 py-2 rounded-full text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1.5 transition-all ${
              selectedCategory === 'draw'
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5 glass-icon-optic" />
            <span>مخططات ورسوم</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-neutral-200 shadow-md bg-neutral-100 water-glass-surface">
        
        {/* Stylized Vector Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${MAP_PREVIEW_IMG})` }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

        {/* Interactive Traces Pins */}
        {filteredTraces.map((trace, index) => {
          const isSelected = activePin?.id === trace.id;
          const isAudio = trace.category === 'audio';

          return (
            <div
              key={trace.id}
              onClick={() => setActivePin(trace)}
              style={{
                top: `${Math.min(80, Math.max(15, trace.coordinates.y))}%`,
                left: `${Math.min(85, Math.max(15, trace.coordinates.x))}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              {/* Radar pulse for active */}
              {isSelected && (
                <div className="absolute -inset-3 rounded-full bg-blue-500/30 animate-ping" />
              )}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 glass-icon-container ${
                  isSelected
                    ? 'bg-neutral-950 text-white ring-4 ring-white scale-110'
                    : isAudio
                    ? 'bg-blue-600 text-white ring-2 ring-white'
                    : 'bg-emerald-600 text-white ring-2 ring-white'
                }`}
              >
                {isAudio ? <Volume2 className="w-4 h-4 glass-icon-optic" /> : <PenTool className="w-4 h-4 glass-icon-optic" />}
              </div>

              {/* Pin tooltip label */}
              <div
                className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md pointer-events-none transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-white opacity-100 scale-100'
                    : 'bg-white/90 text-neutral-800 opacity-0 group-hover:opacity-100'
                }`}
              >
                {trace.title}
              </div>
            </div>
          );
        })}

        {/* Locate Me Floating Action Button */}
        <button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                () => alert('تم تحديد موقعك بدقة في حي العليا، الرياض'),
                () => alert('تم محاكاة الموقع بدقة: الرياض، العليا')
              );
            }
          }}
          className="absolute top-4 left-4 touch-target water-glass-surface w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md shadow-md text-neutral-800 flex items-center justify-center hover:bg-white active:scale-95 transition-all cursor-pointer z-30 glass-icon-container"
          aria-label="تحديد موقعي الحالي"
          title="موقعي الحالي"
        >
          <Navigation className="w-5 h-5 text-blue-600 glass-icon-optic" />
        </button>

        {/* City Filter Pills inside Map */}
        <div className="absolute top-4 right-4 flex gap-1.5 z-30">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? 'all' : city)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all cursor-pointer water-glass-surface ${
                selectedCity === city
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white/80 text-neutral-800 hover:bg-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Trace Bottom Card */}
      {activePin && (
        <motion.div
          key={activePin.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="ios-card water-glass-surface bg-white p-4.5 rounded-3xl border border-neutral-200/80 shadow-md flex flex-col gap-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 text-right">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center glass-icon-container ${
                  activePin.category === 'audio'
                    ? 'bg-blue-100/90 text-blue-600'
                    : 'bg-emerald-100/90 text-emerald-600'
                }`}
              >
                {activePin.category === 'audio' ? (
                  <Volume2 className="w-5 h-5 glass-icon-optic" />
                ) : (
                  <PenTool className="w-5 h-5 glass-icon-optic" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-base text-neutral-900">{activePin.title}</h3>
                <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 glass-icon-optic" />
                  <span>{activePin.location}</span>
                  <span>•</span>
                  <span>{activePin.timeAgo}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectTrace(activePin)}
              className="touch-target water-glass-surface px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              استماع / عرض
            </button>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 bg-[#F2F2F7] p-3 rounded-xl text-right leading-relaxed">
            "{activePin.snippet}"
          </p>
        </motion.div>
      )}

      {/* Add Trace Quick Trigger */}
      <div className="pt-2">
        <button
          onClick={onOpenAdd}
          className="touch-target water-glass-surface w-full py-3.5 rounded-2xl bg-neutral-900 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-5 h-5 glass-icon-optic" />
          <span>تثبيت أثر صوتي أو كبسولة في هذا الموقع</span>
        </button>
      </div>

    </div>
  );
};
