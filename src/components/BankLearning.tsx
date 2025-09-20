import React, { useState } from 'react';
import { 
  Building, 
  PiggyBank, 
  CreditCard, 
  Shield, 
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  Clock,
  DollarSign,
  MapPin,
  Award,
  BookOpen,
  PlayCircle,
  Calculator
} from 'lucide-react';

interface BankingProduct {
  id: string;
  name: string;
  type: 'savings' | 'fd' | 'rd' | 'insurance' | 'loan';
  description: string;
  interestRate: string;
  minAmount: string;
  features: string[];
  suitableFor: string[];
  risks: string;
  returns: string;
}

interface SuccessStory {
  id: string;
  name: string;
  location: string;
  age: number;
  occupation: string;
  challenge: string;
  solution: string;
  outcome: string;
  amount: string;
  timeframe: string;
  avatar: string;
}

const BankLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basics' | 'products' | 'stories' | 'calculator'>('basics');
  const [selectedProduct, setSelectedProduct] = useState<BankingProduct | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState({
    amount: 10000,
    rate: 6.5,
    time: 12,
    type: 'fd'
  });

  const bankingProducts: BankingProduct[] = [
    {
      id: '1',
      name: 'Basic Savings Bank Deposit Account (BSBDA)',
      type: 'savings',
      description: 'No-frills basic banking account designed for financially disadvantaged sections.',
      interestRate: '3.5-4.0% per annum',
      minAmount: '₹0 (Zero balance)',
      features: [
        'No minimum balance requirement',
        'Free ATM/debit card',
        '4 free ATM withdrawals per month',
        'SMS alerts',
        'Internet banking facility'
      ],
      suitableFor: ['Rural customers', 'Low-income groups', 'First-time account holders'],
      risks: 'Very low risk',
      returns: 'Modest returns but high liquidity'
    },
    {
      id: '2',
      name: 'Fixed Deposit (FD)',
      type: 'fd',
      description: 'Deposit money for a fixed period at guaranteed interest rate.',
      interestRate: '6.5-7.5% per annum',
      minAmount: '₹1,000',
      features: [
        'Guaranteed returns',
        'Flexible tenure (7 days to 10 years)',
        'Loan against FD facility',
        'Premature withdrawal option',
        'Tax saving FD available'
      ],
      suitableFor: ['Conservative investors', 'Goal-based saving', 'Senior citizens'],
      risks: 'Very low risk (insured up to ₹5 lakh)',
      returns: 'Fixed and guaranteed returns'
    },
    {
      id: '3',
      name: 'Recurring Deposit (RD)',
      type: 'rd',
      description: 'Regular monthly deposits for building savings discipline with good returns.',
      interestRate: '6.0-7.0% per annum',
      minAmount: '₹100 per month',
      features: [
        'Monthly deposit habit',
        'Flexible tenure (6 months to 10 years)',
        'Loan facility available',
        'Compound interest benefits',
        'Auto-debit facility'
      ],
      suitableFor: ['Regular income earners', 'Students', 'Building emergency funds'],
      risks: 'Very low risk',
      returns: 'Better than savings account'
    },
    {
      id: '4',
      name: 'Kisan Credit Card (KCC)',
      type: 'loan',
      description: 'Credit facility for farmers to meet agricultural and allied expenses.',
      interestRate: '7% per annum (with subsidy)',
      minAmount: 'Based on crop/farming activities',
      features: [
        'Flexible credit limit',
        '2% interest subvention',
        'Personal accident insurance',
        'Crop insurance coverage',
        'Easy renewal'
      ],
      suitableFor: ['Farmers', 'Agricultural activities', 'Animal husbandry'],
      risks: 'Low to medium risk',
      returns: 'Enables income generation'
    },
    {
      id: '5',
      name: 'Crop Insurance Scheme',
      type: 'insurance',
      description: 'Protection against crop losses due to natural calamities, pests, diseases.',
      interestRate: 'Premium: 1.5-5% of sum insured',
      minAmount: 'Based on crop value',
      features: [
        'Coverage against natural disasters',
        'Pest and disease protection',
        'Post-harvest losses coverage',
        'Premium subsidy by government',
        'Quick claim settlement'
      ],
      suitableFor: ['All farmers', 'High-risk crops', 'Weather-dependent farming'],
      risks: 'Protects against farming risks',
      returns: 'Risk mitigation, not investment'
    }
  ];

  const successStories: SuccessStory[] = [
    {
      id: '1',
      name: 'Priya Devi',
      location: 'Nashik, Maharashtra',
      age: 34,
      occupation: 'Farmer & SHG Member',
      challenge: 'Single mother with irregular income from farming. No savings or emergency funds. Dependent on moneylenders for urgent needs at high interest rates.',
      solution: 'Started with BSBDA account, then began ₹500/month RD. Joined SHG for additional savings and learned about government schemes.',
      outcome: 'Built emergency fund of ₹25,000 in 3 years. Started organic farming with KCC loan. Monthly income increased from ₹8,000 to ₹18,000.',
      amount: '₹25,000 emergency fund + ₹1.2 lakh KCC loan',
      timeframe: '3 years',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Ramesh Kumar',
      location: 'Jaipur, Rajasthan',
      age: 52,
      occupation: 'Small Shopkeeper',
      challenge: 'Lost savings due to business losses during pandemic. No formal banking relationship. Difficulty in getting business loans.',
      solution: 'Opened savings account, started disciplined FD investments. Built credit history through small recurring deposits.',
      outcome: 'Accumulated ₹1.5 lakh through FDs. Got business loan to expand shop. Monthly profit increased by 60%.',
      amount: '₹1.5 lakh in FDs',
      timeframe: '2 years',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Meera Sharma',
      location: 'Udaipur, Rajasthan',
      age: 29,
      occupation: 'Homemaker & Handicraft Artist',
      challenge: 'Wanted financial independence but had no formal income. Husband handled all banking. No knowledge of banking products.',
      solution: 'Opened BSBDA account. Started ₹200/month RD from handicraft earnings. Learned about various banking products through SHG.',
      outcome: 'Saved ₹45,000 in 2 years. Started handicraft business with microcredit. Now earns ₹12,000 monthly and is financially independent.',
      amount: '₹45,000 through systematic savings',
      timeframe: '2 years',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      name: 'Suresh Patil',
      location: 'Solapur, Maharashtra',
      age: 45,
      occupation: 'Cotton Farmer',
      challenge: 'Crop failures due to irregular rainfall. Heavy debt from private lenders. No insurance coverage for crops.',
      solution: 'Got KCC for formal credit. Enrolled in crop insurance scheme. Started FD with PM-KISAN money for emergency fund.',
      outcome: 'Reduced debt burden by 70%. Insurance claim of ₹80,000 helped during crop failure. Built ₹50,000 emergency fund.',
      amount: '₹80,000 insurance claim + ₹50,000 savings',
      timeframe: '18 months',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const bankingBasics = [
    {
      title: 'Why Choose Banking Over Cash?',
      points: [
        'Safety: Bank deposits are insured up to ₹5 lakh per account',
        'Growth: Earn interest on your money instead of keeping cash idle',
        'Convenience: Digital payments, ATMs, and online banking',
        'Record Keeping: Automatic transaction history and statements',
        'Credit Building: Banking relationship helps in getting loans'
      ]
    },
    {
      title: 'Types of Banks Serving Rural Areas',
      points: [
        'Regional Rural Banks (RRBs): Specialized for rural needs',
        'Cooperative Banks: Community-owned, local focus',
        'Commercial Banks: Full-service banks with rural branches',
        'Small Finance Banks: Focus on underserved segments',
        'Payment Banks: Basic banking services, no lending'
      ]
    },
    {
      title: 'Digital Banking Benefits',
      points: [
        'Mobile Banking: Check balance, transfer money anytime',
        'UPI Payments: Instant payments using mobile number',
        'ATM Access: Cash withdrawal 24/7',
        'Direct Benefit Transfer: Government subsidies directly to account',
        'Bill Payments: Electricity, mobile, insurance payments online'
      ]
    }
  ];

  const calculateReturns = () => {
    const { amount, rate, time, type } = calculatorInputs;
    
    if (type === 'fd') {
      // Compound interest for FD
      const maturityAmount = amount * Math.pow(1 + (rate / 100), time / 12);
      return {
        maturityAmount: Math.round(maturityAmount),
        interestEarned: Math.round(maturityAmount - amount)
      };
    } else if (type === 'rd') {
      // RD calculation
      const monthlyAmount = amount;
      const months = time;
      const monthlyRate = rate / 12 / 100;
      const maturityAmount = monthlyAmount * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
      const totalDeposited = monthlyAmount * months;
      return {
        maturityAmount: Math.round(maturityAmount),
        interestEarned: Math.round(maturityAmount - totalDeposited),
        totalDeposited
      };
    }
    return { maturityAmount: 0, interestEarned: 0 };
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'savings':
        return PiggyBank;
      case 'fd':
        return Building;
      case 'rd':
        return TrendingUp;
      case 'insurance':
        return Shield;
      case 'loan':
        return CreditCard;
      default:
        return Building;
    }
  };

  const getProductColor = (type: string) => {
    switch (type) {
      case 'savings':
        return 'blue';
      case 'fd':
        return 'green';
      case 'rd':
        return 'purple';
      case 'insurance':
        return 'orange';
      case 'loan':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bank-Related Learnings: A Simple Approach to Secure Savings</h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-2">
          <span className="font-semibold text-blue-700">Fintech for All</span> is designed to make banking and investment easy for everyone, especially rural families. 
          We explain how banks like Regional Rural Banks (RRBs) and Small Finance Banks (SFBs) offer special savings accounts (like <span className="font-semibold">BSBDA</span>), Recurring Deposits (RDs), and Fixed Deposits (FDs) to help you save and grow your money safely.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn through real-life stories, simple examples, and easy calculators—so you can trust banks, understand schemes, and see how your savings can grow!
        </p>
      </div>

      {/* Trust Building Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-8 w-8" />
          <h2 className="text-xl font-bold">Your Money is Safe with Banks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-200" />
            <span className="text-blue-100">Government insured up to ₹5 lakh</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-200" />
            <span className="text-blue-100">RBI regulated and monitored</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-200" />
            <span className="text-blue-100">Better returns than cash at home</span>
          </div>
        </div>
      </div>

      {/* How This Helps You Box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span>How This Helps You</span>
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
          <li>
            <span className="font-semibold">Understand why banks matter:</span> Banks keep your money safe, help you save, and offer loans for farming, business, or emergencies.
          </li>
          <li>
            <span className="font-semibold">Learn about savings schemes:</span> See how <span className="text-blue-700 font-semibold">BSBDA</span> (zero-balance accounts), <span className="text-green-700 font-semibold">Recurring Deposits (RDs)</span>, and <span className="text-purple-700 font-semibold">Fixed Deposits (FDs)</span> work for regular and long-term savings.
          </li>
          <li>
            <span className="font-semibold">Trust through real stories:</span> Read about rural women and men who improved their lives by saving in banks and using simple schemes.
          </li>
          <li>
            <span className="font-semibold">See your future returns:</span> Use our easy calculator to check how much you can earn by saving regularly.
          </li>
          <li>
            <span className="font-semibold">No jargon, just simple steps:</span> Everything is explained in plain language, with practical examples and tips for rural households.
          </li>
        </ul>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl mb-6">
          {[
            { id: 'basics', name: 'Banking Basics', icon: BookOpen },
            { id: 'products', name: 'Banking Products', icon: Building },
            { id: 'stories', name: 'Success Stories', icon: Star },
            { id: 'calculator', name: 'Returns Calculator', icon: Calculator }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'basics' && (
          <div className="space-y-8">
            {bankingBasics.map((section, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {section.points.map((point, pointIndex) => {
                    const [title, description] = point.split(':');
                    return (
                      <div key={pointIndex} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-800">{title}:</span>
                          <span className="text-gray-600 ml-2">{description}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bankingProducts.map((product) => {
              const IconComponent = getProductIcon(product.type);
              const color = getProductColor(product.type);
              
              return (
                <div
                  key={product.id}
                  className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`h-6 w-6 text-${color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{product.type} product</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-600 font-medium">Interest Rate</p>
                      <p className="text-blue-800 font-bold">{product.interestRate}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-green-600 font-medium">Minimum Amount</p>
                      <p className="text-green-800 font-bold">{product.minAmount}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">Key Features:</p>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full bg-${color}-600 text-white py-2 rounded-lg hover:bg-${color}-700 transition-colors`}
                  >
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{story.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{story.location}</span>
                    </div>
                    <p className="text-sm text-gray-600">{story.age} years • {story.occupation}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Challenge:</h4>
                    <p className="text-red-700 text-sm">{story.challenge}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Solution:</h4>
                    <p className="text-blue-700 text-sm">{story.solution}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Outcome:</h4>
                    <p className="text-green-700 text-sm mb-3">{story.outcome}</p>
                    <div className="flex items-center justify-between">
                      <div className="bg-green-100 px-3 py-1 rounded-full">
                        <span className="text-green-800 font-semibold text-sm">{story.amount}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{story.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">Success Story</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Calculate Your Returns</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                  <select
                    value={calculatorInputs.type}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="fd">Fixed Deposit (FD)</option>
                    <option value="rd">Recurring Deposit (RD)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {calculatorInputs.type === 'fd' ? 'Investment Amount (₹)' : 'Monthly Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.amount}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, amount: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% per annum)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={calculatorInputs.rate}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, rate: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period ({calculatorInputs.type === 'fd' ? 'months' : 'months'})
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.time}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, time: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Your Returns</h3>
              
              {(() => {
                const results = calculateReturns();
                return (
                  <div className="space-y-4">
                    {calculatorInputs.type === 'rd' && results.totalDeposited && (
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Total Amount Deposited</p>
                        <p className="text-2xl font-bold text-blue-600">₹{results.totalDeposited?.toLocaleString()}</p>
                      </div>
                    )}

                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Maturity Amount</p>
                      <p className="text-3xl font-bold text-green-600">₹{results.maturityAmount.toLocaleString()}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Interest Earned</p>
                      <p className="text-2xl font-bold text-purple-600">₹{results.interestEarned.toLocaleString()}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-lg text-white">
                      <p className="text-sm text-blue-100 mb-2">💡 Pro Tip</p>
                      <p className="text-sm">
                        {calculatorInputs.type === 'fd' 
                          ? 'Consider reinvesting your FD at maturity for compound growth!'
                          : 'RD helps build saving habits. Start small and increase amount gradually!'
                        }
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-600 font-medium mb-1">Interest Rate</p>
                  <p className="text-blue-800 font-bold text-lg">{selectedProduct.interestRate}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-600 font-medium mb-1">Minimum Amount</p>
                  <p className="text-green-800 font-bold text-lg">{selectedProduct.minAmount}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">All Features:</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">Suitable For:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.suitableFor.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Risk Level:</h4>
                  <p className="text-gray-600">{selectedProduct.risks}</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Returns:</h4>
                  <p className="text-gray-600">{selectedProduct.returns}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankLearning;