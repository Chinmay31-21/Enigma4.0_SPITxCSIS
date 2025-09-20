import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  TrendingUp, 
  Users, 
  Newspaper, 
  Calculator,
  Target,
  Building,
  ChevronRight,
  Star,
  Trophy,
  DollarSign,
  PiggyBank,
  CreditCard,
  BarChart3,
  Shield,
  Bell,
  MapPin,
  Award,
  BookOpen,
  Heart
} from 'lucide-react';

import Header from './components/Header';
import JourneyPathways from './components/JourneyPathways';
import BudgetSplitter from './components/BudgetSplitter';
import StudentGoals from './components/StudentGoals';
import CommunitySection from './components/CommunitySection';
import NewsEvents from './components/NewsEvents';
import GovernmentSchemes from './components/GovernmentSchemes';
import BankLearning from './components/BankLearning';
import SIPInsurance from './components/SIPInsurance';
import StockAnalyzer from './components/StockAnalyzer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [userProgress, setUserProgress] = useState({
    currentStage: 'Basic Savings',
    completedLessons: 12,
    totalLessons: 48,
    badges: 3,
    points: 750
  });

  const sections = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'journey', name: 'Journey', icon: TrendingUp },
    { id: 'budget', name: 'Budget Tool', icon: Calculator },
    { id: 'student', name: 'Student Goals', icon: Target },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'bank', name: 'Banking', icon: Building },
    { id: 'sip', name: 'SIP & Insurance', icon: Shield },
    { id: 'schemes', name: 'Schemes', icon: Award },
    { id: 'news', name: 'News', icon: Newspaper }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header userProgress={userProgress} />
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-3">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeSection === 'home' && <HomePage userProgress={userProgress} setActiveSection={setActiveSection} />}
        {activeSection === 'journey' && <JourneyPathways userProgress={userProgress} />}
        {activeSection === 'budget' && <BudgetSplitter sectionTitle="Stock Market Analysis" />}
        {activeSection === 'student' && <StudentGoals />}
        {activeSection === 'community' && <CommunitySection />}
        {activeSection === 'bank' && <BankLearning />}
        {activeSection === 'sip' && <SIPInsurance />}
        {activeSection === 'schemes' && <GovernmentSchemes />}
        {activeSection === 'news' && <NewsEvents />}
        <StockAnalyzer />
      </main>
    </div>
  );
}

// Home Page Component
function HomePage({ userProgress, setActiveSection }) {
  const quickActions = [
    {
      id: 'budget',
      title: 'Budget Splitter',
      description: 'Split expenses for household, events & festivals',
      icon: Calculator,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 'journey',
      title: 'Learning Journey',
      description: 'Continue your financial education path',
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'student',
      title: 'Goal Tracker',
      description: 'Track savings goals & daily expenses',
      icon: Target,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'schemes',
      title: 'Govt. Schemes',
      description: 'Discover beneficial government schemes',
      icon: Award,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      location: 'Rural Maharashtra',
      story: 'Saved ₹50,000 through disciplined SIP investments',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Ravi Kumar',
      location: 'Karnataka Farmer',
      story: 'Started agri-business using PMEGP scheme',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Meera Devi',
      location: 'Rajasthan',
      story: 'Built emergency fund through micro-savings',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-red-300" />
            <span className="text-blue-100">Building Financial Trust Together</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Your Journey to Financial Freedom
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl">
            Empowering rural communities, students, women, and families with practical financial literacy through culturally relevant learning experiences.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-300" />
              <span>{userProgress.badges} Badges Earned</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span>{userProgress.points} Points</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-200" />
              <span>{userProgress.completedLessons}/{userProgress.totalLessons} Lessons</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => setActiveSection(action.id)}
                className={`${action.bgColor} p-6 rounded-2xl text-left hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}
              >
                <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
                <ChevronRight className="h-5 w-5 text-gray-400 mt-2 group-hover:text-gray-600 transition-colors" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Progress Overview */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{Math.round((userProgress.completedLessons / userProgress.totalLessons) * 100)}%</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800">Overall Progress</h3>
            <p className="text-gray-600 text-sm">Learning Journey</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Current Stage</h3>
            <p className="text-gray-600 text-sm">{userProgress.currentStage}</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-12 w-12 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Achievements</h3>
            <p className="text-gray-600 text-sm">{userProgress.badges} Badges Unlocked</p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Community Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{story.name}</h3>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{story.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{story.story}</p>
              <div className="flex items-center space-x-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;