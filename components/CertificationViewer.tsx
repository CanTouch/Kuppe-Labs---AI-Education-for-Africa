
import React from 'react';
import { User } from '../types';
import { Award, Download, Share2, MapPin } from 'lucide-react';

interface CertificationViewerProps {
  user: User;
}

const CertificationViewer: React.FC<CertificationViewerProps> = ({ user }) => {
  const isCertified = user.progress >= 100;
  const certificateId = `KL-${user.track.split(' ')[0].toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  if (!isCertified) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
          <Award size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Certification Locked</h2>
        <p className="text-slate-500 max-w-sm text-center mb-8">
          Complete all modules and pass your assessments to unlock your official Kuppe Labs {user.track} certificate.
        </p>
        <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${user.progress}%` }}></div>
        </div>
        <p className="text-xs font-bold text-red-600 mt-2 uppercase tracking-widest">{user.progress}% Completed</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Your Certification</h2>
          <p className="text-slate-500">Congratulations! You are officially Kuppe Labs certified.</p>
        </div>
        <div className="flex gap-4 no-print">
          <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all">
            <Download size={20} /> Download PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all">
            <Share2 size={20} /> Share
          </button>
        </div>
      </div>

      {/* Certificate Preview Card */}
      <div id="certificate" className="certificate-container bg-white p-8 md:p-16 rounded-[40px] shadow-2xl border-[16px] border-slate-900 relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 rounded-bl-[100px] flex items-center justify-center text-white font-black text-4xl">K</div>
        
        <div className="relative z-10 text-center space-y-8">
          <div className="space-y-2">
            <p className="text-red-600 font-bold uppercase tracking-[0.3em]">Kuppe Labs Uganda</p>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase">Certificate of Achievement</h1>
          </div>

          <p className="text-xl text-slate-500 italic">This is to certify that</p>
          
          <h2 className="text-5xl font-extrabold text-slate-900 underline underline-offset-8 decoration-red-600 decoration-4">{user.name}</h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Has successfully demonstrated proficiency and mastery in the field of
            <br />
            <strong className="text-slate-900 text-2xl uppercase tracking-wider">{user.track}</strong>
            <br />
            by completing the specialized Kuppe Labs AI curriculum for the African Tech Ecosystem.
          </p>

          <div className="grid grid-cols-2 gap-12 pt-12">
            <div className="text-left space-y-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin size={16} /> Kampala, Uganda
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Date Issued: {new Date().toLocaleDateString()}</p>
              <p className="text-xs text-slate-300 font-mono tracking-tighter">VERIFICATION ID: {certificateId}</p>
            </div>
            <div className="text-right flex flex-col items-end justify-end">
              <div className="w-32 h-32 opacity-20 bg-slate-900 rounded-full flex items-center justify-center font-black text-white">SEAL</div>
              <p className="mt-4 border-t-2 border-slate-900 pt-2 text-sm font-bold w-48 text-center">Kuppe Labs Academic Board</p>
            </div>
          </div>
        </div>

        {/* Branding stripes - Uganda Flag Colors */}
        <div className="absolute bottom-0 left-0 w-full h-2 flex">
          <div className="h-full flex-1 bg-black"></div>
          <div className="h-full flex-1 bg-yellow-400"></div>
          <div className="h-full flex-1 bg-red-600"></div>
          <div className="h-full flex-1 bg-black"></div>
          <div className="h-full flex-1 bg-yellow-400"></div>
          <div className="h-full flex-1 bg-red-600"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          .no-print { display: none !important; }
          .certificate-container, .certificate-container * { visibility: visible; }
          .certificate-container { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            height: 100%;
            margin: 0;
            padding: 2rem;
            border: none;
            box-shadow: none;
          }
        }
      `}} />
    </div>
  );
};

export default CertificationViewer;
