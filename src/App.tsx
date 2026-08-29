import React, { useState } from 'react';
import { TabType, Trace, TimeCapsule, NotificationItem } from './types';
import { INITIAL_TRACES, INITIAL_CAPSULES, NOTIFICATIONS } from './data/mockData';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { HomeView } from './views/HomeView';
import { MapView } from './views/MapView';
import { CapsulesView } from './views/CapsulesView';
import { ProfileView } from './views/ProfileView';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import { CapsuleModal } from './components/CapsuleModal';
import { CreateTraceModal } from './components/CreateTraceModal';
import { NotificationModal } from './components/NotificationModal';
import { GlassInteractionProvider } from './components/GlassInteraction';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [traces, setTraces] = useState<Trace[]>(INITIAL_TRACES);
  const [capsules, setCapsules] = useState<TimeCapsule[]>(INITIAL_CAPSULES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  // Modals state
  const [activeAudioTrace, setActiveAudioTrace] = useState<Trace | null>(null);
  const [activeCapsule, setActiveCapsule] = useState<TimeCapsule | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Handlers
  const handleLikeTrace = (traceId: string) => {
    setTraces((prev) =>
      prev.map((t) => (t.id === traceId ? { ...t, likes: t.likes + 1 } : t))
    );
  };

  const handleUnlockCapsule = (capsuleId: string) => {
    setCapsules((prev) =>
      prev.map((c) =>
        c.id === capsuleId
          ? {
              ...c,
              isUnlocked: true,
              timeLeftStr: 'مفتوحة الآن!',
              iconBg: 'bg-emerald-100',
              iconColor: 'text-emerald-600',
            }
          : c
      )
    );
  };

  const handleAddTrace = (newTrace: Trace) => {
    setTraces((prev) => [newTrace, ...prev]);
    // Also push a notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'تم تثبيت أثر جديد',
        message: `تم توثيق "${newTrace.title}" في موقعك بنجاح.`,
        timeAgo: 'الآن',
        type: 'trace',
        isRead: false,
      },
      ...prev,
    ]);
  };

  const handleAddCapsule = (newCapsule: TimeCapsule) => {
    setCapsules((prev) => [newCapsule, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'كبسولة زمنية جديدة',
        message: `تم حفظ وختم كبسولة "${newCapsule.title}" حتى عام ${newCapsule.unlockYear}.`,
        timeAgo: 'الآن',
        type: 'capsule',
        isRead: false,
      },
      ...prev,
    ]);
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <GlassInteractionProvider>
      <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between selection:bg-neutral-200">
        
        {/* Top Header */}
        <TopHeader
          onOpenNotifications={() => setIsNotifModalOpen(true)}
          onOpenProfile={() => setActiveTab('profile')}
          unreadCount={unreadNotifsCount}
        />

        {/* Main Content View Switcher */}
        <div className="flex-1 w-full">
          {activeTab === 'home' && (
            <HomeView
              traces={traces}
              capsules={capsules}
              onSelectTrace={(t) => setActiveAudioTrace(t)}
              onSelectCapsule={(c) => setActiveCapsule(c)}
              onExploreMap={() => setActiveTab('map')}
              onOpenAdd={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'map' && (
            <MapView
              traces={traces}
              onSelectTrace={(t) => setActiveAudioTrace(t)}
              onOpenAdd={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'capsules' && (
            <CapsulesView
              capsules={capsules}
              onSelectCapsule={(c) => setActiveCapsule(c)}
              onOpenAdd={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              tracesCount={traces.length}
              capsulesCount={capsules.length}
            />
          )}
        </div>

        {/* Bottom 5-Tab Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Modals */}
        <AudioPlayerModal
          trace={activeAudioTrace}
          onClose={() => setActiveAudioTrace(null)}
          onLikeTrace={handleLikeTrace}
        />

        <CapsuleModal
          capsule={activeCapsule}
          onClose={() => setActiveCapsule(null)}
          onUnlockCapsule={handleUnlockCapsule}
        />

        <CreateTraceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddTrace={handleAddTrace}
          onAddCapsule={handleAddCapsule}
        />

        <NotificationModal
          isOpen={isNotifModalOpen}
          onClose={() => setIsNotifModalOpen(false)}
          notifications={notifications}
          onMarkAllRead={handleMarkAllNotifsRead}
        />

      </div>
    </GlassInteractionProvider>
  );
}
