import React, { useState } from 'react';
import { 
  PiggyBank, 
  ShoppingCart, 
  CreditCard, 
  TrendingUp, 
  CheckCircle, 
  Lock, 
  Star,
  PlayCircle,
  Trophy,
  Target,
  Book,
  Award
} from 'lucide-react';

interface UserProgress {
  currentStage: string;
  completedLessons: number;
  totalLessons: number;
  badges: number;
  points: number;
}

interface JourneyPathwaysProps {
  userProgress: UserProgress;
}

const JourneyPathways: React.FC<JourneyPathwaysProps> = ({ userProgress }) => {
  const [selectedStage, setSelectedStage] = useState('Basic Savings');

  const stages = [
    {
      id: 'basic-savings',
      name: 'Basic Savings',
      icon: PiggyBank,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      progress: 85,
      status: 'active',
      lessons: [
        { name: 'Understanding Money Value', duration: '10 min', completed: true },
        { name: 'Opening Your First Bank Account', duration: '15 min', completed: true },
        { name: 'Setting Savings Goals', duration: '12 min', completed: true },
        { name: 'Emergency Fund Basics', duration: '18 min', completed: false },
        { name: 'Tracking Your Expenses', duration: '20 min', completed: false }
      ],
      description: 'Learn the foundations of saving money and building financial security.',
      rewards: ['Basic Saver Badge', 'First Deposit Certificate', '50 Points']
    },
    {
      id: 'smart-spending',
      name: 'Smart Spending',
      icon: ShoppingCart,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      progress: 30,
      status: 'unlocked',
      lessons: [
        { name: 'Needs vs Wants', duration: '15 min', completed: true },
        { name: 'Budgeting for Festivals', duration: '20 min', completed: false },
        { name: 'Smart Shopping Tips', duration: '18 min', completed: false },
        { name: 'Avoiding Impulse Purchases', duration: '16 min', completed: false },
        { name: 'Price Comparison Strategies', duration: '14 min', completed: false }
      ],
      description: 'Master the art of spending wisely while maintaining your savings goals.',
      rewards: ['Smart Spender Badge', 'Budget Master Certificate', '75 Points']
    },
    {
      id: 'credit-readiness',
      name: 'Credit Readiness',
      icon: CreditCard,
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600',
      progress: 0,
      status: 'locked',
      lessons: [
        { name: 'What is Credit?', duration: '12 min', completed: false },
        { name: 'Building Credit History', duration: '18 min', completed: false },
        { name: 'Understanding Interest Rates', duration: '16 min', completed: false },
        { name: 'Loan Application Process', duration: '22 min', completed: false },
        { name: 'Managing Debt Responsibly', duration: '20 min', completed: false }
      ],
      description: 'Prepare yourself for responsible borrowing and credit management.',
      rewards: ['Credit Ready Badge', 'Loan Literacy Certificate', '100 Points']
    },
    {
      id: 'investment-awareness',
      name: 'Investment Awareness',
      icon: TrendingUp,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconColor: 'text-orange-600',
      progress: 0,
      status: 'locked',
      lessons: [
        { name: 'Introduction to Investments', duration: '25 min', completed: false },
        { name: 'Risk vs Return', duration: '20 min', completed: false },
        { name: 'Mutual Funds Basics', duration: '30 min', completed: false },
        { name: 'SIP Strategy', duration: '18 min', completed: false },
        { name: 'Long-term Wealth Building', duration: '25 min', completed: false }
      ],
      description: 'Discover how to grow your wealth through smart investment choices.',
      rewards: ['Investor Badge', 'Wealth Builder Certificate', '150 Points']
    }
  ];

  const currentStageData = stages.find(stage => 
    stage.name.toLowerCase() === selectedStage.toLowerCase()
  ) || stages[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Financial Journey</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Progress through carefully designed stages to build your financial knowledge and confidence. 
          Each stage unlocks new tools, lessons, and opportunities.
        </p>
      </div>

      {/* Journey Path */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Pathway</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            const isActive = stage.name === userProgress.currentStage;
            const isCompleted = stage.progress === 100;
            const isLocked = stage.status === 'locked';

            return (
              <div
                key={stage.id}
                onClick={() => !isLocked && setSelectedStage(stage.name)}
                className={`${stage.bgColor} ${stage.borderColor} border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'
                } ${selectedStage === stage.name ? 'ring-4 ring-blue-200' : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted ? 'bg-green-500' : isLocked ? 'bg-gray-400' : `bg-${stage.color}-500`
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : isLocked ? (
                      <Lock className="h-6 w-6 text-white" />
                    ) : (
                      <IconComponent className="h-6 w-6 text-white" />
                    )}
                  </div>
                  {isActive && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{stage.name}</h3>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-800">{stage.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-green-500' : `bg-${stage.color}-500`
                      }`}
                      style={{ width: `${stage.progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{stage.description}</p>
                {index < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Stage View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lessons */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${currentStageData.color}-500`}>
              <currentStageData.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{currentStageData.name}</h2>
              <p className="text-gray-600">{currentStageData.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {currentStageData.lessons.map((lesson, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                  lesson.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  lesson.completed ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle className="h-5 w-5 text-white" />
                  ) : (
                    <PlayCircle className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{lesson.name}</h3>
                  <p className="text-sm text-gray-600">{lesson.duration}</p>
                </div>
                {!lesson.completed && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rewards & Progress */}
        <div className="space-y-6">
          {/* Stage Rewards */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Stage Rewards</h3>
            <div className="space-y-3">
              {currentStageData.rewards.map((reward, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">{reward}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Overall Completion</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-gray-800">{userProgress.points}</span>
                  </div>
                  <p className="text-xs text-gray-600">Points Earned</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Trophy className="h-4 w-4 text-green-500" />
                    <span className="font-bold text-gray-800">{userProgress.badges}</span>
                  </div>
                  <p className="text-xs text-gray-600">Badges Won</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Daily Challenge</h3>
            <p className="text-sm text-purple-100 mb-4">
              Complete today's scenario: "Planning festival expenses with a ₹5,000 budget"
            </p>
            <a href="index8.html"><button  className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Take Challenge
            </button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyPathways;