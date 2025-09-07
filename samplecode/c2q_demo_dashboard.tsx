import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, DollarSign, FileText, Clock, TrendingUp, TrendingDown, 
  Shield, CheckCircle, AlertTriangle, Bell, Search,
  Quote, Calculator, FileCheck, UserCheck, Gavel, Database,
  Settings, Activity, Eye, Brain, Filter, Globe, Zap, Target,
  BarChart3, Star, Award, ArrowUpRight, RefreshCw, Download
} from 'lucide-react';

const C2QDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [realTimeData, setRealTimeData] = useState({
    quotesGenerated: 1247,
    applicationsSubmitted: 892,
    policiesIssued: 456,
    claimsProcessed: 123,
    revenue: 2345000,
    activeUsers: 1890
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        quotesGenerated: prev.quotesGenerated + Math.floor(Math.random() * 3),
        applicationsSubmitted: prev.applicationsSubmitted + Math.floor(Math.random() * 2),
        policiesIssued: prev.policiesIssued + Math.floor(Math.random() * 1),
        claimsProcessed: prev.claimsProcessed + Math.floor(Math.random() * 1),
        revenue: prev.revenue + Math.floor(Math.random() * 10000),
        activeUsers: 1890 + Math.floor(Math.random() * 100)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Sample data
  const performanceData = [
    { month: 'Jan', quotes: 980, applications: 720, policies: 350 },
    { month: 'Feb', quotes: 1150, applications: 890, policies: 420 },
    { month: 'Mar', quotes: 1300, applications: 980, policies: 485 },
    { month: 'Apr', quotes: 1420, applications: 1120, policies: 520 },
    { month: 'May', quotes: 1580, applications: 1250, policies: 580 },
    { month: 'Jun', quotes: 1650, applications: 1350, policies: 615 }
  ];

  const productMixData = [
    { name: 'Term Life', value: 45, color: '#3B82F6' },
    { name: 'Whole Life', value: 30, color: '#10B981' },
    { name: 'Universal Life', value: 20, color: '#F59E0B' },
    { name: 'Variable Life', value: 5, color: '#EF4444' }
  ];

  const modules = [
    { id: 'quotes', name: 'Pre-Sales Quotes', icon: Quote, color: 'bg-blue-500', count: '1,247 today' },
    { id: 'applications', name: 'Order Entry', icon: FileCheck, color: 'bg-purple-500', count: '456 submitted' },
    { id: 'underwriting', name: 'Underwriting', icon: UserCheck, color: 'bg-orange-500', count: '234 in review' },
    { id: 'rules', name: 'Rules Engine', icon: Brain, color: 'bg-indigo-500', count: '98% automated' },
    { id: 'claims', name: 'Claims Processing', icon: Gavel, color: 'bg-red-500', count: '123 processed' },
    { id: 'kyc', name: 'KYC Intelligence', icon: Shield, color: 'bg-yellow-500', count: '100% verified' }
  ];

  const kpiData = [
    { 
      title: 'Total Premium Revenue', 
      value: `$${(realTimeData.revenue / 1000000).toFixed(1)}M`, 
      change: '+12.5%', 
      icon: DollarSign,
      color: 'text-green-600'
    },
    { 
      title: 'Active Customers', 
      value: realTimeData.activeUsers.toLocaleString(), 
      change: '+18.7%', 
      icon: Users,
      color: 'text-blue-600'
    },
    { 
      title: 'Quote Conversion', 
      value: '68.4%', 
      change: '+4.2%', 
      icon: Target,
      color: 'text-purple-600'
    },
    { 
      title: 'Processing Speed', 
      value: '1.8 days', 
      change: '-35%', 
      icon: Zap,
      color: 'text-green-600'
    },
    { 
      title: 'System Health', 
      value: '99.7%', 
      change: '+0.1%', 
      icon: Activity,
      color: 'text-indigo-600'
    },
    { 
      title: 'Customer Satisfaction', 
      value: '4.8/5.0', 
      change: '+0.3%', 
      icon: Star,
      color: 'text-orange-600'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Executive Dashboard</h2>
            <p className="text-gray-600 mt-1 flex items-center">
              Real-time insights into your insurance operations
              <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="ml-1 text-green-600 text-sm">Live</span>
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{kpi.change}</span>
                </div>
              </div>
              <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="quotes" stroke="#3B82F6" strokeWidth={2} name="Quotes" />
              <Line type="monotone" dataKey="applications" stroke="#10B981" strokeWidth={2} name="Applications" />
              <Line type="monotone" dataKey="policies" stroke="#F59E0B" strokeWidth={2} name="Policies" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Mix */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Mix</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productMixData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {productMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {productMixData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Modules */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Modules Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module) => (
            <div 
              key={module.id} 
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => setActiveModule(module.id)}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg ${module.color} text-white mr-4`}>
                  <module.icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{module.name}</h4>
                  <p className="text-sm text-gray-600">{module.count}</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <Eye className="h-4 w-4 mr-1" />
                View Details
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQuoteModule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Pre-Sales Quote Generation</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Customer Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="p-3 border border-gray-300 rounded-lg" defaultValue="John" />
              <input type="text" placeholder="Last Name" className="p-3 border border-gray-300 rounded-lg" defaultValue="Smith" />
              <input type="date" className="p-3 border border-gray-300 rounded-lg" defaultValue="1985-06-15" />
              <select className="p-3 border border-gray-300 rounded-lg" defaultValue="male">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <h4 className="font-medium text-gray-900 mt-6">Coverage Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <select className="p-3 border border-gray-300 rounded-lg" defaultValue="term">
                <option value="term">Term Life</option>
                <option value="whole">Whole Life</option>
                <option value="universal">Universal Life</option>
              </select>
              <input type="number" placeholder="Coverage Amount" className="p-3 border border-gray-300 rounded-lg" defaultValue="500000" />
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Generate Instant Quote
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Instant Quote Results</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Coverage Amount:</span>
                <span className="font-semibold">$500,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Premium:</span>
                <span className="font-semibold text-green-600">$45.67</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annual Premium:</span>
                <span className="font-semibold">$548.04</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate Class:</span>
                <span className="font-semibold text-blue-600">Super Preferred</span>
              </div>
              <div className="border-t pt-3 mt-4">
                <p className="text-sm text-gray-600">Quote valid for 30 days</p>
                <p className="text-xs text-gray-500 mt-1">Final rates subject to underwriting approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUnderwritingModule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Intelligent Underwriting Workbench</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Cases in Queue</p>
                <p className="text-3xl font-bold">234</p>
                <p className="text-blue-100 text-sm">+12 from yesterday</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-green-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Auto-Approved</p>
                <p className="text-3xl font-bold">67%</p>
                <p className="text-green-100 text-sm">+5% this month</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-orange-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Avg Process Time</p>
                <p className="text-3xl font-bold">1.8 days</p>
                <p className="text-orange-100 text-sm">-0.5 days improved</p>
              </div>
              <Zap className="h-8 w-8 text-orange-200" />
            </div>
          </div>
          
          <div className="bg-purple-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Quality Score</p>
                <p className="text-3xl font-bold">96.2%</p>
                <p className="text-purple-100 text-sm">Audit compliance</p>
              </div>
              <Award className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClaimsModule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Advanced Claims Processing Center</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Active Claims</p>
                <p className="text-3xl font-bold">123</p>
                <p className="text-blue-100 text-sm">$14.2M total value</p>
              </div>
              <FileText className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-green-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Avg Processing</p>
                <p className="text-3xl font-bold">3.2 days</p>
                <p className="text-green-100 text-sm">-40% improvement</p>
              </div>
              <Clock className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-purple-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Satisfaction</p>
                <p className="text-3xl font-bold">98.5%</p>
                <p className="text-purple-100 text-sm">Customer rating</p>
              </div>
              <Star className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-orange-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Fraud Detected</p>
                <p className="text-3xl font-bold">2.1%</p>
                <p className="text-orange-100 text-sm">$430K prevented</p>
              </div>
              <Shield className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKYCModule = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Intelligent KYC Validation Center</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Verifications Today</p>
                <p className="text-3xl font-bold">1,247</p>
                <p className="text-green-100 text-sm">100% success rate</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-blue-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Risk Score Avg</p>
                <p className="text-3xl font-bold">92.4</p>
                <p className="text-blue-100 text-sm">Low risk customers</p>
              </div>
              <Shield className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-purple-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">AI Accuracy</p>
                <p className="text-3xl font-bold">98.7%</p>
                <p className="text-purple-100 text-sm">Document verification</p>
              </div>
              <Brain className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-orange-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Compliance Rate</p>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-orange-100 text-sm">Regulatory adherence</p>
              </div>
              <Award className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeModule) {
      case 'quotes':
        return renderQuoteModule();
      case 'underwriting':
        return renderUnderwritingModule();
      case 'claims':
        return renderClaimsModule();
      case 'kyc':
        return renderKYCModule();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Claims to Quotes</h1>
                <p className="text-sm text-gray-600">Life Insurance Platform</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setActiveModule('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeModule === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveModule('quotes')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeModule === 'quotes' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Quotes
            </button>
            <button 
              onClick={() => setActiveModule('underwriting')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeModule === 'underwriting' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Underwriting
            </button>
            <button 
              onClick={() => setActiveModule('claims')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeModule === 'claims' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Claims
            </button>
            <button 
              onClick={() => setActiveModule('kyc')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeModule === 'kyc' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              KYC Intelligence
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default C2QDashboard;