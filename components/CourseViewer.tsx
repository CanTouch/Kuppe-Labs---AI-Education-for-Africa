
import React, { useState } from 'react';
import { CourseModule, User } from '../types';
import { MOCK_MODULES } from '../constants';
import QuizEngine from './QuizEngine';
import { ChevronLeft, PlayCircle, CheckCircle, Lock, Clock, BookOpen, ArrowRight, Info } from 'lucide-react';

interface CourseViewerProps {
  user: User;
  onUpdateProgress: (newProgress: number) => void;
}

const CourseViewer: React.FC<CourseViewerProps> = ({ user, onUpdateProgress }) => {
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);
  const modules = MOCK_MODULES[user.track];

  const handleQuizComplete = (passed: boolean) => {
    if (passed && selectedModule) {
      const currentCompleted = user.completedModuleIds || [];
      if (!currentCompleted.includes(selectedModule.id)) {
        const newCompleted = [...currentCompleted, selectedModule.id];
        const progress = Math.round((newCompleted.length / modules.length) * 100);
        onUpdateProgress(progress);
      }
    }
    setIsTakingQuiz(false);
    setSelectedModule(null);
  };

  if (isTakingQuiz && selectedModule) {
    return (
      <QuizEngine 
        moduleTitle={selectedModule.title}
        moduleContent={selectedModule.content}
        onComplete={handleQuizComplete}
        onCancel={() => setIsTakingQuiz(false)}
      />
    );
  }

  if (selectedModule) {
    return (
      <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedModule(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors mb-6 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Curriculum
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-2 bg-slate-100 w-full">
            <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${user.progress}%` }}></div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider">
                Module {modules.findIndex(m => m.id === selectedModule.id) + 1}
              </span>
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Clock size={14} />
                15 min read
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">{selectedModule.title}</h2>
            
            <div className="prose prose-slate max-w-none mb-10 text-slate-600 leading-relaxed text-lg">
              <p className="mb-4">{selectedModule.content}</p>
              <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-red-500 my-8">
                <h4 className="font-bold text-slate-900 mb-2">Key Ugandan Context:</h4>
                <p className="text-sm italic">
                  Think about how this applies to local businesses in Kampala or farming communities in Gulu. 
                  AI isn't just global; it's local!
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
              <button 
                onClick={() => setSelectedModule(null)}
                className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
              >
                Read Later
              </button>
              <button 
                onClick={() => setIsTakingQuiz(true)}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 hover:-translate-y-0.5 transition-all"
              >
                Take Module Quiz <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Curriculum</h2>
          <p className="text-slate-500">Master AI for <span className="text-red-600 font-semibold">{user.track}</span></p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Current Progress</p>
            <p className="text-xl font-black text-slate-900">{user.progress}%</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-red-600 flex items-center justify-center">
            <BookOpen size={20} className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {modules.map((module, index) => {
          const completedIds = user.completedModuleIds || [];
          const isDone = completedIds.includes(module.id);
          const isLocked = index > 0 && !completedIds.includes(modules[index - 1].id);

          return (
            <button
              key={module.id}
              disabled={isLocked}
              onClick={() => setSelectedModule(module)}
              className={`flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-3xl border transition-all duration-300 text-left ${
                isLocked 
                  ? 'bg-slate-50 border-slate-100 opacity-60 grayscale cursor-not-allowed' 
                  : 'bg-white border-slate-100 hover:border-red-200 hover:shadow-md cursor-pointer group'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                isDone ? 'bg-green-100 text-green-600' : isLocked ? 'bg-slate-200 text-slate-400' : 'bg-red-100 text-red-600'
              }`}>
                {isDone ? <CheckCircle size={28} /> : isLocked ? <Lock size={28} /> : <PlayCircle size={28} className="group-hover:scale-110 transition-transform" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Module {index + 1}</span>
                  {isDone && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">PASSED</span>}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">{module.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-1">{module.description}</p>
              </div>

              {!isLocked && (
                <div className="ml-auto bg-slate-900 text-white p-2 rounded-xl group-hover:bg-red-600 transition-colors">
                  <ArrowRight size={20} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
        <Info className="text-blue-500 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-blue-900 mb-1">Earning Your Progress</h4>
          <p className="text-sm text-blue-700">At Kuppe Labs, we verify knowledge. You must pass an AI-generated quiz at the end of each module to unlock the next chapter and move closer to your certificate.</p>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
