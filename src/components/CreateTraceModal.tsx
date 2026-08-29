import React, { useState, useEffect } from 'react';
import { X, Mic, Lock, PenTool, Type, Check, MapPin, Sparkles, StopCircle, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trace, TimeCapsule } from '../types';

interface CreateTraceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrace: (trace: Trace) => void;
  onAddCapsule: (capsule: TimeCapsule) => void;
}

type Mode = 'select' | 'audio' | 'capsule' | 'draw' | 'text';

export const CreateTraceModal: React.FC<CreateTraceModalProps> = ({
  isOpen,
  onClose,
  onAddTrace,
  onAddCapsule,
}) => {
  const [mode, setMode] = useState<Mode>('select');
  
  // Audio state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [audioTitle, setAudioTitle] = useState('');
  const [audioQuote, setAudioQuote] = useState('');
  const [audioLocation, setAudioLocation] = useState('الرياض، العليا');

  // Capsule state
  const [capsuleTitle, setCapsuleTitle] = useState('');
  const [capsuleYear, setCapsuleYear] = useState(2028);
  const [capsuleRecipient, setCapsuleRecipient] = useState('');
  const [capsuleMessage, setCapsuleMessage] = useState('');

  // Drawing state
  const [drawTitle, setDrawTitle] = useState('');
  const [drawNote, setDrawNote] = useState('');

  // Text state
  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  // Recording interval
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isOpen) return null;

  const handleCreateAudio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioTitle.trim()) return;

    const newTrace: Trace = {
      id: `trace-${Date.now()}`,
      title: audioTitle,
      location: audioLocation || 'الرياض، العليا',
      city: 'الرياض',
      category: 'audio',
      timeAgo: 'الآن',
      audioDuration: '01:15',
      snippet: audioQuote || 'تسجيل صوتي حي تم تثبيته في هذا الموقع.',
      author: 'خالد',
      likes: 1,
      coordinates: { x: 50, y: 50 },
      colorTheme: 'blue',
      tags: ['صوتي', 'لحظات'],
      dateCreated: new Date().toISOString(),
    };

    onAddTrace(newTrace);
    confetti({ particleCount: 60, spread: 60 });
    resetAndClose();
  };

  const handleCreateCapsule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capsuleTitle.trim()) return;

    const yearsLeft = capsuleYear - new Date().getFullYear();
    const newCap: TimeCapsule = {
      id: `cap-${Date.now()}`,
      title: capsuleTitle,
      unlockYear: capsuleYear,
      unlockDate: `${capsuleYear}-01-01`,
      timeLeftStr: yearsLeft > 0 ? `تفتح بعد ${yearsLeft} سنوات` : 'جاهزة للفتح',
      isUnlocked: false,
      iconBg: capsuleYear % 2 === 0 ? 'bg-purple-100' : 'bg-orange-100',
      iconColor: capsuleYear % 2 === 0 ? 'text-purple-600' : 'text-orange-600',
      iconType: capsuleYear % 2 === 0 ? 'purple' : 'orange',
      recipient: capsuleRecipient || 'شخص عزيز',
      message: capsuleMessage || 'ذكرى محفوظة في كبسولة الزمن...',
      mediaType: 'text',
      locationName: 'الرياض',
      sender: 'خالد',
    };

    onAddCapsule(newCap);
    confetti({ particleCount: 70, spread: 70 });
    resetAndClose();
  };

  const resetAndClose = () => {
    setMode('select');
    setIsRecording(false);
    setAudioTitle('');
    setAudioQuote('');
    setCapsuleTitle('');
    setCapsuleRecipient('');
    setCapsuleMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h3 className="font-bold text-lg text-neutral-900">
              {mode === 'select' && 'إضافة أثر جديد'}
              {mode === 'audio' && 'تسجيل أثر صوتي مكانك'}
              {mode === 'capsule' && 'صناعة كبسولة زمنية'}
              {mode === 'draw' && 'رسم أثر خريطة'}
              {mode === 'text' && 'تدوين خاطرة أو فكرة'}
            </h3>
            <button
              onClick={resetAndClose}
              className="touch-target w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Selection Screen */}
          {mode === 'select' && (
            <div className="py-4 space-y-3">
              <p className="text-xs text-neutral-500 mb-2">
                اختر نوع الأثر الذي ترغب في تثبيته وتوثيقه في هذا الموقع:
              </p>

              {/* Option 1: Audio Trace */}
              <button
                onClick={() => setMode('audio')}
                className="w-full ios-card water-glass-surface flex items-center justify-between text-right p-4 cursor-pointer hover:bg-neutral-200/70 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100/90 text-blue-600 flex items-center justify-center glass-icon-container">
                    <Mic className="w-6 h-6 glass-icon-optic" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900">أثر صوتي فوري</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">سجل صوتك أو محيط المكان بصوت حيوي</p>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full shadow-xs">
                  شائع
                </span>
              </button>

              {/* Option 2: Time Capsule */}
              <button
                onClick={() => setMode('capsule')}
                className="w-full ios-card water-glass-surface flex items-center justify-between text-right p-4 cursor-pointer hover:bg-neutral-200/70 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100/90 text-purple-600 flex items-center justify-center glass-icon-container">
                    <Lock className="w-6 h-6 glass-icon-optic" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900">كبسولة زمنية مقفلة</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">احفظ رسالة تُفتح في عام محدد في المستقبل</p>
                  </div>
                </div>
                <span className="text-xs font-semibold bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full shadow-xs">
                  مستقبلي
                </span>
              </button>

              {/* Option 3: Text & Quote */}
              <button
                onClick={() => setMode('text')}
                className="w-full ios-card water-glass-surface flex items-center justify-between text-right p-4 cursor-pointer hover:bg-neutral-200/70 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/90 text-amber-600 flex items-center justify-center glass-icon-container">
                    <Type className="w-6 h-6 glass-icon-optic" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900">خاطرة أو ذكرى نصية</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">دوّن ما تشعر به في هذه النقطة الجغرافية</p>
                  </div>
                </div>
              </button>

              {/* Option 4: Draw / Sketch */}
              <button
                onClick={() => setMode('draw')}
                className="w-full ios-card water-glass-surface flex items-center justify-between text-right p-4 cursor-pointer hover:bg-neutral-200/70 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center glass-icon-container">
                    <PenTool className="w-6 h-6 glass-icon-optic" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900">أثر مرسوم أو مخطط</h4>
                    <p className="text-xs text-neutral-500 mt-0.5">ارسم تفصيلاً بصرياً أو مساراً للمكان</p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Mode: Audio Form */}
          {mode === 'audio' && (
            <form onSubmit={handleCreateAudio} className="py-4 space-y-4 text-right">
              {/* Mic Visualizer */}
              <div className="flex flex-col items-center justify-center p-6 bg-blue-50/70 rounded-2xl border border-blue-100">
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`touch-target w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  }`}
                  aria-label={isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
                >
                  {isRecording ? <StopCircle className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                <span className="text-xs font-semibold text-neutral-700 mt-3">
                  {isRecording ? `جاري التسجيل: 00:${recordSeconds < 10 ? `0${recordSeconds}` : recordSeconds}` : 'انقر للبدء بالتسجيل الصوتي'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  عنوان الأثر الصوتي
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ذكريات شارع التحلية مع الأصدقاء"
                  value={audioTitle}
                  onChange={(e) => setAudioTitle(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  اقتباس أو تفريغ سريع لما قيل
                </label>
                <textarea
                  rows={2}
                  placeholder="اكتب عبارة تصف هذا التسجيل..."
                  value={audioQuote}
                  onChange={(e) => setAudioQuote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-neutral-100 rounded-xl text-xs text-neutral-600">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span>الموقع المكتشف تلقائياً: <strong>الرياض، العليا</strong></span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMode('select')}
                  className="w-1/3 py-3 rounded-xl bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 cursor-pointer"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>تثبيت الأثر الصوتي</span>
                </button>
              </div>
            </form>
          )}

          {/* Mode: Time Capsule Form */}
          {mode === 'capsule' && (
            <form onSubmit={handleCreateCapsule} className="py-4 space-y-4 text-right">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  عنوان الكبسولة الزمنية
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: رسالة إلى نفسي في عام 2030"
                  value={capsuleTitle}
                  onChange={(e) => setCapsuleTitle(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    سنة الفتح المستهدفة
                  </label>
                  <select
                    value={capsuleYear}
                    onChange={(e) => setCapsuleYear(Number(e.target.value))}
                    className="w-full px-3.5 py-3 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                  >
                    {[2025, 2026, 2027, 2028, 2030, 2035, 2040].map((y) => (
                      <option key={y} value={y}>
                        عام {y} ({y - new Date().getFullYear()} سنوات)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    المرسل إليه
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: أولادي، صديقي، نفسي"
                    value={capsuleRecipient}
                    onChange={(e) => setCapsuleRecipient(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  الرسالة السرية المحفوظة
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="اكتب كلماتك التي لن تُكشف إلا عند فتح القفل الزمني..."
                  value={capsuleMessage}
                  onChange={(e) => setCapsuleMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMode('select')}
                  className="w-1/3 py-3 rounded-xl bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 cursor-pointer"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>قفل وحفظ الكبسولة</span>
                </button>
              </div>
            </form>
          )}

          {/* Mode: Draw / Text Forms */}
          {(mode === 'draw' || mode === 'text') && (
            <div className="py-4 space-y-4 text-right">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {mode === 'draw' ? 'عنوان المخطط المرسوم' : 'عنوان الخاطرة'}
                </label>
                <input
                  type="text"
                  placeholder="اكتب عنواناً..."
                  value={mode === 'draw' ? drawTitle : textTitle}
                  onChange={(e) => mode === 'draw' ? setDrawTitle(e.target.value) : setTextTitle(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {mode === 'draw' ? (
                <div className="h-36 bg-neutral-100 rounded-2xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-400 p-4 text-center">
                  <PenTool className="w-8 h-8 mb-1 text-emerald-600" />
                  <span className="text-xs text-neutral-600 font-medium">لوحة الرسم اللمسية نشطة</span>
                  <span className="text-[10px] text-neutral-400">يمكنك رسم مسار أو شكل الأثر الجغرافي</span>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    النص أو الذكرى
                  </label>
                  <textarea
                    rows={3}
                    placeholder="دوّن كلماتك هنا..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMode('select')}
                  className="w-1/3 py-3 rounded-xl bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 cursor-pointer"
                >
                  رجوع
                </button>
                <button
                  onClick={() => {
                    const newTrace: Trace = {
                      id: `trace-${Date.now()}`,
                      title: (mode === 'draw' ? drawTitle : textTitle) || 'أثر جديد في الرياض',
                      location: 'الرياض، حي السفارات',
                      city: 'الرياض',
                      category: mode === 'draw' ? 'draw' : 'text',
                      timeAgo: 'الآن',
                      snippet: (mode === 'draw' ? 'مخطط مرسوم يدوياً في الموقع.' : textContent) || 'خاطرة مسجلة في المكان.',
                      author: 'خالد',
                      likes: 0,
                      coordinates: { x: 45, y: 55 },
                      colorTheme: mode === 'draw' ? 'green' : 'orange',
                      dateCreated: new Date().toISOString(),
                    };
                    onAddTrace(newTrace);
                    confetti({ particleCount: 50 });
                    resetAndClose();
                  }}
                  className="w-2/3 py-3 rounded-xl bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>تثبيت الأثر</span>
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
