import React, { useState } from 'react';
import { 
  TrendingUp, 
  Shield, 
  Calculator,
  DollarSign,
  Calendar,
  Target,
  CheckCircle,
  AlertCircle,
  Users,
  Zap,
  Award,
  Star,
  PieChart,
  BarChart3,
  Clock,
  MapPin
} from 'lucide-react';

interface InvestmentOption {
  id: string;
  type: 'sip' | 'insurance';
  name: string;
  description: string;
  minAmount: string;
  expectedReturn: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  features: string[];
  suitableFor: string[];
  taxBenefits?: string;
}

interface SuccessStory {
  id: string;
  name: string;
  location: string;
  age: number;
  occupation: string;
  investmentType: 'SIP' | 'Insurance' | 'Both';
  monthlyAmount: number;
  duration: number;
  currentValue: number;
  goal: string;
  story: string;
  avatar: string;
}

const SIPInsurance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sip' | 'insurance' | 'calculator' | 'stories'>('overview');
  const [selectedOption, setSelectedOption] = useState<InvestmentOption | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState({
    monthlyAmount: 2000,
    expectedReturn: 12,
    years: 10,
    type: 'sip'
  });

  const investmentOptions: InvestmentOption[] = [
    {
      id: '1',
      type: 'sip',
      name: 'Equity Diversified Fund SIP',
      description: 'Invest in a mix of large-cap, mid-cap stocks for balanced growth with reasonable risk.',
      minAmount: '₹500 per month',
      expectedReturn: '10-15% annually',
      riskLevel: 'Medium',
      features: [
        'Professional fund management',
        'Diversification across sectors',
        'Rupee cost averaging',
        'High liquidity',
        'Tax benefits under 80C (ELSS)'
      ],
      suitableFor: ['Long-term wealth creation', 'Goal-based investments', 'Regular income earners'],
      taxBenefits: 'Long-term capital gains tax exemption up to ₹1 lakh per year'
    },
    {
      id: '2',
      type: 'sip',
      name: 'Debt Fund SIP',
      description: 'Conservative investment in government and corporate bonds for steady returns.',
      minAmount: '₹1000 per month',
      expectedReturn: '6-9% annually',
      riskLevel: 'Low',
      features: [
        'Stable returns',
        'Lower volatility',
        'Professional management',
        'Better than FD returns',
        'Good liquidity'
      ],
      suitableFor: ['Conservative investors', 'Short to medium term goals', 'Senior citizens'],
      taxBenefits: 'Indexation benefits for long-term capital gains'
    },
    {
      id: '3',
      type: 'insurance',
      name: 'Term Life Insurance',
      description: 'Pure protection plan providing high life cover at affordable premiums.',
      minAmount: '₹300 per month',
      expectedReturn: 'Protection only',
      riskLevel: 'Low',
      features: [
        'High sum assured',
        'Low premium cost',
        'Riders available',
        'Tax benefits',
        'Online policy management'
      ],
      suitableFor: ['Young earners', 'Family breadwinners', 'Debt protection'],
      taxBenefits: 'Premium deduction under 80C, claims tax-free under 10(10D)'
    },
    {
      id: '4',
      type: 'insurance',
      name: 'Health Insurance',
      description: 'Comprehensive medical coverage for hospitalization and critical illnesses.',
      minAmount: '₹800 per month',
      expectedReturn: 'Medical coverage',
      riskLevel: 'Low',
      features: [
        'Cashless treatment',
        'Pre and post hospitalization',
        'Critical illness cover',
        'Family floater options',
        'No-claim bonus'
      ],
      suitableFor: ['All age groups', 'Families', 'Self-employed individuals'],
      taxBenefits: 'Premium deduction under 80D up to ₹75,000'
    },
    {
      id: '5',
      type: 'insurance',
      name: 'Unit Linked Insurance Plan (ULIP)',
      description: 'Combination of insurance and investment for wealth creation with protection.',
      minAmount: '₹1500 per month',
      expectedReturn: '8-12% annually',
      riskLevel: 'Medium',
      features: [
        'Life insurance + investment',
        'Multiple fund options',
        'Flexibility to switch funds',
        'Partial withdrawals allowed',
        'Long-term wealth creation'
      ],
      suitableFor: ['Long-term investors', 'Goal-based planning', 'Tax planning'],
      taxBenefits: 'Premium under 80C, maturity under 10(10D) if premium <10% of SA'
    }
  ];

  const successStories: SuccessStory[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      location: 'Nashik, Maharashtra',
      age: 32,
      occupation: 'Teacher',
      investmentType: 'SIP',
      monthlyAmount: 3000,
      duration: 8,
      currentValue: 450000,
      goal: 'Daughter\'s Education Fund',
      story: 'Started SIP with just ₹1,000/month in 2016. Gradually increased to ₹3,000. Built corpus of ₹4.5 lakh for daughter\'s higher education. The discipline of SIP helped me save consistently despite irregular income.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      location: 'Mysore, Karnataka',
      age: 38,
      occupation: 'Small Business Owner',
      investmentType: 'Both',
      monthlyAmount: 5000,
      duration: 5,
      currentValue: 380000,
      goal: 'Business Expansion + Family Protection',
      story: 'Combined SIP investment of ₹3,000 with term insurance of ₹2,000 premium. SIP gave me ₹3.8 lakh for business expansion. Term insurance provides ₹50 lakh cover for family security.',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Meera Devi',
      location: 'Jodhpur, Rajasthan',
      age: 29,
      occupation: 'Self-employed',
      investmentType: 'Insurance',
      monthlyAmount: 1200,
      duration: 3,
      currentValue: 45000,
      goal: 'Family Health Security',
      story: 'Health insurance saved my family ₹2.5 lakh when my husband was hospitalized for heart surgery. The ₹1,200 monthly premium seemed small but provided huge relief during crisis.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      name: 'Suresh Patil',
      location: 'Pune, Maharashtra',
      age: 45,
      occupation: 'IT Professional',
      investmentType: 'Both',
      monthlyAmount: 8000,
      duration: 12,
      currentValue: 2100000,
      goal: 'Retirement Planning',
      story: 'Started SIP at 33 with ₹2,000/month, gradually increased. Also took comprehensive insurance. Built ₹21 lakh corpus and secured family with ₹1 crore life cover. On track for comfortable retirement.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const sipBenefits = [
    {
      title: 'Rupee Cost Averaging',
      description: 'Buy more units when price is low, fewer when high. Reduces average cost over time.',
      icon: BarChart3
    },
    {
      title: 'Power of Compounding',
      description: 'Your returns earn returns. Small amounts grow exponentially over long periods.',
      icon: TrendingUp
    },
    {
      title: 'Disciplined Investing',
      description: 'Automated monthly investments build wealth without market timing worries.',
      icon: Target
    },
    {
      title: 'Flexibility',
      description: 'Start with ₹500, increase/decrease amounts, pause or stop anytime.',
      icon: Zap
    }
  ];

  const insuranceTypes = [
    {
      name: 'Term Life Insurance',
      description: 'High coverage at low cost for family protection',
      coverage: '₹50 lakh - ₹2 crore',
      premium: '₹300 - ₹2,000/month',
      icon: Shield
    },
    {
      name: 'Health Insurance',
      description: 'Medical expenses coverage for family',
      coverage: '₹5 lakh - ₹1 crore',
      premium: '₹800 - ₹5,000/month',
      icon: Users
    },
    {
      name: 'Critical Illness',
      description: 'Lump sum payout for serious diseases',
      coverage: '₹10 lakh - ₹50 lakh',
      premium: '₹500 - ₹3,000/month',
      icon: AlertCircle
    }
  ];

  const calculateSIPReturns = () => {
    const { monthlyAmount, expectedReturn, years } = calculatorInputs;
    const monthlyRate = expectedReturn / 12 / 100;
    const months = years * 12;
    
    const futureValue = monthlyAmount * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    const totalInvested = monthlyAmount * months;
    const returns = futureValue - totalInvested;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvested,
      returns: Math.round(returns),
      returnsPercentage: Math.round((returns / totalInvested) * 100)
    };
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'green';
      case 'Medium':
        return 'yellow';
      case 'High':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">SIP & Insurance Learning</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn how Systematic Investment Plans (SIP) and insurance can secure your financial future. 
          Understand through real success stories and practical examples how small monthly investments 
          can create significant wealth and provide family security.
        </p>
      </div>

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="h-8 w-8" />
          <h2 className="text-xl font-bold">Transform Your Financial Future</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">₹21 Lakh</div>
            <div className="text-green-100">Average SIP corpus in 12 years</div>
          </div>
          <div>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-green-100">People satisfied with SIP returns</div>
          </div>
          <div>
            <div className="text-2xl font-bold">₹500</div>
            <div className="text-green-100">Minimum monthly SIP amount</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl mb-6">
          {[
            { id: 'overview', name: 'Overview', icon: PieChart },
            { id: 'sip', name: 'SIP Investment', icon: TrendingUp },
            { id: 'insurance', name: 'Insurance', icon: Shield },
            { id: 'calculator', name: 'SIP Calculator', icon: Calculator },
            { id: 'stories', name: 'Success Stories', icon: Star }
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* SIP vs Traditional Savings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Why SIP is Better than Savings Account?</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Savings Account</span>
                      <span className="text-red-600">3-4% returns</span>
                    </div>
                    <div className="text-sm text-gray-600">₹5,000/month for 10 years = ₹6.2 lakh</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">SIP Investment</span>
                      <span className="text-green-600">12% returns</span>
                    </div>
                    <div className="text-sm text-gray-600">₹5,000/month for 10 years = ₹11.6 lakh</div>
                    <div className="text-blue-600 font-bold mt-1">Extra ₹5.4 lakh!</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">Insurance: Your Family's Safety Net</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">Life Insurance</span>
                    </div>
                    <div className="text-sm text-gray-600">₹500/month premium = ₹50 lakh coverage</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">Health Insurance</span>
                    </div>
                    <div className="text-sm text-gray-600">₹1,000/month = ₹5 lakh medical coverage</div>
                  </div>
                </div>
              </div>
            </div>

            {/* SIP Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Why SIP Works So Well?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sipBenefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-800">{benefit.title}</h4>
                      </div>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insurance Types */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Essential Insurance Types</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insuranceTypes.map((type, index) => {
                  const IconComponent = type.icon;
                  return (
                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-bold text-gray-800">{type.name}</h4>
                      </div>
                      <p className="text-gray-600 mb-4">{type.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Coverage:</span>
                          <span className="text-sm font-semibold">{type.coverage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Premium:</span>
                          <span className="text-sm font-semibold">{type.premium}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sip' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investmentOptions.filter(option => option.type === 'sip').map((option) => (
              <div key={option.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">{option.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getRiskColor(option.riskLevel)}-100 text-${getRiskColor(option.riskLevel)}-800`}>
                    {option.riskLevel} Risk
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{option.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Minimum SIP</p>
                    <p className="text-blue-800 font-bold">{option.minAmount}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">Expected Return</p>
                    <p className="text-green-800 font-bold">{option.expectedReturn}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {option.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedOption(option)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investmentOptions.filter(option => option.type === 'insurance').map((option) => (
              <div key={option.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-800">{option.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${getRiskColor(option.riskLevel)}-100 text-${getRiskColor(option.riskLevel)}-800`}>
                    {option.riskLevel} Risk
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{option.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">Starting Premium</p>
                    <p className="text-green-800 font-bold">{option.minAmount}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">Coverage/Return</p>
                    <p className="text-blue-800 font-bold">{option.expectedReturn}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {option.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedOption(option)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">SIP Calculator</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
                  <input
                    type="number"
                    step="500"
                    value={calculatorInputs.monthlyAmount}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, monthlyAmount: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={calculatorInputs.expectedReturn}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, expectedReturn: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical range: 8-15% for equity funds</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                  <input
                    type="number"
                    value={calculatorInputs.years}
                    onChange={(e) => setCalculatorInputs({...calculatorInputs, years: Number(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">💡 Pro Tips:</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Start early to benefit from compounding</li>
                    <li>• Increase SIP amount by 10-15% annually</li>
                    <li>• Stay invested for at least 5-7 years</li>
                    <li>• Don't stop SIP during market downturns</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Your SIP Results</h3>
              
              {(() => {
                const results = calculateSIPReturns();
                return (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Amount Invested</p>
                      <p className="text-2xl font-bold text-blue-600">₹{results.totalInvested.toLocaleString()}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Future Value</p>
                      <p className="text-3xl font-bold text-green-600">₹{results.futureValue.toLocaleString()}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Returns</p>
                      <p className="text-2xl font-bold text-purple-600">₹{results.returns.toLocaleString()}</p>
                      <p className="text-sm text-purple-500">{results.returnsPercentage}% total gain</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-lg text-white">
                      <p className="text-sm text-blue-100 mb-2">🎯 Your Goal Timeline</p>
                      <p className="text-sm">
                        By investing ₹{calculatorInputs.monthlyAmount.toLocaleString()}/month for {calculatorInputs.years} years, 
                        you'll have ₹{Math.round(results.futureValue/100000)}+ lakh for your financial goals!
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="text-xs text-gray-600">Per Year Avg</p>
                        <p className="font-bold text-gray-800">₹{Math.round(results.returns/calculatorInputs.years/1000)}k</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <p className="text-xs text-gray-600">Per Month Avg</p>
                        <p className="font-bold text-gray-800">₹{Math.round(results.returns/(calculatorInputs.years*12))}0</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
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

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-blue-600">Investment Type</p>
                    <p className="font-bold text-blue-800 text-sm">{story.investmentType}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-green-600">Monthly Amount</p>
                    <p className="font-bold text-green-800 text-sm">₹{story.monthlyAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-purple-600">Duration</p>
                    <p className="font-bold text-purple-800 text-sm">{story.duration} years</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm">Goal: {story.goal}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700">₹{story.currentValue.toLocaleString()}</div>
                  <p className="text-sm text-green-600">Current Value Achieved</p>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">{story.story}</p>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">Verified Success Story</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedOption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{selectedOption.name}</h2>
                <button
                  onClick={() => setSelectedOption(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-600 leading-relaxed">{selectedOption.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className={`bg-${selectedOption.type === 'sip' ? 'blue' : 'green'}-50 p-4 rounded-lg`}>
                  <p className={`text-${selectedOption.type === 'sip' ? 'blue' : 'green'}-600 font-medium mb-1`}>
                    {selectedOption.type === 'sip' ? 'Minimum SIP' : 'Starting Premium'}
                  </p>
                  <p className={`text-${selectedOption.type === 'sip' ? 'blue' : 'green'}-800 font-bold text-lg`}>
                    {selectedOption.minAmount}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-600 font-medium mb-1">Expected Return</p>
                  <p className="text-purple-800 font-bold text-lg">{selectedOption.expectedReturn}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3">All Features:</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {selectedOption.features.map((feature, index) => (
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
                  {selectedOption.suitableFor.map((item, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Risk Level:</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${getRiskColor(selectedOption.riskLevel)}-100 text-${getRiskColor(selectedOption.riskLevel)}-800`}>
                    {selectedOption.riskLevel} Risk
                  </span>
                </div>
                {selectedOption.taxBenefits && (
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Tax Benefits:</h4>
                    <p className="text-gray-600 text-sm">{selectedOption.taxBenefits}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedOption(null)}
                className={`w-full bg-${selectedOption.type === 'sip' ? 'blue' : 'green'}-600 text-white py-3 rounded-lg hover:bg-${selectedOption.type === 'sip' ? 'blue' : 'green'}-700 transition-colors font-semibold`}
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

export default SIPInsurance;