import React, { useState } from 'react';
import { 
  Newspaper, 
  TrendingUp, 
  Calendar, 
  Bell,
  Star,
  ExternalLink,
  Filter,
  Search,
  Bookmark,
  Share2,
  Clock,
  Tag,
  Users,
  Briefcase,
  Wheat,
  Heart
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'general' | 'agriculture' | 'women' | 'schemes' | 'markets';
  timestamp: string;
  readTime: number;
  source: string;
  tags: string[];
  isBookmarked: boolean;
  relevanceScore: number;
}

interface Scheme {
  id: string;
  name: string;
  description: string;
  category: 'agriculture' | 'women' | 'education' | 'business' | 'general';
  eligibility: string[];
  benefits: string[];
  applicationDeadline: string;
  isNew: boolean;
}

const NewsEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'schemes' | 'events'>('news');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'agriculture' | 'women' | 'schemes' | 'markets'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'New SIP Investment Options with Lower Risk for Rural Investors',
      summary: 'Government-backed mutual fund schemes specifically designed for rural populations launched with minimum investment of ₹100/month.',
      category: 'schemes',
      timestamp: '2 hours ago',
      readTime: 3,
      source: 'Financial Express',
      tags: ['SIP', 'Rural Investment', 'Mutual Funds'],
      isBookmarked: false,
      relevanceScore: 95
    },
    {
      id: '2',
      title: 'Women Self-Help Groups Show 300% Increase in Savings',
      summary: 'Latest data shows remarkable growth in savings among women participating in SHG programs across rural India.',
      category: 'women',
      timestamp: '4 hours ago',
      readTime: 5,
      source: 'Economic Times',
      tags: ['Women Empowerment', 'Self Help Groups', 'Savings'],
      isBookmarked: true,
      relevanceScore: 88
    },
    {
      id: '3',
      title: 'PM Kisan Scheme: New Guidelines for Direct Benefit Transfer',
      summary: 'Updated process for farmer registration and payment verification under PM Kisan scheme announced.',
      category: 'agriculture',
      timestamp: '6 hours ago',
      readTime: 4,
      source: 'Business Standard',
      tags: ['PM Kisan', 'Agriculture', 'DBT'],
      isBookmarked: false,
      relevanceScore: 92
    },
    {
      id: '4',
      title: 'Digital Payment Adoption Surges in Rural Markets',
      summary: 'UPI transactions in rural areas show 250% growth, enabling better financial inclusion and tracking.',
      category: 'general',
      timestamp: '1 day ago',
      readTime: 3,
      source: 'Mint',
      tags: ['Digital Payments', 'UPI', 'Financial Inclusion'],
      isBookmarked: false,
      relevanceScore: 85
    },
    {
      id: '5',
      title: 'Crop Insurance Claims Processing Accelerated with AI',
      summary: 'New AI-powered system reduces crop insurance claim processing time from 45 days to 7 days.',
      category: 'agriculture',
      timestamp: '1 day ago',
      readTime: 4,
      source: 'Hindu Business Line',
      tags: ['Crop Insurance', 'AI Technology', 'Claims Processing'],
      isBookmarked: true,
      relevanceScore: 90
    }
  ];

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'PM-KISAN Samman Nidhi',
      description: 'Financial support to small and marginal farmers across the country',
      category: 'agriculture',
      eligibility: ['Land holding up to 2 hectares', 'Valid Aadhaar card', 'Bank account'],
      benefits: ['₹6,000 per year in 3 installments', 'Direct bank transfer', 'No processing fee'],
      applicationDeadline: '2025-03-31',
      isNew: false
    },
    {
      id: '2',
      name: 'Stand Up India Scheme',
      description: 'Facilitate bank loans for SC/ST and women entrepreneurs',
      category: 'women',
      eligibility: ['Woman entrepreneur', 'SC/ST category', 'First-time entrepreneur'],
      benefits: ['Loans from ₹10 lakh to ₹1 crore', '7 years repayment period', 'Handholding support'],
      applicationDeadline: '2025-12-31',
      isNew: true
    },
    {
      id: '3',
      name: 'MUDRA Yojana',
      description: 'Micro-finance support for small businesses and entrepreneurs',
      category: 'business',
      eligibility: ['Small business owner', 'Non-corporate entity', 'Valid business plan'],
      benefits: ['Up to ₹10 lakh loan', 'No collateral required', 'Flexible repayment'],
      applicationDeadline: 'Ongoing',
      isNew: false
    },
    {
      id: '4',
      name: 'Kisan Credit Card (KCC)',
      description: 'Credit facility for farmers to meet short-term financial needs',
      category: 'agriculture',
      eligibility: ['Practicing farmer', 'Valid land documents', 'Aadhaar card'],
      benefits: ['Flexible credit limit', '2% interest subvention', 'Insurance cover'],
      applicationDeadline: 'Ongoing',
      isNew: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', icon: Newspaper, count: newsItems.length },
    { id: 'agriculture', name: 'Agriculture', icon: Wheat, count: newsItems.filter(item => item.category === 'agriculture').length },
    { id: 'women', name: 'Women Empowerment', icon: Heart, count: newsItems.filter(item => item.category === 'women').length },
    { id: 'schemes', name: 'Govt Schemes', icon: Star, count: newsItems.filter(item => item.category === 'schemes').length },
    { id: 'markets', name: 'Markets', icon: TrendingUp, count: newsItems.filter(item => item.category === 'markets').length }
  ];

  const filteredNews = newsItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && searchMatch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'agriculture':
        return <Wheat className="h-4 w-4 text-green-600" />;
      case 'women':
        return <Heart className="h-4 w-4 text-pink-600" />;
      case 'schemes':
        return <Star className="h-4 w-4 text-blue-600" />;
      case 'business':
        return <Briefcase className="h-4 w-4 text-purple-600" />;
      case 'education':
        return <Users className="h-4 w-4 text-indigo-600" />;
      default:
        return <Newspaper className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'agriculture':
        return 'bg-green-100 text-green-800';
      case 'women':
        return 'bg-pink-100 text-pink-800';
      case 'schemes':
        return 'bg-blue-100 text-blue-800';
      case 'business':
        return 'bg-purple-100 text-purple-800';
      case 'education':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">News & Events</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest financial news, government schemes, and events relevant to 
          agriculture, women empowerment, and rural development.
        </p>
      </div>

      {/* Notification Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Bell className="h-6 w-6" />
          <h3 className="text-lg font-bold">Personalized Updates</h3>
        </div>
        <p className="text-blue-100 mb-4">
          Get notified about schemes and opportunities that match your profile and interests. 
          Enable notifications to never miss important updates.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Enable Notifications
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl mb-6">
          {[
            { id: 'news', name: 'Financial News', icon: Newspaper },
            { id: 'schemes', name: 'Govt Schemes', icon: Star },
            { id: 'events', name: 'Events', icon: Calendar }
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

        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news, schemes, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                      <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* News Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredNews.map((news) => (
                <div key={news.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                      {getCategoryIcon(news.category)}
                      <span className="capitalize">{news.category}</span>
                    </div>
                    <button className={`p-1 rounded-full transition-colors ${
                      news.isBookmarked ? 'text-yellow-600' : 'text-gray-400 hover:text-gray-600'
                    }`}>
                      <Bookmark className={`h-4 w-4 ${news.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg mb-3 leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {news.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{news.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{news.readTime} min read</span>
                      </div>
                      <span className="text-blue-600 font-medium">{news.source}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">
                        <ExternalLink className="h-3 w-3" />
                        <span>Read</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schemes' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {schemes.map((scheme) => (
              <div key={scheme.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                      {getCategoryIcon(scheme.category)}
                      <span className="capitalize">{scheme.category}</span>
                    </div>
                    {scheme.isNew && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-3">
                  {scheme.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {scheme.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Eligibility:</h4>
                    <ul className="space-y-1">
                      {scheme.eligibility.slice(0, 3).map((criteria, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Benefits:</h4>
                    <ul className="space-y-1">
                      {scheme.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm">
                    <span className="text-gray-600">Deadline: </span>
                    <span className="font-semibold text-gray-800">{scheme.applicationDeadline}</span>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Events Coming Soon</h3>
            <p className="text-gray-600">
              We're working on bringing you relevant financial literacy events and workshops. 
              Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsEvents;