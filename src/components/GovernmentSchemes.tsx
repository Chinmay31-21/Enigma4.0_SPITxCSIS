import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  Users,
  Wheat,
  Building,
  Heart,
  Briefcase,
  GraduationCap,
  Home
} from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: 'agriculture' | 'women' | 'rural' | 'business' | 'education' | 'housing';
  implementingAgency: string;
  benefitAmount: string;
  eligibility: string[];
  documents: string[];
  applicationProcess: string[];
  deadline: string;
  status: 'active' | 'upcoming' | 'closed';
  beneficiaries: number;
  successStory?: {
    name: string;
    location: string;
    story: string;
    amount: string;
  };
}

const GovernmentSchemes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'agriculture' | 'women' | 'rural' | 'business' | 'education' | 'housing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const schemes: Scheme[] = [
    {
      id: '1',
      name: 'Prime Minister Employment Generation Programme',
      shortName: 'PMEGP',
      description: 'Credit-linked subsidy scheme for generating self-employment opportunities through establishment of micro enterprises in rural and urban areas.',
      category: 'business',
      implementingAgency: 'Ministry of MSME, Khadi and Village Industries Commission',
      benefitAmount: 'Up to ₹25 lakh (Manufacturing) / ₹10 lakh (Services)',
      eligibility: [
        'Age above 18 years',
        'Minimum educational qualification: 8th standard',
        'Project cost above ₹10 lakh in manufacturing sector',
        'Should not have availed subsidy under any other scheme'
      ],
      documents: [
        'Educational certificates',
        'Identity proof (Aadhaar card)',
        'Residence proof',
        'Category certificate (if applicable)',
        'Project report',
        'Bank account details'
      ],
      applicationProcess: [
        'Visit official PMEGP portal or nearest KVIC/DIC office',
        'Fill online application form',
        'Upload required documents',
        'Submit project report',
        'Attend interview if shortlisted',
        'Loan approval and disbursement'
      ],
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: 850000,
      successStory: {
        name: 'Ravi Kumar',
        location: 'Bangalore Rural, Karnataka',
        story: 'Started small agri-processing unit with PMEGP subsidy of ₹3.5 lakh. Now employs 12 people and earns ₹50,000 monthly profit.',
        amount: '₹3.5 lakh subsidy'
      }
    },
    {
      id: '2',
      name: 'National Bank for Agriculture and Rural Development',
      shortName: 'NABARD SHG-Bank Linkage',
      description: 'Promotes Self-Help Groups and provides credit linkage for rural women and farmers.',
      category: 'women',
      implementingAgency: 'NABARD',
      benefitAmount: 'Up to ₹10 lakh per SHG',
      eligibility: [
        'Members of registered Self-Help Groups',
        'SHG should be operational for at least 6 months',
        'Regular savings and meeting records',
        'Good repayment track record'
      ],
      documents: [
        'SHG registration certificate',
        'Group savings records',
        'Minutes of meetings',
        'Member identity proofs',
        'Bank account statements'
      ],
      applicationProcess: [
        'Form or join a Self-Help Group',
        'Maintain regular savings for 6 months',
        'Apply through SHG to nearest bank',
        'Bank assessment and approval',
        'Credit linkage establishment'
      ],
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: 9500000,
      successStory: {
        name: 'Meera Devi',
        location: 'Jodhpur, Rajasthan',
        story: 'Through SHG, started tailoring business with ₹50,000 loan. Now runs successful clothing unit with 8 members earning ₹15,000 each monthly.',
        amount: '₹50,000 initial loan'
      }
    },
    {
      id: '3',
      name: 'District Rural Development Agency Schemes',
      shortName: 'DRDA Programs',
      description: 'Various poverty alleviation and rural development programs implemented at district level.',
      category: 'rural',
      implementingAgency: 'District Rural Development Agencies',
      benefitAmount: 'Varies by program (₹5,000 - ₹2 lakh)',
      eligibility: [
        'Rural households below poverty line',
        'Scheduled Caste/Scheduled Tribe families',
        'Women-headed households',
        'Differently-abled persons'
      ],
      documents: [
        'BPL card',
        'Category certificate',
        'Income certificate',
        'Residence proof',
        'Bank account details'
      ],
      applicationProcess: [
        'Contact local DRDA office',
        'Fill application form',
        'Submit required documents',
        'Verification by local officials',
        'Approval and benefit disbursal'
      ],
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: 1200000
    },
    {
      id: '4',
      name: 'Pradhan Mantri Kisan Samman Nidhi',
      shortName: 'PM-KISAN',
      description: 'Financial support to small and marginal farmers for their income support.',
      category: 'agriculture',
      implementingAgency: 'Ministry of Agriculture & Farmers Welfare',
      benefitAmount: '₹6,000 per year in three installments',
      eligibility: [
        'Small and marginal farmers',
        'Land holding up to 2 hectares',
        'Name in land records',
        'Valid bank account linked with Aadhaar'
      ],
      documents: [
        'Aadhaar card',
        'Land ownership papers',
        'Bank account details',
        'Passport size photographs'
      ],
      applicationProcess: [
        'Visit PM-KISAN portal or CSC center',
        'Register with Aadhaar and bank details',
        'Upload land records',
        'Verification by local authorities',
        'Direct benefit transfer to account'
      ],
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: 11500000,
      successStory: {
        name: 'Suresh Patil',
        location: 'Solapur, Maharashtra',
        story: 'Receives ₹6,000 annually through PM-KISAN. Used money to buy quality seeds and organic fertilizers, increased crop yield by 30%.',
        amount: '₹6,000 per year'
      }
    },
    {
      id: '5',
      name: 'Deendayal Antyodaya Yojana - National Rural Livelihoods Mission',
      shortName: 'DAY-NRLM',
      description: 'Aims to eliminate rural poverty through promotion of multiple livelihoods and improved access to financial services.',
      category: 'rural',
      implementingAgency: 'Ministry of Rural Development',
      benefitAmount: 'Up to ₹1 lakh per household',
      eligibility: [
        'Rural poor households',
        'Women members of rural households',
        'Households identified through participatory process'
      ],
      documents: [
        'BPL certificate',
        'Identity proof',
        'Address proof',
        'Bank account details'
      ],
      applicationProcess: [
        'Identification through village-level process',
        'Formation of Self-Help Groups',
        'Capacity building and training',
        'Credit linkage and livelihood support',
        'Monitoring and evaluation'
      ],
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: 8000000
    },
    {
      id: '6',
      name: 'Stand Up India Scheme',
      shortName: 'Stand Up India',
      description: 'Facilitates bank loans between ₹10 lakh to ₹1 crore to SC/ST and women entrepreneurs.',
      category: 'women',
      implementingAgency: 'Department of Financial Services',
      benefitAmount: '₹10 lakh to ₹1 crore loan',
      eligibility: [
        'SC/ST and/or women entrepreneurs',
        'Age between 18-65 years',
        'First-time entrepreneur',
        'Non-individual enterprises'
      ],
      documents: [
        'Category certificate (SC/ST)',
        'Educational certificates',
        'Project report',
        'Identity and address proof',
        'Experience certificate'
      ],
      applicationProcess: [
        'Submit application to designated bank branch',
        'Project evaluation by bank',
        'Loan approval process',
        'Handholding support during implementation'
      ],
      deadline: '2025-12-31',
      status: 'active',
      beneficiaries: 125000
    }
  ];

  const categories = [
    { id: 'all', name: 'All Schemes', icon: Award, color: 'blue' },
    { id: 'agriculture', name: 'Agriculture', icon: Wheat, color: 'green' },
    { id: 'women', name: 'Women', icon: Heart, color: 'pink' },
    { id: 'rural', name: 'Rural Dev', icon: Home, color: 'yellow' },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'purple' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'indigo' },
    { id: 'housing', name: 'Housing', icon: Building, color: 'orange' }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const categoryMatch = selectedCategory === 'all' || scheme.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find(cat => cat.id === category);
    if (!categoryObj) return Award;
    return categoryObj.icon;
  };

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(cat => cat.id === category);
    if (!categoryObj) return 'blue';
    return categoryObj.color;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Government Schemes Directory</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover and apply for government schemes designed to support rural communities, farmers, 
          women entrepreneurs, and small businesses. Find schemes you're eligible for and learn from success stories.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Award className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-800">{schemes.length}</h3>
          <p className="text-sm text-gray-600">Available Schemes</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-800">31.2M+</h3>
          <p className="text-sm text-gray-600">Beneficiaries Helped</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-800">₹45,000Cr+</h3>
          <p className="text-sm text-gray-600">Total Disbursed</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="font-bold text-gray-800">87%</h3>
          <p className="text-sm text-gray-600">Success Rate</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes by name, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? `bg-${category.color}-600 text-white shadow-lg transform scale-105`
                    : `bg-${category.color}-100 text-${category.color}-800 hover:bg-${category.color}-200`
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredSchemes.map((scheme) => {
          const IconComponent = getCategoryIcon(scheme.category);
          const categoryColor = getCategoryColor(scheme.category);
          
          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-${categoryColor}-100 rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 text-${categoryColor}-600`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{scheme.shortName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                      {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">{scheme.benefitAmount}</div>
                  <div className="text-xs text-gray-500">{scheme.beneficiaries.toLocaleString()} beneficiaries</div>
                </div>
              </div>

              {/* Description */}
              <h4 className="font-semibold text-gray-800 mb-2">{scheme.name}</h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{scheme.description}</p>

              {/* Key Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{scheme.implementingAgency}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Deadline: {scheme.deadline}</span>
                </div>
              </div>

              {/* Eligibility Preview */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-800 mb-2 text-sm">Key Eligibility:</h5>
                <ul className="space-y-1">
                  {scheme.eligibility.slice(0, 2).map((criteria, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{criteria}</span>
                    </li>
                  ))}
                  {scheme.eligibility.length > 2 && (
                    <li className="text-sm text-blue-600">
                      +{scheme.eligibility.length - 2} more criteria
                    </li>
                  )}
                </ul>
              </div>

              {/* Success Story */}
              {scheme.successStory && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800 text-sm">Success Story</span>
                  </div>
                  <p className="text-green-700 text-sm mb-2">
                    <strong>{scheme.successStory.name}</strong> from {scheme.successStory.location}: {scheme.successStory.story}
                  </p>
                  <div className="text-green-600 font-semibold text-sm">
                    Benefit received: {scheme.successStory.amount}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Details
                </button>
                <button className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>Apply</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed View Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-${getCategoryColor(selectedScheme.category)}-100 rounded-xl flex items-center justify-center`}>
                    {React.createElement(getCategoryIcon(selectedScheme.category), { 
                      className: `h-6 w-6 text-${getCategoryColor(selectedScheme.category)}-600` 
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedScheme.shortName}</h2>
                    <p className="text-gray-600">{selectedScheme.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedScheme.description}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Eligibility Criteria</h3>
                    <ul className="space-y-2">
                      {selectedScheme.eligibility.map((criteria, index) => (
                        <li key={index} className="text-gray-600 flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Required Documents</h3>
                    <ul className="space-y-2">
                      {selectedScheme.documents.map((document, index) => (
                        <li key={index} className="text-gray-600 flex items-start space-x-2">
                          <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>{document}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">Benefit Amount</h4>
                    <p className="text-2xl font-bold text-blue-900">{selectedScheme.benefitAmount}</p>
                    <p className="text-blue-700 text-sm mt-1">
                      Implementing Agency: {selectedScheme.implementingAgency}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Application Process</h3>
                    <ol className="space-y-3">
                      {selectedScheme.applicationProcess.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-gray-600 flex-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {selectedScheme.successStory && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-3">Success Story</h4>
                      <div className="space-y-2">
                        <p className="font-semibold text-green-700">
                          {selectedScheme.successStory.name} • {selectedScheme.successStory.location}
                        </p>
                        <p className="text-green-700 text-sm leading-relaxed">
                          {selectedScheme.successStory.story}
                        </p>
                        <div className="bg-green-100 px-3 py-2 rounded-lg inline-block">
                          <span className="text-green-800 font-semibold text-sm">
                            Benefit: {selectedScheme.successStory.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Apply for This Scheme
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;