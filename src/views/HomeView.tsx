import React from 'react';
import { Lock, ChevronLeft, MapPin, Mic, PenTool, Radio, Sparkles, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { Trace, TimeCapsule } from '../types';
import { MAP_PREVIEW_IMG } from '../data/mockData';

interface HomeViewProps {
  traces: Trace[];
  capsules: TimeCapsule[];
  onSelectTrace: (trace: Trace) => void;
  onSelectCapsule: (capsule: TimeCapsule) => void;
  onExploreMap: () => void;
  onOpenAdd: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  traces,
  capsules,
  onSelectTrace,
  onSelectCapsule,
  onExploreMap,
  onOpenAdd,
}) => {
  // Main featured story from traces (first one or audio one)
  const featuredStory = traces.find((t) => t.category === 'audio') || traces[0];

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-4 space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* 1. Near You Section (قريب منك) */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            قريب منك
          </h2>
          <button
            onClick={onExploreMap}
            className="text-xs text-neutral-500 hover:text-neutral-900 font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>عرض الخريطة</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div
          onClick={onExploreMap}
          className="ios-card water-glass-surface relative h-48 sm:h-56 overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all duration-300"
          role="button"
          tabIndex={0}
          aria-label="استكشف الآثار القريبة على الخريطة"
        >
          {/* Map background image with opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${MAP_PREVIEW_IMG})` }}
          />

          {/* Central Map Pin & Radar Pulse */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-13 h-13 rounded-full bg-white/95 shadow-lg flex items-center justify-center relative glass-icon-container">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500 opacity-30 blur-sm animate-ping" />
              <MapPin className="w-6 h-6 text-neutral-900 fill-neutral-900 glass-icon-optic" />
            </div>

            {/* Pill label */}
            <span className="mt-3 text-xs font-semibold text-neutral-900 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-neutral-100/90">
              <Navigation className="w-3.5 h-3.5 text-blue-600 glass-icon-optic" />
              <span>اكتشف أثر قريب</span>
            </span>
          </div>

          <div className="absolute bottom-3 right-3 text-[11px] font-medium bg-black/60 text-white px-2.5 py-1 rounded-lg backdrop-blur-xs">
            الرياض، حي العليا
          </div>
        </div>
      </section>

      {/* 2. Time Capsules Section (كبسولات الزمن) */}
      <section className="space-y-2.5">
        <div className="flex justify-between items-end px-1">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            كبسولات الزمن
          </h2>
          <span className="text-xs text-neutral-400 font-normal">
            {capsules.length} كبسولات محفوظة
          </span>
        </div>

        {/* Horizontal scroll container with snap */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory py-1 -my-1 px-0.5">
          {capsules.map((cap) => (
            <div
              key={cap.id}
              onClick={() => onSelectCapsule(cap)}
              className="ios-card water-glass-surface min-w-[210px] sm:min-w-[230px] flex-shrink-0 snap-start cursor-pointer shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between aspect-square select-none group"
              role="button"
              tabIndex={0}
              aria-label={`كبسولة زمنية: ${cap.title}`}
            >
              {/* Top row: Lock Icon & Year */}
              <div className="flex justify-between items-start">
                <div
                  className={`w-11 h-11 rounded-full ${cap.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform glass-icon-container`}
                >
                  <Lock className={`w-5 h-5 ${cap.iconColor} glass-icon-optic`} />
                </div>
                <span className="text-xs font-semibold text-neutral-500 bg-white/80 px-2.5 py-1 rounded-full shadow-xs">
                  {cap.unlockYear}
                </span>
              </div>

              {/* Bottom row: Title & Count/Time */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-black">
                  {cap.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-normal">
                  {cap.timeLeftStr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Your Stories Section (قصصك) */}
      {featuredStory && (
        <section className="space-y-2.5">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">
              قصصك
            </h2>
            <span className="text-xs text-neutral-400 font-normal">أثرك الصوتي</span>
          </div>

          <div
            onClick={() => onSelectTrace(featuredStory)}
            className="ios-card water-glass-surface flex flex-col gap-3.5 cursor-pointer shadow-xs hover:shadow-md transition-all duration-200 group"
            role="button"
            tabIndex={0}
            aria-label={`قصتك: ${featuredStory.title}`}
          >
            {/* Header row */}
            <div className="flex justify-between items-center border-b border-neutral-200/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-100/90 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform glass-icon-container">
                  <Radio className="w-6 h-6 animate-pulse glass-icon-optic" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-base font-bold text-neutral-900">
                    {featuredStory.title}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {featuredStory.location}
                  </span>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
            </div>

            {/* Quote and Tag row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-0.5">
              <div className="self-start px-2.5 py-1 bg-blue-50/90 rounded-full text-xs font-semibold text-blue-600 flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>أثر صوتي</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 line-clamp-1 italic text-right flex-1">
                "{featuredStory.snippet}"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. Discovery Feed (أحدث الآثار) */}
      <section className="space-y-2.5 pb-16">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">
            أحدث الآثار
          </h2>
          <span className="text-xs text-neutral-400 font-normal">من حولك في المملكة</span>
        </div>

        {/* Grouped iOS-table style list */}
        <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200/70 shadow-xs divide-y divide-neutral-100">
          {traces.map((trace) => {
            const isAudio = trace.category === 'audio';
            const isDraw = trace.category === 'draw';

            return (
              <div
                key={trace.id}
                onClick={() => onSelectTrace(trace)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 active:bg-neutral-100/90 transition-colors group water-glass-surface"
                role="button"
                tabIndex={0}
                aria-label={`أثر: ${trace.title}`}
              >
                <div className="flex items-center gap-3.5 text-right">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 glass-icon-container ${
                      isDraw
                        ? 'bg-emerald-100/90 text-emerald-600'
                        : isAudio
                        ? 'bg-blue-100/90 text-blue-600'
                        : 'bg-amber-100/90 text-amber-600'
                    }`}
                  >
                    {isDraw ? (
                      <PenTool className="w-4 h-4 glass-icon-optic" />
                    ) : isAudio ? (
                      <Mic className="w-4 h-4 glass-icon-optic" />
                    ) : (
                      <Sparkles className="w-4 h-4 glass-icon-optic" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900 group-hover:text-black">
                      {trace.title}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {trace.timeAgo} • {trace.city}
                    </p>
                  </div>
                </div>

                <ChevronLeft className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
};
