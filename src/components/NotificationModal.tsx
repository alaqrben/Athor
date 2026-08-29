import React from 'react';
import { X, Bell, Lock, Radio, Heart, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NotificationItem } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-neutral-800" />
              <h3 className="font-bold text-lg text-neutral-900">التنبيهات</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onMarkAllRead}
                className="text-xs text-neutral-500 hover:text-black flex items-center gap-1 cursor-pointer"
                title="تحديد الكل كمقروء"
              >
                <CheckCheck className="w-4 h-4" />
                <span>قراءة الكل</span>
              </button>
              <button
                onClick={onClose}
                className="touch-target w-9 h-9 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="py-3 divide-y divide-neutral-100 overflow-y-auto max-h-[60vh]">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 text-right flex items-start gap-3 rounded-xl transition-colors cursor-pointer hover:bg-neutral-50 water-glass-surface ${
                  !item.isRead ? 'bg-neutral-50/80 font-medium' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5 glass-icon-container">
                  {item.type === 'capsule' && <Lock className="w-4 h-4 text-purple-600 glass-icon-optic" />}
                  {item.type === 'trace' && <Radio className="w-4 h-4 text-blue-600 glass-icon-optic" />}
                  {item.type === 'like' && <Heart className="w-4 h-4 text-rose-500 fill-rose-500 glass-icon-optic" />}
                  {item.type === 'system' && <Bell className="w-4 h-4 text-neutral-600 glass-icon-optic" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-neutral-900">{item.title}</h4>
                    <span className="text-[10px] text-neutral-400">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{item.message}</p>
                </div>
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-neutral-100 text-neutral-800 text-sm font-medium hover:bg-neutral-200 active:scale-98 transition-all cursor-pointer water-glass-surface"
            >
              تم
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
