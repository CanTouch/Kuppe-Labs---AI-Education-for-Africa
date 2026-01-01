
import React, { useState, useEffect } from 'react';
import { User, LearningTrack } from './types';
import Sidebar from './components/Sidebar';
import TrackSelector from './components/TrackSelector';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import CourseViewer from './components/CourseViewer';
import CertificationViewer from './components/CertificationViewer';
import SettingsView from './components/SettingsView';
import PerformanceDashboard from './components/PerformanceDashboard';
import { Bell, Search, Wifi, WifiOff, RefreshCcw, Save } from 'lucide-react';

const STORAGE_KEY = 'kuppe_labs_v2_state';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setActiveTab(parsed.activeTab || 'dashboard');
      } catch (e) {
        console.error("Failed to hydrate state", e);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, activeTab }));
      setLastSync(new Date());
    }
  }, [user, activeTab, isHydrated]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleTrackSelection = (track: LearningTrack) => {
    const newUser: User = {
      name: 'Okello Patrick',
      email: 'okello.patrick@example.ug',
      track: track,
      progress: 0,
      isPaid: true,
      attendanceRate: 85,
      quizzesCompleted: 0,
      projectsSubmitted: 0,
      completedModuleIds: [],
      projectSubmissions: [],
      skillScores: {},
      preferences: {
        lowBandwidth: false,
        preferredLanguage: 'English',
        notificationsEnabled: true
      }
    };
    setUser(newUser);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleUpdateProgressWithId = (progress: number) => {
    if (user) {
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          progress: progress,
          quizzesCompleted: prev.quizzesCompleted + 1,
          completedModuleIds: [...prev.completedModuleIds, `completed_${Date.now()}`]
        };
      });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out? Your progress is saved locally.")) {
      setUser(null);
      setActiveTab('dashboard');
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSwitchTrack = () => {
    if (window.confirm("Switch learning track? Your current progress will be preserved locally.")) {
      setUser(null);
      setActiveTab('dashboard');
    }
  };

  if (!isHydrated) return null;

  if (!user) {
    return <TrackSelector onSelect={handleTrackSelection} />;
  }

  return (
    <div className={`flex min-h-screen ${user.preferences?.lowBandwidth ? '' : 'bg-slate-50'}`}>
      <Sidebar 
        activeTrack={user.track} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        onSwitchTrack={handleSwitchTrack}
      />

      <main className="flex-1 ml-64 min-h-screen no-print">
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 no-print">
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-4">
              <Save size={12} />
              Saved: {lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            <div className="flex items-center gap-2">
              {isOffline ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                  <WifiOff size={14} /> Offline Mode
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                  <Wifi size={14} /> Online
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.track}</p>
              </div>
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}&backgroundColor=f8fafc`} 
                alt="Profile" 
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-red-50"
              />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard user={user} />}
          {activeTab === 'assistant' && <ChatInterface user={user} track={user.track} />}
          {activeTab === 'courses' && <CourseViewer user={user} onUpdateProgress={handleUpdateProgressWithId} />}
          {activeTab === 'certificates' && <CertificationViewer user={user} />}
          {activeTab === 'settings' && <SettingsView user={user} onUpdateUser={handleUpdateUser} />}
          {activeTab === 'progress' && <PerformanceDashboard user={user} />}
        </div>
      </main>

      <div className="fixed inset-0 z-[100] bg-white hidden print:block overflow-visible">
        <CertificationViewer user={user} />
      </div>
    </div>
  );
};

export default App;
