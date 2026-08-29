import React from 'react';
import { Bell } from 'lucide-react';
import { USER_AVATAR } from '../data/mockData';

interface TopHeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100/80 transition-colors">
      <div className="max-w-3xl mx-auto flex flex-row-reverse justify-between items-center px-4 py-3 sm:py-4">
        {/* Brand & Greeting */}
        <div className="flex flex-col items-end">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-tight">
            أثر
          </h1>
          <span className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
            مرحباً يا خالد
          </span>
        </div>

        {/* Action icons: notifications & avatar (min 48px touch targets) */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button
            id="btn-notifications"
            onClick={onOpenNotifications}
            aria-label="التنبيهات"
            className="touch-target water-glass-surface w-12 h-12 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100/90 active:scale-95 transition-all duration-150 relative cursor-pointer"
          >
            <Bell className="w-6 h-6 stroke-[1.75] glass-icon-optic" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Profile Avatar Button */}
          <button
            id="btn-profile-avatar"
            onClick={onOpenProfile}
            aria-label="الملف الشخصي"
            className="touch-target water-glass-surface w-11 h-11 rounded-full bg-neutral-100 overflow-hidden ring-1 ring-neutral-200/70 hover:ring-neutral-400 active:scale-95 transition-all duration-150 cursor-pointer shadow-xs"
          >
            <img
              src={USER_AVATAR}
              alt="صورة الملف الشخصي لخالد"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
