import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Heart, Share2, MapPin, Volume2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Trace } from '../types';

interface AudioPlayerModalProps {
  trace: Trace | null;
  onClose: () => void;
  onLikeTrace?: (id: string) => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({
  trace,
  onClose,
  onLikeTrace,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(trace?.likes || 0);

  useEffect(() => {
    if (trace) {
      setLikeCount(trace.likes);
      setLiked(false);
      setProgress(15);
      setIsPlaying(true);
    }
  }, [trace]);

  // Audio simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!trace) return null;

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      if (onLikeTrace) onLikeTrace(trace.id);
    } else {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                أثر صوتي مسجل
              </span>
            </div>
            <button
              onClick={onClose}
              className="touch-target w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-6 flex flex-col items-center text-center">
            {/* Ambient Sound Sphere / Waveform Art */}
            <div className="relative my-4 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-100 via-indigo-50 to-blue-200 flex items-center justify-center shadow-inner">
              <div
                className={`w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center transition-all ${
                  isPlaying ? 'scale-110' : 'scale-100'
                }`}
              >
                <div className="flex items-center gap-1.5 h-10 px-2">
                  {[40, 75, 95, 60, 85, 45, 90, 65, 30].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={
                        isPlaying
                          ? {
                              height: [`${Math.max(15, h * 0.4)}%`, `${h}%`, `${Math.max(20, h * 0.6)}%`],
                            }
                          : { height: '25%' }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        delay: i * 0.08,
                        ease: 'easeInOut',
                      }}
                      className="w-1.5 bg-blue-600 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-900 mt-2">{trace.title}</h3>
            
            <div className="flex items-center gap-2 text-neutral-500 text-xs mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{trace.location}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{trace.timeAgo}</span>
            </div>

            {/* Quote / Transcript */}
            <div className="w-full bg-[#F2F2F7] rounded-2xl p-4 my-5 text-right">
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                "{trace.snippet}"
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500">
                <span>صاحب الأثر: <strong className="text-neutral-800">{trace.author}</strong></span>
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  {trace.audioDuration || '01:34'}
                </span>
              </div>
            </div>

            {/* Audio Progress Scrubber */}
            <div className="w-full space-y-1 mb-6">
              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="bg-blue-600 h-full transition-all duration-150 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>00:{progress < 10 ? `0${Math.floor(progress * 0.6)}` : Math.floor(progress * 0.6)}</span>
                <span>{trace.audioDuration || '01:34'}</span>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-6 w-full">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`touch-target water-glass-surface w-12 h-12 rounded-full flex flex-col items-center justify-center border transition-all duration-150 active:scale-90 cursor-pointer ${
                  liked
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                }`}
                aria-label="إعجاب بالأثر"
              >
                <Heart className={`w-5 h-5 glass-icon-optic ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span className="text-[9px] font-medium">{likeCount}</span>
              </button>

              {/* Main Play / Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="touch-target water-glass-surface glass-icon-container w-16 h-16 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-lg shadow-neutral-950/25 active:scale-90 transition-all duration-150 cursor-pointer hover:bg-neutral-800"
                aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الأثر'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white glass-icon-optic" />
                ) : (
                  <Play className="w-7 h-7 fill-white translate-x-[-1px] glass-icon-optic" />
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: trace.title,
                      text: trace.snippet,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    alert('تم نسخ رابط الأثر لمشاركته');
                  }
                }}
                className="touch-target water-glass-surface w-12 h-12 rounded-full flex items-center justify-center border border-neutral-200 text-neutral-600 hover:bg-neutral-50 active:scale-90 transition-all duration-150 cursor-pointer"
                aria-label="مشاركة الأثر"
              >
                <Share2 className="w-5 h-5 glass-icon-optic" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
