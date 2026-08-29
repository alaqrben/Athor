import React, { useState } from 'react';
import { User, MapPin, Award, Shield, Bell, Moon, Volume2, Sparkles, ChevronLeft, Lock, Info, Check } from 'lucide-react';
import { USER_AVATAR } from '../data/mockData';

interface ProfileViewProps {
  tracesCount: number;
  capsulesCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  tracesCount,
  capsulesCount,
}) => {
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const triggerSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 space-y-6 pb-24 animate-fadeIn">
      
      {/* Profile Header Card */}
      <div className="ios-card water-glass-surface bg-white border border-neutral-200/80 p-6 rounded-3xl shadow-xs flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-neutral-100 shadow-md glass-icon-container">
            <img
              src={USER_AVATAR}
              alt="خالد"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute bottom-1 left-1 w-5 h-5 bg-emerald-500 rounded-full ring-2 ring-white" />
        </div>

        <h2 className="text-xl font-bold text-neutral-900 mt-3.5">خالد العبداللطيف</h2>
        <p className="text-xs text-neutral-500 mt-0.5">الرياض، المملكة العربية السعودية</p>
        <p className="text-xs text-neutral-600 max-w-xs mt-2 leading-relaxed">
          موثق لحظات وقصص جغرافية عبر تطبيق أثر، أؤمن بأن لكل مكان ذاكرة تستحق الخلود.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full mt-6 pt-5 border-t border-neutral-100">
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-neutral-900">{tracesCount + 12}</span>
            <span className="text-[11px] text-neutral-400 font-medium mt-0.5">آثار مسجلة</span>
          </div>
          <div className="flex flex-col items-center border-x border-neutral-100 px-2">
            <span className="text-xl font-black text-neutral-900">{capsulesCount}</span>
            <span className="text-[11px] text-neutral-400 font-medium mt-0.5">كبسولات</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-neutral-900">5</span>
            <span className="text-[11px] text-neutral-400 font-medium mt-0.5">مدن مزارة</span>
          </div>
        </div>
      </div>

      {/* Interactive Preferences & Settings (iOS Table Style) */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold text-neutral-900 px-2">إعدادات التجربة والتفاعل</h3>

        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs divide-y divide-neutral-100 overflow-hidden">
          
          {/* Toggle: Haptic / Tactile Feedback */}
          <div className="p-4 flex items-center justify-between water-glass-surface">
            <div className="flex items-center gap-3 text-right">
              <div className="w-9 h-9 rounded-full bg-blue-100/90 text-blue-600 flex items-center justify-center glass-icon-container">
                <Sparkles className="w-4 h-4 glass-icon-optic" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">استجابة اللمس السريعة (SOP Tactile)</p>
                <p className="text-xs text-neutral-400">تأثير حركي فوري عند النقر وتغيير الحجم بنسبة 98%</p>
              </div>
            </div>

            <button
              onClick={() => {
                setHapticEnabled(!hapticEnabled);
                triggerSave();
              }}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                hapticEnabled ? 'bg-neutral-950' : 'bg-neutral-200'
              }`}
              aria-label="تفعيل استجابة اللمس"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-all ${
                  hapticEnabled ? 'left-1' : 'left-6'
                }`}
              />
            </button>
          </div>

          {/* Toggle: Sound Effects */}
          <div className="p-4 flex items-center justify-between water-glass-surface">
            <div className="flex items-center gap-3 text-right">
              <div className="w-9 h-9 rounded-full bg-indigo-100/90 text-indigo-600 flex items-center justify-center glass-icon-container">
                <Volume2 className="w-4 h-4 glass-icon-optic" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">المؤثرات الصوتية المحيطية</p>
                <p className="text-xs text-neutral-400">محاكاة الأصوات عند قفل أو فتح كبسولة</p>
              </div>
            </div>

            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                triggerSave();
              }}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                soundEnabled ? 'bg-neutral-950' : 'bg-neutral-200'
              }`}
              aria-label="تفعيل المؤثرات الصوتية"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-all ${
                  soundEnabled ? 'left-1' : 'left-6'
                }`}
              />
            </button>
          </div>

          {/* Toggle: Proximity Alerts */}
          <div className="p-4 flex items-center justify-between water-glass-surface">
            <div className="flex items-center gap-3 text-right">
              <div className="w-9 h-9 rounded-full bg-rose-100/90 text-rose-600 flex items-center justify-center glass-icon-container">
                <Bell className="w-4 h-4 glass-icon-optic" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">تنبيهات الآثار القريبة</p>
                <p className="text-xs text-neutral-400">إشعار فوري عند الاقتراب من كبسولة أو أثر صوتي</p>
              </div>
            </div>

            <button
              onClick={() => {
                setNotifEnabled(!notifEnabled);
                triggerSave();
              }}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                notifEnabled ? 'bg-neutral-950' : 'bg-neutral-200'
              }`}
              aria-label="تفعيل تنبيهات القرب"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md absolute top-1 transition-all ${
                  notifEnabled ? 'left-1' : 'left-6'
                }`}
              />
            </button>
          </div>

        </div>
      </div>

      {/* About & System Info */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-bold text-neutral-900 px-2">الأمان والمعلومات</h3>

        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs divide-y divide-neutral-100 overflow-hidden">
          <div className="p-4 flex items-center justify-between water-glass-surface">
            <div className="flex items-center gap-3 text-right">
              <div className="w-9 h-9 rounded-full bg-emerald-100/90 text-emerald-600 flex items-center justify-center glass-icon-container">
                <Shield className="w-4 h-4 glass-icon-optic" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">تشفير الكبسولات الزمنية</p>
                <p className="text-xs text-neutral-400">مشفر بنظام نهاية إلى نهاية (End-to-End)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full shadow-xs">
              مفعّل
            </span>
          </div>

          <div className="p-4 flex items-center justify-between water-glass-surface">
            <div className="flex items-center gap-3 text-right">
              <div className="w-9 h-9 rounded-full bg-neutral-100/90 text-neutral-600 flex items-center justify-center glass-icon-container">
                <Info className="w-4 h-4 glass-icon-optic" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">إصدار أثر ATHOR</p>
                <p className="text-xs text-neutral-400">الإصدار 2.4.0 (تصميم iOS عالي الدقة)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {savedFeedback && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>تم حفظ التفضيلات بنجاح</span>
        </div>
      )}

    </div>
  );
};
