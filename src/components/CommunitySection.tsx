import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  Star, 
  Trophy, 
  MapPin, 
  Heart,
  Share2,
  Award,
  TrendingUp,
  BookOpen,
  UserCheck,
  Crown
} from 'lucide-react';

interface CommunityMember {
  id: string;
  name: string;
  location: string;
  avatar: string;
  role: 'champion' | 'mentor' | 'member';
  points: number;
  completedLessons: number;
  specialties: string[];
  joinedDate: string;
}

interface Post {
  id: string;
  author: CommunityMember;
  content: string;
  type: 'success_story' | 'question' | 'tip' | 'milestone';
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  isLiked?: boolean;
}

const CommunitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'champions' | 'leaderboard'>('feed');
  const [newPost, setNewPost] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const communityMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      location: 'Rural Maharashtra',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'champion',
      points: 2850,
      completedLessons: 48,
      specialties: ['SIP Investment', 'Rural Banking'],
      joinedDate: '2024-03-15'
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      location: 'Karnataka',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'champion',
      points: 2650,
      completedLessons: 45,
      specialties: ['Government Schemes', 'Agricultural Finance'],
      joinedDate: '2024-02-20'
    },
    {
      id: '3',
      name: 'Meera Devi',
      location: 'Rajasthan',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'mentor',
      points: 1950,
      completedLessons: 35,
      specialties: ['Women Empowerment', 'Micro Savings'],
      joinedDate: '2024-04-10'
    },
    {
      id: '4',
      name: 'Amit Singh',
      location: 'Uttar Pradesh',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'member',
      points: 1200,
      completedLessons: 25,
      specialties: ['Student Finance', 'Budget Planning'],
      joinedDate: '2024-05-05'
    }
  ];

  const posts: Post[] = [
    {
      id: '1',
      author: communityMembers[0],
      content: "Just completed my first year of SIP investment! Started with just ₹500/month and now I have ₹8,500 saved. The compound interest is really working! 🎉",
      type: 'success_story',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      tags: ['SIP', 'Success', 'Compound Interest'],
      isLiked: true
    },
    {
      id: '2',
      author: communityMembers[1],
      content: "Successfully got PMEGP loan approved for my small agri-business! The documentation process was easier than I thought. Happy to help others with the application process.",
      type: 'milestone',
      timestamp: '5 hours ago',
      likes: 18,
      comments: 12,
      tags: ['PMEGP', 'Business Loan', 'Agriculture'],
      isLiked: false
    },
    {
      id: '3',
      author: communityMembers[2],
      content: "Quick tip: Always compare FD rates across different banks before investing. I found a 0.5% higher rate that gives me ₹2,500 extra per year! 💡",
      type: 'tip',
      timestamp: '1 day ago',
      likes: 31,
      comments: 6,
      tags: ['Fixed Deposit', 'Banking', 'Savings'],
      isLiked: true
    },
    {
      id: '4',
      author: communityMembers[3],
      content: "Need advice: I'm a college student with ₹2,000 monthly allowance. How should I start investing? Goal is to buy a laptop worth ₹40,000 in 1.5 years.",
      type: 'question',
      timestamp: '2 days ago',
      likes: 15,
      comments: 18,
      tags: ['Student Finance', 'Investment Advice', 'Goal Planning'],
      isLiked: false
    }
  ];

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'success_story':
        return <Trophy className="h-4 w-4 text-yellow-600" />;
      case 'milestone':
        return <Award className="h-4 w-4 text-blue-600" />;
      case 'tip':
        return <Star className="h-4 w-4 text-purple-600" />;
      case 'question':
        return <MessageCircle className="h-4 w-4 text-green-600" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'champion':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'mentor':
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'champion':
        return 'bg-yellow-100 text-yellow-800';
      case 'mentor':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Community Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with fellow learners, share success stories, and get guidance from financial champions. 
          Build trust through peer experiences and community support.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800">12,543</h3>
          <p className="text-sm text-gray-600">Community Members</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Crown className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="font-bold text-gray-800">156</h3>
          <p className="text-sm text-gray-600">Financial Champions</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Trophy className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-800">3,847</h3>
          <p className="text-sm text-gray-600">Success Stories</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Heart className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-800">₹2.1Cr</h3>
          <p className="text-sm text-gray-600">Total Savings Achieved</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl">
          {[
            { id: 'feed', name: 'Community Feed', icon: MessageCircle },
            { id: 'champions', name: 'Champions', icon: Crown },
            { id: 'leaderboard', name: 'Leaderboard', icon: Trophy }
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

        {/* Content based on active tab */}
        <div className="mt-6">
          {activeTab === 'feed' && (
            <div className="space-y-6">
              {/* Create Post */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <button
                    onClick={() => setShowPostModal(true)}
                    className="flex-1 text-left px-4 py-3 bg-white rounded-lg border border-gray-200 text-gray-500 hover:border-gray-300 transition-colors"
                  >
                    Share your financial journey or ask a question...
                  </button>
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(post.author.role)}`}>
                            {post.author.role}
                          </span>
                          <div className="flex items-center space-x-1">
                            {getPostTypeIcon(post.type)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                          <MapPin className="h-3 w-3" />
                          <span>{post.author.location}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Post Actions */}
                        <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">
                          <button className={`flex items-center space-x-2 text-sm transition-colors ${
                            post.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                          }`}>
                            <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'champions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityMembers.filter(member => member.role === 'champion' || member.role === 'mentor').map((champion) => (
                <div key={champion.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={champion.avatar}
                        alt={champion.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        {getRoleIcon(champion.role)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{champion.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{champion.location}</span>
                      </div>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(champion.role)}`}>
                        {getRoleIcon(champion.role)}
                        <span>{champion.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600">{champion.points}</div>
                      <div className="text-xs text-blue-500">Points</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="font-bold text-green-600">{champion.completedLessons}</div>
                      <div className="text-xs text-green-500">Lessons</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {champion.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Connect & Learn
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div className="space-y-4">
              {communityMembers
                .sort((a, b) => b.points - a.points)
                .map((member, index) => (
                  <div key={member.id} className={`flex items-center space-x-4 p-4 rounded-xl ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex-shrink-0">
                      {index === 0 && <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">1</div>}
                      {index === 1 && <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">2</div>}
                      {index === 2 && <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">3</div>}
                      {index > 2 && <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold">{index + 1}</div>}
                    </div>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">{member.name}</h3>
                        {getRoleIcon(member.role)}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{member.points}</div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{member.completedLessons}</div>
                      <div className="text-sm text-blue-500">lessons</div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;