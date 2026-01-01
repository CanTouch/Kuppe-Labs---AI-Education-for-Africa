
import { LearningTrack, CourseModule } from './types';

export const TRACK_DETAILS = {
  [LearningTrack.EXPLORERS]: {
    ageRange: '10-16',
    focus: 'Fun, Games, Analogies',
    icon: '🚀'
  },
  [LearningTrack.FOUNDATIONS]: {
    ageRange: '17-25',
    focus: 'Academic, Python, ML',
    icon: '🎓'
  },
  [LearningTrack.WORKPLACE]: {
    ageRange: 'Professionals',
    focus: 'ROI, Efficiency, Tools',
    icon: '💼'
  },
  [LearningTrack.LEADERS]: {
    ageRange: 'Executives',
    focus: 'Strategy, Innovation, Scaling',
    icon: '🏢'
  }
};

export const MOCK_MODULES: Record<LearningTrack, CourseModule[]> = {
  [LearningTrack.EXPLORERS]: [
    { id: 'e1', title: 'What is a Robot?', description: 'Learn about smart machines.', isUnlocked: true, isCompleted: true, content: 'AI is like a robot brain...' },
    { id: 'e2', title: 'Teaching Computers', description: 'Patterns and games.', isUnlocked: true, isCompleted: false, content: 'We use data to teach computers.' },
    { id: 'e3', title: 'AI in Uganda', description: 'Local innovations.', isUnlocked: false, isCompleted: false, content: 'From SafeBoda to farm tools.' },
  ],
  [LearningTrack.FOUNDATIONS]: [
    { id: 'f1', title: 'Python Basics', description: 'Intro to programming.', isUnlocked: true, isCompleted: true, content: 'Python is the language of AI.' },
    { id: 'f2', title: 'Linear Regression', description: 'Predicting Jumia deliveries.', isUnlocked: true, isCompleted: false, content: 'Y = mX + B' },
    { id: 'f3', title: 'Neural Networks', description: 'Deep learning intro.', isUnlocked: false, isCompleted: false, content: 'Simulating the brain.' },
  ],
  [LearningTrack.WORKPLACE]: [
    { id: 'w1', title: 'AI Automation', description: 'Process optimization.', isUnlocked: true, isCompleted: true, content: 'Workflow automation basics.' },
    { id: 'w2', title: 'Data Strategy', description: 'Making sense of metrics.', isUnlocked: true, isCompleted: false, content: 'ROI through data.' },
    { id: 'w3', title: 'GPT for Business', description: 'Advanced prompting.', isUnlocked: false, isCompleted: false, content: 'Custom GPT instructions.' },
  ],
  [LearningTrack.LEADERS]: [
    { id: 'l1', title: 'The AI Landscape', description: 'Global vs Africa trends.', isUnlocked: true, isCompleted: true, content: 'Strategic overview.' },
    { id: 'l2', title: 'AI Ethics', description: 'Responsible leadership.', isUnlocked: true, isCompleted: false, content: 'Bias and privacy.' },
    { id: 'l3', title: 'Scaling Innovation', description: 'Building AI teams.', isUnlocked: false, isCompleted: false, content: 'Talent and culture.' },
  ]
};
