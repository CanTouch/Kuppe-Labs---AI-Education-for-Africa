
import React from 'react';
import { Home, BookOpen, BarChart2, MessageSquare, Award, Settings, LogOut, Info, RefreshCw } from 'lucide-react';
import { LearningTrack } from '../types';

interface SidebarProps {
  activeTrack: LearningTrack | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onSwitchTrack: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTrack, activeTab, setActiveTab, onLogout, onSwitchTrack }) => {
  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'courses', icon: <BookOpen size={20} />, label: 'Courses' },
    { id: 'assistant', icon: <MessageSquare size={20} />, label: 'AI Assistant' },
    { id: 'progress', icon: <BarChart2 size={20} />, label: 'Performance' },
    { id: 'certificates', icon: <Award size={20} />, label: 'Certifications' },
  ];

  return (
    <div className="w-64 h-full bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 z-20 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white">K</div>
        <h1 className="text-xl font-bold text-white">Kuppe Labs</h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <div className="mb-4 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Learning Experience
        </div>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id 
                  ? 'bg-red-600 text-white' 
                  : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <button 
          onClick={() => setActiveTab('settings')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:text-white transition-colors"
        >
          <Settings size={18} />
          Settings
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="p-4 bg-slate-800 m-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-white">
            <Info size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase">Track</span>
          </div>
          <button 
            onClick={onSwitchTrack}
            className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors"
            title="Switch learning track"
          >
            <RefreshCw size={14} />
          </button>
        </div>
        <p className="text-sm font-medium text-slate-100 mb-2">{activeTrack || 'Not Selected'}</p>
        <button 
          onClick={onSwitchTrack}
          className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors"
        >
          Change Track
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
