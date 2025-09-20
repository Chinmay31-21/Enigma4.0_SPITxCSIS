import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  Sparkles, 
  Plus, 
  Trash2, 
  PieChart,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit
} from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  planned: number;
  actual: number;
  isEssential: boolean;
}

interface BudgetSplitterProps {
  sectionTitle?: string;
}

const BudgetSplitter: React.FC<BudgetSplitterProps> = ({ sectionTitle = "Budget Expense Splitter" }) => {
  const [activeTab, setActiveTab] = useState<'household' | 'event' | 'festival'>('household');
  const [budgetName, setBudgetName] = useState('');
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newPlanned, setNewPlanned] = useState<number>(0);
  const [isEssential, setIsEssential] = useState(false);

  // Gamification state for rural users
  const [badges, setBadges] = useState<string[]>([]);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const budgetTypes = [
    {
      id: 'household',
      name: 'Household Budget',
      icon: Home,
      color: 'blue',
      description: 'Manage family expenses and identify savings opportunities'
    },
    {
      id: 'event',
      name: 'Event Budget',
      icon: Calendar,
      color: 'green',
      description: 'Plan and track community or family event expenses'
    },
    {
      id: 'festival',
      name: 'Festival Budget',
      icon: Sparkles,
      color: 'purple',
      description: 'Smart budgeting for festive celebrations and traditions'
    }
  ];

  const defaultCategories = {
    household: [
      { name: 'Groceries', essential: true },
      { name: 'Utilities', essential: true },
      { name: 'Education', essential: true },
      { name: 'Healthcare', essential: true },
      { name: 'Transportation', essential: true },
      { name: 'Entertainment', essential: false },
      { name: 'Clothing', essential: false },
      { name: 'Dining Out', essential: false }
    ],
    event: [
      { name: 'Venue', essential: true },
      { name: 'Food & Catering', essential: true },
      { name: 'Decorations', essential: false },
      { name: 'Entertainment', essential: false },
      { name: 'Photography', essential: false },
      { name: 'Transportation', essential: true },
      { name: 'Gifts', essential: false },
      { name: 'Miscellaneous', essential: false }
    ],
    festival: [
      { name: 'Food Items', essential: true },
      { name: 'Religious Items', essential: true },
      { name: 'Gifts', essential: false },
      { name: 'New Clothes', essential: false },
      { name: 'Decorations', essential: false },
      { name: 'Travel', essential: false },
      { name: 'Sweets & Treats', essential: false },
      { name: 'Donations', essential: false }
    ]
  };

  const addBudgetItem = () => {
    if (newCategory && newPlanned > 0) {
      const newItem: BudgetItem = {
        id: Date.now().toString(),
        category: newCategory,
        planned: newPlanned,
        actual: 0,
        isEssential: isEssential
      };
      setBudgetItems([...budgetItems, newItem]);
      setNewCategory('');
      setNewPlanned(0);
      setIsEssential(false);
    }
  };

  const addQuickCategory = (categoryName: string, essential: boolean) => {
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: categoryName,
      planned: 0,
      actual: 0,
      isEssential: essential
    };
    setBudgetItems([...budgetItems, newItem]);
  };

  const updateBudgetItem = (id: string, field: 'planned' | 'actual', value: number) => {
    setBudgetItems(budgetItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteBudgetItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const totalPlanned = budgetItems.reduce((sum, item) => sum + item.planned, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actual, 0);
  const totalSavings = totalPlanned - totalActual;
  const essentialSpending = budgetItems
    .filter(item => item.isEssential)
    .reduce((sum, item) => sum + item.actual, 0);
  const nonEssentialSpending = budgetItems
    .filter(item => !item.isEssential)
    .reduce((sum, item) => sum + item.actual, 0);

  const currentBudgetType = budgetTypes.find(type => type.id === activeTab);

  // Example: Award badges based on actions
  React.useEffect(() => {
    const earned: string[] = [];
    if (budgetItems.length > 0) earned.push('First Budget Created');
    if (totalSavings > 0 && totalSavings >= 500) earned.push('Saved ₹500+');
    if (budgetItems.length >= 5) earned.push('Budget Pro');
    if (totalActual > 0 && essentialSpending / totalActual > 0.7) earned.push('Smart Saver');
    setBadges(earned);
    // Example challenge: Spend less than 30% on non-essentials
    if (totalActual > 0 && nonEssentialSpending / totalActual < 0.3) setChallengeCompleted(true);
    else setChallengeCompleted(false);
  }, [budgetItems, totalSavings, totalActual, essentialSpending, nonEssentialSpending]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{sectionTitle}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Smart budgeting tool designed for households, events, and festivals. 
          Track expenses, identify savings opportunities, and achieve your financial goals.
        </p>
      </div>

      {/* Budget Type Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {budgetTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id as any)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 border-2 ${
                  activeTab === type.id
                    ? `border-${type.color}-500 bg-${type.color}-50 shadow-lg transform scale-105`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  activeTab === type.id ? `bg-${type.color}-500` : 'bg-gray-400'
                }`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Budget Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentBudgetType?.name} Planning
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Name
                </label>
                <input
                  type="text"
                  value={budgetName}
                  onChange={(e) => setBudgetName(e.target.value)}
                  placeholder={`My ${currentBudgetType?.name}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Budget (₹)
                </label>
                <input
                  type="number"
                  value={totalBudget || ''}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  placeholder="Enter total budget"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Add Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Add Categories</h3>
              <div className="flex flex-wrap gap-2">
                {defaultCategories[activeTab]
                  ?.filter(cat => !budgetItems.find(item => item.category === cat.name))
                  .map((category, index) => (
                    <button
                      key={index}
                      onClick={() => addQuickCategory(category.name, category.essential)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        category.essential
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      + {category.name}
                    </button>
                  ))
                }
              </div>
            </div>

            {/* Add Custom Category */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={newPlanned || ''}
                onChange={(e) => setNewPlanned(Number(e.target.value))}
                placeholder="Planned amount"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isEssential}
                  onChange={(e) => setIsEssential(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Essential</span>
              </label>
              <button
                onClick={addBudgetItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Budget Items */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Budget Breakdown</h3>
            
            {budgetItems.length === 0 ? (
              <div className="text-center py-8">
                <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No budget items added yet</p>
                <p className="text-sm text-gray-400">Add categories to start planning your budget</p>
              </div>
            ) : (
              <div className="space-y-3">
                {budgetItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-4 p-4 rounded-xl border-2 ${
                      item.isEssential ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-800">{item.category}</span>
                          {item.isEssential && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              Essential
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Planned</label>
                        <input
                          type="number"
                          value={item.planned || ''}
                          onChange={(e) => updateBudgetItem(item.id, 'planned', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="₹"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Actual</label>
                        <input
                          type="number"
                          value={item.actual || ''}
                          onChange={(e) => updateBudgetItem(item.id, 'actual', Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="₹"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm">
                          {item.actual > item.planned ? (
                            <span className="text-red-600 flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>+₹{item.actual - item.planned}</span>
                            </span>
                          ) : item.actual < item.planned ? (
                            <span className="text-green-600 flex items-center space-x-1">
                              <TrendingDown className="h-3 w-3" />
                              <span>-₹{item.planned - item.actual}</span>
                            </span>
                          ) : (
                            <span className="text-gray-500 flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3" />
                              <span>On track</span>
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => deleteBudgetItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary & Insights */}
        <div className="space-y-6">
          {/* Budget Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Budget Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-800">Total Budget</span>
                <span className="font-bold text-blue-900">₹{totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Planned</span>
                <span className="font-bold text-gray-800">₹{totalPlanned.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-800">Actual Spent</span>
                <span className="font-bold text-purple-900">₹{totalActual.toLocaleString()}</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg ${
                totalSavings >= 0 ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <span className={`text-sm font-medium ${
                  totalSavings >= 0 ? 'text-green-800' : 'text-red-800'
                }`}>
                  {totalSavings >= 0 ? 'Savings' : 'Over Budget'}
                </span>
                <span className={`font-bold ${
                  totalSavings >= 0 ? 'text-green-900' : 'text-red-900'
                }`}>
                  ₹{Math.abs(totalSavings).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Spending Analysis */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Spending Analysis</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Essential</span>
                </div>
                <span className="font-medium text-gray-800">₹{essentialSpending.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Non-Essential</span>
                </div>
                <span className="font-medium text-gray-800">₹{nonEssentialSpending.toLocaleString()}</span>
              </div>
              
              {/* Visual spending breakdown */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-red-500 h-4 rounded-l-full"
                    style={{ 
                      width: totalActual > 0 ? `${(essentialSpending / totalActual) * 100}%` : '0%' 
                    }}
                  ></div>
                  <div 
                    className="bg-blue-500 h-4 rounded-r-full -mt-4 ml-auto"
                    style={{ 
                      width: totalActual > 0 ? `${(nonEssentialSpending / totalActual) * 100}%` : '0%' 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Suggestions */}
          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">💡 Smart Suggestions</h3>
            <div className="space-y-3">
              {nonEssentialSpending > essentialSpending && (
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-300" />
                  <p className="text-sm text-blue-100">
                    You're spending more on non-essentials. Consider reducing by ₹{Math.round(nonEssentialSpending * 0.2).toLocaleString()} to boost savings.
                  </p>
                </div>
              )}
              {totalSavings < 0 && (
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 text-red-300" />
                  <p className="text-sm text-blue-100">
                    You're over budget! Focus on essential items and look for alternatives.
                  </p>
                </div>
              )}
              {totalSavings > totalBudget * 0.1 && (
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-300" />
                  <p className="text-sm text-blue-100">
                    Great job! You're saving well. Consider investing the extra ₹{Math.round(totalSavings * 0.8).toLocaleString()}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gamification & Rural Guide */}
      <div className="mt-10">
        <div className="bg-yellow-50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <span>Gamification & Rural Guide</span>
          </h2>
          {/* Badges */}
          <div className="mb-4">
            <h4 className="font-semibold text-yellow-700 mb-2">Your Badges</h4>
            <div className="flex flex-wrap gap-2">
              {badges.length === 0 ? (
                <span className="text-gray-400 text-sm">No badges yet. Start budgeting to earn!</span>
              ) : (
                badges.map((badge, idx) => (
                  <span key={idx} className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Sparkles className="h-3 w-3" />
                    <span>{badge}</span>
                  </span>
                ))
              )}
            </div>
          </div>
          {/* Savings Challenge */}
          <div className="mb-4">
            <h4 className="font-semibold text-yellow-700 mb-2">Monthly Savings Challenge</h4>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${challengeCompleted ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                {challengeCompleted ? 'Completed: Spent less than 30% on non-essentials!' : 'Try to spend less than 30% on non-essentials'}
              </span>
              {challengeCompleted && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
          </div>
          {/* Progress Bar to Savings Goal */}
          <div className="mb-4">
            <h4 className="font-semibold text-yellow-700 mb-2">Progress to Savings Goal (₹1000)</h4>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${Math.min((totalSavings / 1000) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-700 mt-1">
              Saved: ₹{Math.max(totalSavings, 0).toLocaleString()} / ₹1,000
            </div>
          </div>
          {/* Rural Step-by-Step Guide */}
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2">Simple Steps for Rural Users & Farmers</h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
              <li>Give your budget a name (e.g., "Kharif Season", "Wedding", "Pongal Festival").</li>
              <li>Enter your total available money for the period or event.</li>
              <li>Add main expense categories (e.g., Seeds, Fertilizer, Family, Cattle, Travel).</li>
              <li>Mark essential items (like seeds, food) for priority tracking.</li>
              <li>Update actual spending as you go (can be done offline, syncs later).</li>
              <li>Check your badges and progress bar for motivation!</li>
              <li>Try to complete the monthly savings challenge for a healthy financial habit.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSplitter;