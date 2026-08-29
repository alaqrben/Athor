import React, { useState } from 'react';
import { X, Lock, Unlock, Calendar, User, MapPin, Sparkles, Volume2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { TimeCapsule } from '../types';

interface CapsuleModalProps {
  capsule: TimeCapsule | null;
  onClose: () => void;
  onUnlockCapsule?: (id: string) => void;
}

export const CapsuleModal: React.FC<CapsuleModalProps> = ({
  capsule,
  onClose,
  onUnlockCapsule,
}) => {
  const [unlockedState, setUnlockedState] = useState(capsule?.isUnlocked || false);
  const [showOverridePrompt, setShowOverridePrompt] = useState(false);

  if (!capsule) return null;

  const handleForceUnlock = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setUnlockedState(true);
    if (onUnlockCapsule) onUnlockCapsule(capsule.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${unlockedState ? 'bg-emerald-500' : 'bg-purple-600'}`} />
              <span className="text-xs font-semibold text-neutral-600">
                {unlockedState ? 'كبسولة مفتوحة' : `كبسولة مغلقة حتى ${capsule.unlockYear}`}
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

          {/* Icon & Title */}
          <div className="py-5 flex flex-col items-center text-center">
            <div
              className={`w-20 h-20 rounded-full ${capsule.iconBg} flex items-center justify-center mb-3 shadow-inner glass-icon-container`}
            >
              {unlockedState ? (
                <Unlock className={`w-9 h-9 ${capsule.iconColor} glass-icon-optic`} />
              ) : (
                <Lock className={`w-9 h-9 ${capsule.iconColor} glass-icon-optic`} />
              )}
            </div>

            <h3 className="text-2xl font-bold text-neutral-900">{capsule.title}</h3>
            
            <div className="flex items-center gap-2 text-neutral-500 text-xs mt-2">
              <Calendar className="w-3.5 h-3.5 glass-icon-optic" />
              <span>تاريخ الفتح المستهدف: {capsule.unlockYear}</span>
              <span>•</span>
              <MapPin className="w-3.5 h-3.5 glass-icon-optic" />
              <span>{capsule.locationName}</span>
            </div>

            {/* Recipient & Metadata Badge */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <div className="flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700">
                <User className="w-3 h-3 text-neutral-500 glass-icon-optic" />
                <span>المرسل إليه: <strong>{capsule.recipient}</strong></span>
              </div>
              <div className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-600 font-medium">
                {capsule.timeLeftStr}
              </div>
            </div>

            {/* Content Area */}
            {unlockedState ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-[#F2F2F7] rounded-2xl p-5 my-5 text-right border border-emerald-100 water-glass-surface"
              >
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold mb-2">
                  <Sparkles className="w-4 h-4 glass-icon-optic" />
                  <span>محتوى الكبسولة السري المفتوح</span>
                </div>
                <p className="text-base text-neutral-800 leading-relaxed">
                  "{capsule.message}"
                </p>
                {capsule.mediaType === 'audio' && (
                  <div className="mt-4 p-3 bg-white rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-purple-600 glass-icon-optic" />
                      <span className="text-xs font-medium text-neutral-800">تسجيل صوتي مدمج</span>
                    </div>
                    <span className="text-xs text-neutral-500">{capsule.audioDuration || '02:45'}</span>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="w-full bg-neutral-50 border border-dashed border-neutral-300 rounded-2xl p-6 my-5 text-center">
                <ShieldAlert className="w-8 h-8 text-neutral-400 mx-auto mb-2 glass-icon-optic" />
                <h4 className="text-sm font-semibold text-neutral-800">محتوى الكبسولة مشفّر ومقفل</h4>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  هذه الكبسولة الزمنية محمية بالختم الرقمي حتى حلول عام {capsule.unlockYear}.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="w-full pt-2 flex flex-col gap-2">
              {!unlockedState ? (
                <>
                  <button
                    onClick={() => setShowOverridePrompt(true)}
                    className="touch-target water-glass-surface w-full py-3.5 px-6 rounded-2xl bg-neutral-900 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-md"
                  >
                    <Unlock className="w-4 h-4 glass-icon-optic" />
                    <span>طلب فتح استثنائي مبكر (معاينة)</span>
                  </button>

                  {showOverridePrompt && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-right mt-2"
                    >
                      <p className="text-xs text-amber-800 mb-2">
                        هل أنت متأكد من رغبتك في كسر الختم الزمني قبل عام {capsule.unlockYear}؟
                      </p>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setShowOverridePrompt(false)}
                          className="px-3 py-1 text-xs text-neutral-600 rounded-lg border border-neutral-300 cursor-pointer"
                        >
                          إلغاء
                        </button>
                        <button
                          onClick={handleForceUnlock}
                          className="px-3 py-1 text-xs bg-amber-600 text-white rounded-lg cursor-pointer font-medium"
                        >
                          نعم، افتح الكبسولة الآن
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="touch-target water-glass-surface w-full py-3.5 px-6 rounded-2xl bg-neutral-100 text-neutral-800 font-medium text-sm hover:bg-neutral-200 active:scale-98 transition-all cursor-pointer"
                >
                  إغلاق
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
