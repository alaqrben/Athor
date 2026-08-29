import React from 'react';
import { Home, Map as MapIcon, Plus, Box, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenAddModal: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAddModal,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F9F9F9]/90 backdrop-blur-xl border-t border-neutral-200/60 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-all">
      <div className="max-w-md mx-auto flex flex-row-reverse justify-around items-center px-3 h-16 sm:h-18">
        
        {/* Tab 1: الرئيسية */}
        <button
          id="nav-tab-home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center min-w-[60px] h-14 rounded-2xl touch-target water-glass-surface cursor-pointer transition-all duration-150 active:scale-90 ${
            activeTab === 'home'
              ? 'text-neutral-950 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
          aria-label="الرئيسية"
        >
          <div
            className={`w-11 h-7 rounded-full flex items-center justify-center mb-0.5 transition-all ${
              activeTab === 'home' ? 'bg-neutral-200/90 text-black glass-icon-container' : 'bg-transparent'
            }`}
          >
            <Home className="w-5 h-5 glass-icon-optic" />
          </div>
          <span className="text-[11px] leading-tight">الرئيسية</span>
        </button>

        {/* Tab 2: الخريطة */}
        <button
          id="nav-tab-map"
          onClick={() => onSelectTab('map')}
          className={`flex flex-col items-center justify-center min-w-[60px] h-14 rounded-2xl touch-target water-glass-surface cursor-pointer transition-all duration-150 active:scale-90 ${
            activeTab === 'map'
              ? 'text-neutral-950 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
          aria-label="الخريطة"
        >
          <div
            className={`w-11 h-7 rounded-full flex items-center justify-center mb-0.5 transition-all ${
              activeTab === 'map' ? 'bg-neutral-200/90 text-black glass-icon-container' : 'bg-transparent'
            }`}
          >
            <MapIcon className="w-5 h-5 glass-icon-optic" />
          </div>
          <span className="text-[11px] leading-tight">الخريطة</span>
        </button>

        {/* Center FAB: إضافة */}
        <button
          id="nav-tab-add"
          onClick={onOpenAddModal}
          className="flex flex-col items-center justify-center relative -top-3 touch-target cursor-pointer group active:scale-90 transition-transform duration-150"
          aria-label="إضافة أثر أو كبسولة"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-neutral-950 text-white shadow-lg shadow-neutral-950/25 flex items-center justify-center mb-0.5 group-hover:bg-neutral-800 transition-all water-glass-surface glass-icon-container">
            <Plus className="w-7 h-7 stroke-[2.5] glass-icon-optic" />
          </div>
          <span className="text-[11px] font-semibold leading-tight text-neutral-900">
            إضافة
          </span>
        </button>

        {/* Tab 3: كبسولاتي */}
        <button
          id="nav-tab-capsules"
          onClick={() => onSelectTab('capsules')}
          className={`flex flex-col items-center justify-center min-w-[60px] h-14 rounded-2xl touch-target water-glass-surface cursor-pointer transition-all duration-150 active:scale-90 ${
            activeTab === 'capsules'
              ? 'text-neutral-950 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
          aria-label="كبسولاتي"
        >
          <div
            className={`w-11 h-7 rounded-full flex items-center justify-center mb-0.5 transition-all ${
              activeTab === 'capsules' ? 'bg-neutral-200/90 text-black glass-icon-container' : 'bg-transparent'
            }`}
          >
            <Box className="w-5 h-5 glass-icon-optic" />
          </div>
          <span className="text-[11px] leading-tight">كبسولاتي</span>
        </button>

        {/* Tab 4: الملف */}
        <button
          id="nav-tab-profile"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center min-w-[60px] h-14 rounded-2xl touch-target water-glass-surface cursor-pointer transition-all duration-150 active:scale-90 ${
            activeTab === 'profile'
              ? 'text-neutral-950 font-semibold'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
          aria-label="الملف"
        >
          <div
            className={`w-11 h-7 rounded-full flex items-center justify-center mb-0.5 transition-all ${
              activeTab === 'profile' ? 'bg-neutral-200/90 text-black glass-icon-container' : 'bg-transparent'
            }`}
          >
            <User className="w-5 h-5 glass-icon-optic" />
          </div>
          <span className="text-[11px] leading-tight">الملف</span>
        </button>

      </div>
    </nav>
  );
};
