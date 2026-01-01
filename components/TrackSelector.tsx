
import React from 'react';
import { LearningTrack } from '../types';
import { TRACK_DETAILS } from '../constants';
import { Rocket, GraduationCap, Briefcase, Building2, ChevronRight } from 'lucide-react';

interface TrackSelectorProps {
  onSelect: (track: LearningTrack) => void;
}

const TrackSelector: React.FC<TrackSelectorProps> = ({ onSelect }) => {
  const getIcon = (track: LearningTrack) => {
    switch (track) {
      case LearningTrack.EXPLORERS: return <Rocket className="text-orange-500" size={32} />;
      case LearningTrack.FOUNDATIONS: return <GraduationCap className="text-blue-500" size={32} />;
      case LearningTrack.WORKPLACE: return <Briefcase className="text-emerald-500" size={32} />;
      case LearningTrack.LEADERS: return <Building2 className="text-purple-500" size={32} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-6">
            <span className="text-3xl font-bold text-white">K</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Welcome to Kuppe Labs</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Democratizing AI education across Africa. Choose the path that fits your goals and let's start building the future together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(LearningTrack).map((track) => (
            <button
              key={track}
              onClick={() => onSelect(track)}
              className="group relative flex flex-col items-start p-8 bg-white rounded-3xl shadow-sm border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
            >
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl group-hover:bg-red-50 transition-colors">
                {getIcon(track)}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{track}</h3>
              <p className="text-slate-500 mb-4">{TRACK_DETAILS[track].focus}</p>
              <div className="flex items-center text-red-600 font-semibold mt-auto">
                Start Learning <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl group-hover:opacity-20 transition-opacity">
                {TRACK_DETAILS[track].icon}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>By continuing, you agree to Kuppe Labs' Terms of Service and Privacy Policy.</p>
          <p className="mt-2">Made with ❤️ in Kampala, Uganda</p>
        </div>
      </div>
    </div>
  );
};

export default TrackSelector;
