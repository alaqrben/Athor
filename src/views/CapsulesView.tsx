import React, { useState } from 'react';
import { Lock, Unlock, Calendar, Plus, Sparkles, User, MapPin, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { TimeCapsule } from '../types';

interface CapsulesViewProps {
  capsules: TimeCapsule[];
  onSelectCapsule: (capsule: TimeCapsule) => void;
  onOpenAdd: () => void;
}

export const CapsulesView: React.FC<CapsulesViewProps> = ({
  capsules,
  onSelectCapsule,
  onOpenAdd,
}) => {
  const [filter, setFilter] = useState<'all' | 'locked' | 'unlocked'>('all');
  const [search, setSearch] = useState('');

  const filteredCapsules = capsules.filter((c) => {
    const matchFilter =
      filter === 'all'
        ? true
        : filter === 'locked'
        ? !c.isUnlocked
        : c.isUnlocked;
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.recipient.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const lockedCount = capsules.filter((c) => !c.isUnlocked).length;
  const unlockedCount = capsules.filter((c) => c.isUnlocked).length;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 space-y-6 pb-20 animate-fadeIn">
      
      {/* Header & Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">كبسولاتي الزمنية</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              ذكريات ورسائل موثقة بالختم الزمني المشفر
            </p>
          </div>

          <button
            onClick={onOpenAdd}
            className="touch-target px-4 py-2 bg-neutral-950 text-white rounded-2xl text-xs font-semibold hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>كبسولة جديدة</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="ios-card water-glass-surface bg-purple-50/70 border border-purple-100 p-4 flex flex-col justify-between">
            <span className="text-xs font-semibold text-purple-700">كبسولات مقفلة</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-black text-purple-900">{lockedCount}</span>
              <Lock className="w-5 h-5 text-purple-500 glass-icon-optic" />
            </div>
          </div>

          <div className="ios-card water-glass-surface bg-emerald-50/70 border border-emerald-100 p-4 flex flex-col justify-between">
            <span className="text-xs font-semibold text-emerald-700">كبسولات جاهزة للفتح</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-black text-emerald-900">{unlockedCount}</span>
              <Unlock className="w-5 h-5 text-emerald-500 glass-icon-optic" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث بالاسم أو المرسل إليه..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-neutral-100/90 rounded-2xl text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
          <Search className="w-5 h-5 text-neutral-400 absolute right-3.5 top-3.5 glass-icon-optic" />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`touch-target water-glass-surface px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              filter === 'all'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            الكل ({capsules.length})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`touch-target water-glass-surface px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              filter === 'locked'
                ? 'bg-purple-600 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            مقفلة للمستقبل ({lockedCount})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`touch-target water-glass-surface px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              filter === 'unlocked'
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            مفتوحة ({unlockedCount})
          </button>
        </div>
      </div>

      {/* Capsules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCapsules.map((capsule) => (
          <motion.div
            key={capsule.id}
            whileHover={{ y: -3 }}
            onClick={() => onSelectCapsule(capsule)}
            className="ios-card water-glass-surface bg-white p-5 rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4 group"
            role="button"
            tabIndex={0}
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${capsule.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform glass-icon-container`}
                >
                  {capsule.isUnlocked ? (
                    <Unlock className={`w-6 h-6 ${capsule.iconColor} glass-icon-optic`} />
                  ) : (
                    <Lock className={`w-6 h-6 ${capsule.iconColor} glass-icon-optic`} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-base text-neutral-900 group-hover:text-black">
                    {capsule.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                    <User className="w-3 h-3 glass-icon-optic" />
                    <span>إلى: {capsule.recipient}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-neutral-500 bg-neutral-100/90 px-3 py-1 rounded-full shadow-xs">
                {capsule.unlockYear}
              </span>
            </div>

            {/* Middle Message / Sneak Peek */}
            <div className="bg-[#F2F2F7] rounded-2xl p-3 text-right">
              <p className="text-xs text-neutral-600 line-clamp-2">
                {capsule.isUnlocked ? `"${capsule.message}"` : '🔒 المحتوى مشفر ومحمي بختم زمني...'}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-1 border-t border-neutral-100">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{capsule.locationName}</span>
              </div>

              <span
                className={`font-semibold ${
                  capsule.isUnlocked ? 'text-emerald-600' : 'text-purple-600'
                }`}
              >
                {capsule.timeLeftStr}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
