
import React from 'react';
import { User, UserPreferences } from '../types';
import { 
  User as UserIcon, 
  WifiOff, 
  Globe, 
  Bell, 
  Trash2, 
  CreditCard, 
  ShieldCheck,
  Languages
} from 'lucide-react';

interface SettingsViewProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const preferences: UserPreferences = user.preferences || {
    lowBandwidth: false,
    preferredLanguage: 'English',
    notificationsEnabled: true
  };

  const togglePreference = (key: keyof UserPreferences) => {
    const updatedUser = {
      ...user,
      preferences: {
        ...preferences,
        [key]: !preferences[key]
      }
    };
    onUpdateUser(updatedUser);
  };

  const handleLanguageChange = (lang: string) => {
    onUpdateUser({
      ...user,
      preferences: { ...preferences, preferredLanguage: lang }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500">Manage your profile and learning preferences.</p>
        </div>
        <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-2">
          <ShieldCheck size={14} /> Account Verified
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <UserIcon size={20} />
            </div>
            <h3 className="text-xl font-bold">Profile Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
              <input 
                type="text" 
                value={user.name}
                onChange={(e) => onUpdateUser({...user, name: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
              <input 
                type="email" 
                value={user.email}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Infrastructure & Bandwidth */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <WifiOff size={20} />
            </div>
            <h3 className="text-xl font-bold">Infrastructure</h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Low Bandwidth Mode</p>
                <p className="text-xs text-slate-500">Disables heavy animations and high-res images for faster loading.</p>
              </div>
              <button 
                onClick={() => togglePreference('lowBandwidth')}
                className={`w-12 h-6 rounded-full transition-colors relative ${preferences.lowBandwidth ? 'bg-red-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.lowBandwidth ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                Note: Offline learning content is automatically cached on your device to save data during your next visit.
              </p>
            </div>
          </div>
        </div>

        {/* Cultural & Language Context */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Languages size={20} />
            </div>
            <h3 className="text-xl font-bold">Learning Context</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-500 mb-2">Choose which language our AI assistant uses for local analogies and examples.</p>
            <div className="grid grid-cols-2 gap-2">
              {['English', 'Acholi', 'Luganda', 'Swahili'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    preferences.preferredLanguage === lang 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Account & Billing */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CreditCard size={20} />
            </div>
            <h3 className="text-xl font-bold">Account & Billing</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Subscription</p>
                <p className="font-bold">Full Access (Paid)</p>
              </div>
              <span className="text-emerald-600 font-bold text-sm">Active</span>
            </div>
            <button className="w-full py-2 text-sm text-slate-400 hover:text-red-600 transition-colors flex items-center justify-center gap-2">
              <Trash2 size={16} /> Reset All Learning Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
