import React from 'react';
import { Bell, User, Menu, Star, Trophy } from 'lucide-react';

interface HeaderProps {
  userProgress: {
    currentStage: string;
    completedLessons: number;
    totalLessons: number;
    badges: number;
    points: number;
  };
}

const Header: React.FC<HeaderProps> = ({ userProgress }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">FinanceShiksha</h1>
                <p className="text-sm text-gray-500">Financial Literacy for All</p>
              </div>
            </div>
          </div>

          {/* Progress Indicators - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-medium text-blue-800">{userProgress.currentStage}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">{userProgress.points}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700">{userProgress.badges}</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
              <User className="h-5 w-5 text-gray-600" />
              <span className="hidden sm:inline text-sm font-medium text-gray-700">Profile</span>
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-800">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="md:hidden mt-4">
          <div className="bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userProgress.completedLessons / userProgress.totalLessons) * 100}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{userProgress.currentStage}</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-gray-700">{userProgress.points}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="h-3 w-3 text-green-500" />
                <span className="text-gray-700">{userProgress.badges}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;