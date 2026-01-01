
import React from 'react';
import { User, LearningTrack } from '../types';
import { TRACK_DETAILS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Flame, Clock, Trophy, Target, ChevronRight } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const data = [
    { name: 'Mon', score: 40 },
    { name: 'Tue', score: 30 },
    { name: 'Wed', score: 65 },
    { name: 'Thu', score: 85 },
    { name: 'Fri', score: 55 },
    { name: 'Sat', score: 90 },
    { name: 'Sun', score: 100 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Hello, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-red-100 mb-6 max-w-md">
            You're doing great! You have completed {user.progress}% of the {user.track} course. Keep it up!
          </p>
          <button className="bg-white text-red-600 px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-slate-100 transition-colors">
            Continue Learning
          </button>
        </div>
        {/* Background blobs */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute right-20 -bottom-20 w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Learning Streak</p>
            <p className="text-2xl font-bold">12 Days</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Target size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Course Progress</p>
            <p className="text-2xl font-bold">{user.progress}%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Quizzes Passed</p>
            <p className="text-2xl font-bold">{user.quizzesCompleted}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Study Hours</p>
            <p className="text-2xl font-bold">24.5h</p>
          </div>
        </div>
      </div>

      {/* Charts & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6">Learning Activity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="score" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-6">Next Milestones</h3>
          <div className="space-y-4">
            {[
              { title: 'Finish Module 3', sub: 'Neural Networks basics', color: 'bg-red-500' },
              { title: 'Submit Project', sub: 'Crop disease detection', color: 'bg-blue-500' },
              { title: 'Weekly Quiz', sub: 'Due in 2 days', color: 'bg-orange-500' }
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className={`w-3 h-12 rounded-full ${task.color}`}></div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{task.title}</p>
                  <p className="text-sm text-slate-500">{task.sub}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border-2 border-slate-100 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-colors">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
