
export enum LearningTrack {
  EXPLORERS = 'AI Explorers',
  FOUNDATIONS = 'AI Foundations',
  WORKPLACE = 'AI in the Workplace',
  LEADERS = 'AI for Business Growth'
}

export interface UserPreferences {
  lowBandwidth: boolean;
  preferredLanguage: string;
  notificationsEnabled: boolean;
}

export interface ProjectSubmission {
  moduleId: string;
  title: string;
  content: string;
  status: 'pending' | 'reviewed' | 'approved';
  feedback?: string;
  submittedAt: Date;
}

export interface User {
  name: string;
  email: string;
  age?: number;
  track: LearningTrack;
  progress: number;
  isPaid: boolean;
  attendanceRate: number;
  quizzesCompleted: number;
  projectsSubmitted: number;
  completedModuleIds: string[];
  projectSubmissions: ProjectSubmission[];
  preferences?: UserPreferences;
  skillScores: Record<string, number>; // e.g., { 'Python': 80, 'Ethics': 90 }
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  content: string;
  hasProject?: boolean;
}

export interface AppState {
  user: User | null;
  messages: Message[];
}
