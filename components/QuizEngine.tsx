
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { generateQuiz } from '../services/gemini';
import { CheckCircle2, XCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface QuizEngineProps {
  moduleTitle: string;
  moduleContent: string;
  onComplete: (passed: boolean) => void;
  onCancel: () => void;
}

const QuizEngine: React.FC<QuizEngineProps> = ({ moduleTitle, moduleContent, onComplete, onCancel }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      const quizData = await generateQuiz(moduleTitle, moduleContent);
      setQuestions(quizData);
      setIsLoading(false);
    };
    loadQuiz();
  }, [moduleTitle, moduleContent]);

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === questions[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const passed = score >= (questions.length * 0.6);
      onComplete(passed);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
        <h3 className="text-xl font-bold text-slate-900">AI is generating your quiz...</h3>
        <p className="text-slate-500 max-w-xs mx-auto mt-2">I'm reading the module content to create a personalized challenge for you.</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100 max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Sparkles className="text-red-600" size={20} />
          <span className="font-bold text-sm uppercase tracking-widest text-slate-400">Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <div className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600">
          Score: {score}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">{currentQ.question}</h2>

      <div className="space-y-4">
        {currentQ.options.map((opt, i) => {
          const isCorrect = i === currentQ.correctAnswer;
          const isSelected = i === selectedOption;
          
          let btnClass = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ";
          if (!showExplanation) {
            btnClass += isSelected ? "border-red-600 bg-red-50 text-red-900" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50";
          } else {
            if (isCorrect) btnClass += "border-green-500 bg-green-50 text-green-900";
            else if (isSelected) btnClass += "border-red-500 bg-red-50 text-red-900";
            else btnClass += "border-slate-100 opacity-50";
          }

          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={showExplanation} className={btnClass}>
              <div className="flex items-center justify-between">
                <span className="font-medium">{opt}</span>
                {showExplanation && isCorrect && <CheckCircle2 size={20} className="text-green-600" />}
                {showExplanation && isSelected && !isCorrect && <XCircle size={20} className="text-red-600" />}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="mt-8 animate-in slide-in-from-top-2">
          <div className="p-4 bg-slate-50 rounded-2xl text-sm text-slate-600 mb-6 italic">
            <strong>Explanation:</strong> {currentQ.explanation}
          </div>
          <button 
            onClick={nextQuestion}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
          >
            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizEngine;
