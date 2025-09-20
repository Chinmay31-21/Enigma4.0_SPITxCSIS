import React, { useState, useEffect } from 'react';
import { 
  Target, 
  PlusCircle, 
  Smartphone, 
  Laptop, 
  BookOpen, 
  Car,
  Gamepad2,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Edit,
  Trash2
} from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentSavings: number;
  targetDate: string;
  icon: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

interface DailyEntry {
  date: string;
  expenses: number;
  savings: number;
  description: string;
}

const StudentGoals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Gaming Laptop',
      targetAmount: 65000,
      currentSavings: 28500,
      targetDate: '2025-06-15',
      icon: 'laptop',
      color: 'blue',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Smartphone',
      targetAmount: 25000,
      currentSavings: 18200,
      targetDate: '2025-03-20',
      icon: 'smartphone',
      color: 'green',
      priority: 'medium'
    }
  ]);

  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([
    { date: '2025-01-06', expenses: 150, savings: 200, description: 'Lunch, books' },
    { date: '2025-01-05', expenses: 80, savings: 250, description: 'Bus fare, snacks' },
    { date: '2025-01-04', expenses: 200, savings: 150, description: 'Movie, dinner' }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string>(goals[0]?.id || '');

  // New goal form
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    targetDate: '',
    icon: 'target',
    color: 'blue',
    priority: 'medium' as const
  });

  // Daily entry form
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    expenses: 0,
    savings: 0,
    description: ''
  });

  const goalIcons = {
    laptop: Laptop,
    smartphone: Smartphone,
    book: BookOpen,
    car: Car,
    gamepad: Gamepad2,
    target: Target
  };

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount > 0) {
      const goal: Goal = {
        id: Date.now().toString(),
        name: newGoal.name,
        targetAmount: newGoal.targetAmount,
        currentSavings: 0,
        targetDate: newGoal.targetDate,
        icon: newGoal.icon,
        color: newGoal.color,
        priority: newGoal.priority
      };
      setGoals([...goals, goal]);
      setNewGoal({
        name: '',
        targetAmount: 0,
        targetDate: '',
        icon: 'target',
        color: 'blue',
        priority: 'medium'
      });
      setShowAddGoal(false);
    }
  };

  const addDailyEntry = () => {
    if (newEntry.date && (newEntry.expenses > 0 || newEntry.savings > 0)) {
      const entry: DailyEntry = { ...newEntry };
      setDailyEntries([entry, ...dailyEntries]);
      
      // Update selected goal savings
      if (selectedGoal && newEntry.savings > 0) {
        setGoals(goals.map(goal => 
          goal.id === selectedGoal 
            ? { ...goal, currentSavings: goal.currentSavings + newEntry.savings }
            : goal
        ));
      }

      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        expenses: 0,
        savings: 0,
        description: ''
      });
      setShowAddEntry(false);
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    if (selectedGoal === id) {
      setSelectedGoal(goals.filter(goal => goal.id !== id)[0]?.id || '');
    }
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min((goal.currentSavings / goal.targetAmount) * 100, 100);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRequiredDailySavings = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentSavings;
    const days = getDaysRemaining(goal.targetDate);
    return days > 0 ? Math.ceil(remaining / days) : 0;
  };

  const totalExpensesThisWeek = dailyEntries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    })
    .reduce((sum, entry) => sum + entry.expenses, 0);

  const totalSavingsThisWeek = dailyEntries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    })
    .reduce((sum, entry) => sum + entry.savings, 0);

  const currentGoal = goals.find(g => g.id === selectedGoal);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Student Goal Tracker</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your daily expenses and savings to achieve your goals. Build healthy financial habits 
          while working toward your dreams like buying a laptop, smartphone, or funding your education.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800">{goals.length}</h3>
          <p className="text-sm text-gray-600">Active Goals</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-800">₹{totalSavingsThisWeek}</h3>
          <p className="text-sm text-gray-600">Saved This Week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="font-bold text-gray-800">₹{totalExpensesThisWeek}</h3>
          <p className="text-sm text-gray-600">Spent This Week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-800">
            ₹{totalSavingsThisWeek - totalExpensesThisWeek >= 0 ? totalSavingsThisWeek - totalExpensesThisWeek : 0}
          </h3>
          <p className="text-sm text-gray-600">Net Savings</p>
        </div>
      </div>

      {/* Goals Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Goals List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Your Goals</h2>
              <button
                onClick={() => setShowAddGoal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Goal</span>
              </button>
            </div>

            <div className="space-y-4">
              {goals.map((goal) => {
                const IconComponent = goalIcons[goal.icon as keyof typeof goalIcons];
                const progress = getProgressPercentage(goal);
                const daysLeft = getDaysRemaining(goal.targetDate);
                const requiredDaily = getRequiredDailySavings(goal);

                return (
                  <div
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedGoal === goal.id
                        ? `border-${goal.color}-500 bg-${goal.color}-50 shadow-md`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-${goal.color}-500 rounded-xl flex items-center justify-center`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{goal.name}</h3>
                          <p className="text-sm text-gray-600">₹{goal.currentSavings.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                          goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {goal.priority}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteGoal(goal.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-bold text-gray-800">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 bg-${goal.color}-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">₹{requiredDaily}/day needed</p>
                        <p className="text-xs text-gray-500">to reach goal</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Expense Tracker */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Daily Tracker</h2>
              <button
                onClick={() => setShowAddEntry(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Entry</span>
              </button>
            </div>

            <div className="space-y-3">
              {dailyEntries.slice(0, 7).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-800">{new Date(entry.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{entry.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-red-600">-₹{entry.expenses}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-green-600">+₹{entry.savings}</span>
                      </div>
                      <div className="text-sm font-medium">
                        <span className={entry.savings - entry.expenses >= 0 ? 'text-green-700' : 'text-red-700'}>
                          Net: ₹{entry.savings - entry.expenses}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights & Goal Details */}
        <div className="space-y-6">
          {currentGoal && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Goal Details</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`w-20 h-20 bg-${currentGoal.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <div className={`w-14 h-14 bg-${currentGoal.color}-500 rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold">
                        {Math.round(getProgressPercentage(currentGoal))}%
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800">{currentGoal.name}</h4>
                  <p className="text-sm text-gray-600">
                    ₹{(currentGoal.targetAmount - currentGoal.currentSavings).toLocaleString()} remaining
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target Date</span>
                    <span className="text-sm font-medium">{new Date(currentGoal.targetDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Daily Target</span>
                    <span className="text-sm font-medium">₹{getRequiredDailySavings(currentGoal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Days Remaining</span>
                    <span className="text-sm font-medium">{getDaysRemaining(currentGoal.targetDate)} days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Guidance */}
          <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">🤖 AI Guidance</h3>
            <div className="space-y-3">
              {totalExpensesThisWeek > totalSavingsThisWeek && (
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-300" />
                  <p className="text-sm text-purple-100">
                    You're spending more than saving this week. Try cutting non-essential expenses like dining out or entertainment by 30%.
                  </p>
                </div>
              )}
              
              {currentGoal && getDaysRemaining(currentGoal.targetDate) < 30 && getProgressPercentage(currentGoal) < 80 && (
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-red-300" />
                  <p className="text-sm text-purple-100">
                    You might not reach your {currentGoal.name} goal on time. Consider increasing daily savings to ₹{getRequiredDailySavings(currentGoal) + 50}.
                  </p>
                </div>
              )}

              {totalSavingsThisWeek > totalExpensesThisWeek * 1.5 && (
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-300" />
                  <p className="text-sm text-purple-100">
                    Excellent saving habits! You're on track to reach your goals. Consider setting a more ambitious target.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Quick Tips</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Track every rupee</p>
                <p className="text-xs text-blue-600">Small expenses add up quickly</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Cook at home</p>
                <p className="text-xs text-green-600">Save ₹100-200 daily on food</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800 font-medium">Use public transport</p>
                <p className="text-xs text-purple-600">Reduce travel costs significantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Goal</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Goal name (e.g., Gaming Laptop)"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Target amount (₹)"
                value={newGoal.targetAmount || ''}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newGoal.icon}
                onChange={(e) => setNewGoal({ ...newGoal, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="laptop">💻 Laptop</option>
                <option value="smartphone">📱 Smartphone</option>
                <option value="book">📚 Books</option>
                <option value="car">🚗 Vehicle</option>
                <option value="gamepad">🎮 Gaming</option>
                <option value="target">🎯 Other</option>
              </select>
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as 'high' | 'medium' | 'low' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addGoal}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add Daily Entry</h3>
            <div className="space-y-4">
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Expenses (₹)"
                value={newEntry.expenses || ''}
                onChange={(e) => setNewEntry({ ...newEntry, expenses: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Savings (₹)"
                value={newEntry.savings || ''}
                onChange={(e) => setNewEntry({ ...newEntry, savings: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Description (e.g., lunch, books, bus fare)"
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select goal for savings</option>
                {goals.map(goal => (
                  <option key={goal.id} value={goal.id}>{goal.name}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddEntry(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addDailyEntry}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGoals;