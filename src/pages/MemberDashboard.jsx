import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

function MemberDashboard() {
  // Filter and sort states
  const [filterType, setFilterType] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterAmountMin, setFilterAmountMin] = useState("");
  const [filterAmountMax, setFilterAmountMax] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);

  // Dummy transaction data
  const dummyTransactions = useMemo(() => [
    {
      id: 1,
      date: "2025-01-15",
      type: "deposit",
      amount: 50000,
      description: "Monthly contribution",
      balance: 150000
    },
    {
      id: 2,
      date: "2025-01-10",
      type: "withdrawal",
      amount: 25000,
      description: "Emergency fund",
      balance: 100000
    },
    {
      id: 3,
      date: "2025-01-05",
      type: "deposit",
      amount: 75000,
      description: "Bonus contribution",
      balance: 125000
    },
    {
      id: 4,
      date: "2024-12-28",
      type: "deposit",
      amount: 50000,
      description: "Monthly contribution",
      balance: 50000
    },
    {
      id: 5,
      date: "2024-12-20",
      type: "withdrawal",
      amount: 30000,
      description: "Home improvement",
      balance: 0
    },
    {
      id: 6,
      date: "2024-12-15",
      type: "deposit",
      amount: 50000,
      description: "Monthly contribution",
      balance: 30000
    },
    {
      id: 7,
      date: "2024-12-08",
      type: "deposit",
      amount: 25000,
      description: "Extra savings",
      balance: -20000
    },
          {
        id: 8,
        date: "2024-12-01",
        type: "deposit",
        amount: 50000,
        description: "Monthly contribution",
        balance: -45000
      }
    ], []);

  // Calculate credit score based on transaction history
  const creditScore = useMemo(() => {
    let score = 50; // Base score
    
    // Check for no missed deposits in last 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const recentTransactions = dummyTransactions.filter(t => new Date(t.date) >= threeMonthsAgo);
    const monthlyDeposits = recentTransactions.filter(t => t.type === 'deposit' && t.description.includes('Monthly'));
    
    if (monthlyDeposits.length >= 3) {
      score += 10; // No missed deposits for 3 months
    }
    
    // Bonus for regular deposits
    if (monthlyDeposits.length >= 6) {
      score += 5; // Consistent monthly deposits
    }
    
    // Bonus for positive balance
    const currentBalance = dummyTransactions[0]?.balance || 0;
    if (currentBalance > 0) {
      score += 5; // Positive balance
    }
    
    // Bonus for larger deposits
    const avgDeposit = dummyTransactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0) / dummyTransactions.filter(t => t.type === 'deposit').length;
    
    if (avgDeposit > 40000) {
      score += 5; // Above average deposits
    }
    
    return Math.min(100, Math.max(0, score));
  }, [dummyTransactions]);

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...dummyTransactions];

    // Apply filters
    if (filterType) {
      filtered = filtered.filter(t => t.type === filterType);
    }
    if (filterDateFrom) {
      filtered = filtered.filter(t => t.date >= filterDateFrom);
    }
    if (filterDateTo) {
      filtered = filtered.filter(t => t.date <= filterDateTo);
    }
    if (filterAmountMin) {
      filtered = filtered.filter(t => t.amount >= parseInt(filterAmountMin));
    }
    if (filterAmountMax) {
      filtered = filtered.filter(t => t.amount <= parseInt(filterAmountMax));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [filterType, filterDateFrom, filterDateTo, filterAmountMin, filterAmountMax, sortBy, sortOrder, dummyTransactions]);

  // Dashboard stats
  const dashboardStats = useMemo(() => {
    const deposits = dummyTransactions.filter(t => t.type === 'deposit');
    const withdrawals = dummyTransactions.filter(t => t.type === 'withdrawal');
    
    return {
      netBalance: dummyTransactions[0]?.balance || 0,
      avgDeposit: deposits.length > 0 ? deposits.reduce((sum, t) => sum + t.amount, 0) / deposits.length : 0,
      avgWithdrawal: withdrawals.length > 0 ? withdrawals.reduce((sum, t) => sum + t.amount, 0) / withdrawals.length : 0,
      thisMonthCount: dummyTransactions.filter(t => {
        const transactionDate = new Date(t.date);
        const now = new Date();
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
      }).length
    };
  }, [dummyTransactions]);

  // Helper functions
  const clearFilters = () => {
    setFilterType("");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterAmountMin("");
    setFilterAmountMax("");
  };

  const getCreditScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getCreditScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const getCreditScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    if (score >= 40) return "bg-orange-100";
    return "bg-red-100";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
              <Link
                to="/profile"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                View Profile
              </Link>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000-16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092c.938-.177 1.791-.604 2.353-1.253a1 1 0 10-1.51-1.31c.163.187.452.377.843.504v-1.941a4.535 4.535 0 00-1.676-.662C9.398 10.235 9 9.49 9 8c0-.99.398-1.765 1.324-2.246A4.535 4.535 0 0011 5.092V4z" clipRule="evenodd" />
                </svg>
                Request Loan
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium bg-white hover:bg-red-50"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000-16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092c.938-.177 1.791-.604 2.353-1.253a1 1 0 10-1.51-1.31c.163.187.452.377.843.504v-1.941a4.535 4.535 0 00-1.676-.662C9.398 10.235 9 9.49 9 8c0-.99.398-1.765 1.324-2.246A4.535 4.535 0 0011 5.092V4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                <p className={`text-2xl font-bold ${dashboardStats.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(dashboardStats.netBalance)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000-16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Deposit</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats.avgDeposit)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 00-1-1H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Withdrawal</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(dashboardStats.avgWithdrawal)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardStats.thisMonthCount} transactions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Score Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Credit Score</h2>
              <p className="text-gray-600 mb-4">Your financial credibility score based on contribution history</p>
              
              <div className="flex items-center gap-4">
                <div className={`text-4xl font-bold ${getCreditScoreColor(creditScore)}`}>
                  {creditScore}
                </div>
                <div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCreditScoreBgColor(creditScore)} ${getCreditScoreColor(creditScore)}`}>
                    {getCreditScoreLabel(creditScore)}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Score Range: 0-100</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-64">
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    creditScore >= 80 ? 'bg-green-500' : 
                    creditScore >= 60 ? 'bg-yellow-500' : 
                    creditScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${creditScore}%` }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Current: {creditScore}/100
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Transactions */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Transaction History</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="deposit">Deposits</option>
                  <option value="withdrawal">Withdrawals</option>
                </select>

                <input
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="From Date"
                />

                <input
                  type="date"
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="To Date"
                />

                <input
                  type="number"
                  value={filterAmountMin}
                  onChange={(e) => setFilterAmountMin(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Min Amount"
                />

                <input
                  type="number"
                  value={filterAmountMax}
                  onChange={(e) => setFilterAmountMax(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Max Amount"
                />

                <button
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="type">Type</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Order:</span>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Ascending
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Descending
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Deposit
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 00-1-1H3z" clipRule="evenodd" />
                            </svg>
                            Withdrawal
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={transaction.balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {formatCurrency(transaction.balance)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredAndSortedTransactions.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;


