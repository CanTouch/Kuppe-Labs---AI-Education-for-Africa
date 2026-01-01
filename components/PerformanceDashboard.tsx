
import React from 'react';
import { User } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Target, Award, Zap, TrendingUp } from 'lucide-react';

interface PerformanceDashboardProps {
  user: User;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ user }) => {
  // Mock skill data based on track
  const skillData = [
    { subject: 'Theory', A: user.progress > 20 ? 85 : 0, fullMark: 100 },
    { subject: 'Logic', A: user.quizzesCompleted * 20, fullMark: 100 },
    { subject: 'Tools', A: user.projectsSubmitted * 30, fullMark: 100 },
    { subject: 'Ethics', A: user.progress > 50 ? 90 : 0, fullMark: 100 },
    { subject: 'Context', A: 95, fullMark: 100 },
  ];

  const quizHistory = [
    { name: 'Mod 1', score: 80 },
    { name: 'Mod 2', score: 90 },
    { name: 'Mod 3', score: 75 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Skill Matrix */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-red-600" />
            <h3 className="text-xl font-bold">Skill Mastery Matrix</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quiz Performance */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-blue-600" />
            <h3 className="text-xl font-bold">Quiz Performance</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white">
          <Award className="text-yellow-400 mb-4" size={32} />
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Global Rank</p>
          <p className="text-2xl font-black">Top 15%</p>
          <p className="text-xs text-slate-500 mt-2">Among Kuppe Labs {user.track} peers.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <Zap className="text-orange-500 mb-4" size={32} />
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Consistency</p>
          <p className="text-2xl font-black text-slate-900">High</p>
          <p className="text-xs text-slate-400 mt-2">You haven't missed a daily session this week.</p>
        </div>

        <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-800 text-xs font-bold uppercase tracking-widest">Review Required</p>
              <p className="text-xl font-black text-red-900 mt-1">Python Loops</p>
              <p className="text-xs text-red-600 mt-2">Recommended revision based on last quiz.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
