import React, { useState, useMemo } from "react";

function AdminDashboard() {
  // Filter and sort states
  const [filterMember, setFilterMember] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
//   const [filterAmountMin, setFilterAmountMin] = useState("");
//   const [filterAmountMax, setFilterAmountMax] = useState("");
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);

  // Active menu state
  const [activeMenu, setActiveMenu] = useState("transactions");

  // Form states
  const [formData, setFormData] = useState({
    memberName: "",
    amount: "",
    type: "deposit",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  // Dummy members data
  const dummyMembers = useMemo(() => [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", joinDate: "2024-01-15", status: "active" },
    { id: 2, name: "Michael Chen", email: "m.chen@email.com", joinDate: "2024-02-20", status: "active" },
    { id: 3, name: "Aisha Patel", email: "aisha.p@email.com", joinDate: "2024-03-10", status: "active" },
    { id: 4, name: "David Okafor", email: "d.okafor@email.com", joinDate: "2024-01-25", status: "active" },
    { id: 5, name: "Emma Wilson", email: "emma.w@email.com", joinDate: "2024-04-05", status: "active" },
    { id: 6, name: "John Doe", email: "john.doe@email.com", joinDate: "2024-05-15", status: "active" },
    { id: 7, name: "Jane Smith", email: "jane.smith@email.com", joinDate: "2024-06-20", status: "active" },
    { id: 8, name: "Robert Lee", email: "robert.lee@email.com", joinDate: "2024-07-10", status: "active" },
    { id: 9, name: "Emily Davis", email: "emily.d@email.com", joinDate: "2024-08-25", status: "active" },
    { id: 10, name: "William Brown", email: "william.b@email.com", joinDate: "2024-09-05", status: "active" },
    { id: 11, name: "Olivia Martinez", email: "olivia.m@email.com", joinDate: "2024-10-15", status: "active" },
    { id: 12, name: "James Rodriguez", email: "james.r@email.com", joinDate: "2024-11-20", status: "active" },
    { id: 13, name: "Sophia Lee", email: "sophia.l@email.com", joinDate: "2024-12-10", status: "active" },
    { id: 14, name: "Daniel Kim", email: "daniel.k@email.com", joinDate: "2025-01-25", status: "active" },
    { id: 15, name: "Isabella Garcia", email: "isabella.g@email.com", joinDate: "2025-02-05", status: "active" },
    { id: 16, name: "Lucas Martinez", email: "lucas.m@email.com", joinDate: "2025-03-15", status: "active" },
    { id: 17, name: "Ava Rodriguez", email: "ava.r@email.com", joinDate: "2025-04-20", status: "active" },
    { id: 18, name: "Ethan Davis", email: "ethan.d@email.com", joinDate: "2025-05-10", status: "active" },
    { id: 19, name: "Mia Garcia", email: "mia.g@email.com", joinDate: "2025-06-25", status: "active" },
    { id: 20, name: "Noah Brown", email: "noah.b@email.com", joinDate: "2025-07-05", status: "active" },
    { id: 21, name: "Liam Martinez", email: "liam.m@email.com", joinDate: "2025-08-15", status: "active" },
    { id: 22, name: "Ava Rodriguez", email: "ava.r@email.com", joinDate: "2025-09-20", status: "active" },
    { id: 23, name: "Ethan Davis", email: "ethan.d@email.com", joinDate: "2025-10-10", status: "active" },
    { id: 24, name: "Mia Garcia", email: "mia.g@email.com", joinDate: "2025-11-25", status: "active" },
    { id: 25, name: "Noah Brown", email: "noah.b@email.com", joinDate: "2025-12-05", status: "active" },
    { id: 26, name: "Liam Martinez", email: "liam.m@email.com", joinDate: "2025-08-15", status: "active" },
    { id: 27, name: "Ava Rodriguez", email: "ava.r@email.com", joinDate: "2025-09-20", status: "active" },
    { id: 28, name: "Ethan Davis", email: "ethan.d@email.com", joinDate: "2025-10-10", status: "active" },
    { id: 29, name: "Mia Garcia", email: "mia.g@email.com", joinDate: "2025-11-25", status: "active" },
    { id: 30, name: "Noah Brown", email: "noah.b@email.com", joinDate: "2025-12-05", status: "active" },
    { id: 31, name: "Liam Martinez", email: "liam.m@email.com", joinDate: "2025-08-15", status: "active" },
    { id: 32, name: "Ava Rodriguez", email: "ava.r@email.com", joinDate: "2025-09-20", status: "active" },
    { id: 33, name: "Ethan Davis", email: "ethan.d@email.com", joinDate: "2025-10-10", status: "active" },
    { id: 34, name: "Mia Garcia", email: "mia.g@email.com", joinDate: "2025-11-25", status: "active" },
    { id: 35, name: "Noah Brown", email: "noah.b@email.com", joinDate: "2025-12-05", status: "active" },
    { id: 36, name: "Liam Martinez", email: "liam.m@email.com", joinDate: "2025-08-15", status: "active" },
    { id: 37, name: "Ava Rodriguez", email: "ava.r@email.com", joinDate: "2025-09-20", status: "active" },

  ], []);

  // Dummy transactions data
  const dummyTransactions = useMemo(() => [
          {
        id: 1,
        memberName: "Sarah Johnson",
        date: "2025-01-15",
        type: "deposit",
        amount: 500000,
        description: "Monthly contribution",
        balance: 1500000
      },
      {
        id: 2,
        memberName: "Michael Chen",
        date: "2025-01-15",
        type: "deposit",
        amount: 750000,
        description: "Monthly contribution",
        balance: 2250000
      },
      {
        id: 3,
        memberName: "Aisha Patel",
        date: "2025-01-14",
        type: "withdrawal",
        amount: 300000,
        description: "Emergency fund",
        balance: 1200000
      },
      {
        id: 4,
        memberName: "David Okafor",
        date: "2025-01-14",
        type: "deposit",
        amount: 600000,
        description: "Monthly contribution",
        balance: 1800000
      },
      {
        id: 5,
        memberName: "Emma Wilson",
        date: "2025-01-13",
        type: "deposit",
        amount: 450000,
        description: "Monthly contribution",
        balance: 1350000
      },
      {
        id: 6,
        memberName: "John Doe",
        date: "2025-01-12",
        type: "withdrawal",
        amount: 200000,
        description: "Emergency fund",
        balance: 1150000
      },
      {
        id: 7,
        memberName: "Jane Smith",
        date: "2025-01-11",
        type: "deposit",
        amount: 350000,
        description: "Monthly contribution",
        balance: 1500000
      },
      {
        id: 8,
        memberName: "Robert Lee",
        date: "2025-01-10",
        type: "withdrawal",
        amount: 150000,
        description: "Emergency fund",
        balance: 1350000
      },
      {
        id: 9,
        memberName: "Emily Davis",
        date: "2025-01-09",
        type: "deposit",
        amount: 250000,
        description: "Monthly contribution",
        balance: 1600000
      },
      {
        id: 10,
        memberName: "William Brown",
        date: "2025-01-08",
        type: "withdrawal",
        amount: 100000,
        description: "Emergency fund",
        balance: 1500000
      },
      {
        id: 11,
        memberName: "Olivia Martinez",
        date: "2025-01-07",
        type: "deposit",
        amount: 150000,
        description: "Monthly contribution",
        balance: 1650000
      },
      {
        id: 12,
        memberName: "James Rodriguez",
        date: "2025-01-06",
        type: "withdrawal",
        amount: 100000,
        description: "Emergency fund",
        balance: 1550000
      },    
      {
        id: 13,
        memberName: "Sophia Lee",
        date: "2025-01-05",
        type: "deposit",
        amount: 150000,
        description: "Monthly contribution",
        balance: 1700000
      },
    ], []);

  // Dashboard stats
  const dashboardStats = useMemo(() => {
    const deposits = dummyTransactions.filter(t => t.type === 'deposit');
    const withdrawals = dummyTransactions.filter(t => t.type === 'withdrawal');
    const activeMembers = dummyMembers.filter(m => m.status === 'active');
    
    const totalDeposits = deposits.reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalDeposits - totalWithdrawals;
    
    return {
      totalDeposits,
      totalWithdrawals,
      netBalance,
      memberCount: activeMembers.length
    };
  }, [dummyMembers, dummyTransactions]);

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...dummyTransactions];

    if (filterMember) {
      filtered = filtered.filter(t => t.memberName.toLowerCase().includes(filterMember.toLowerCase()));
    }
    if (filterType) {
      filtered = filtered.filter(t => t.type === filterType);
    }
    if (filterDateFrom) {
      filtered = filtered.filter(t => t.date >= filterDateFrom);
    }
    if (filterDateTo) {
      filtered = filtered.filter(t => t.date <= filterDateTo);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [filterMember, filterType, filterDateFrom, filterDateTo, dummyTransactions]);

  // Helper functions
  const clearFilters = () => {
    setFilterMember("");
    setFilterType("");
    setFilterDateFrom("");
    setFilterDateTo("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', formData);
    alert('Transaction recorded successfully! (Demo mode)');
    
    // Reset form
    setFormData({
      memberName: "",
      amount: "",
      type: "deposit",
      description: "",
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  // Render different content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "transactions":
        return (
          <div className="space-y-6">
            {/* Transaction Entry Form */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Record New Transaction</h2>
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Name</label>
                  <select
                    name="memberName"
                    value={formData.memberName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Member</option>
                    {dummyMembers.filter(m => m.status === 'active').map(member => (
                      <option key={member.id} value={member.name}>{member.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Transaction description"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Record Transaction
                  </button>
                </div>
              </form>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">All Transactions</h2>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={filterMember}
                      onChange={(e) => setFilterMember(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Member Name"
                    />

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

                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.memberName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.type === 'deposit' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
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
            </div>
          </div>
        );

      case "members":
        return (
          <div className="bg-white rounded-xl w-[100vw] shadow space-y-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Members Management</h2>
              <p className="text-gray-600 mt-1">Manage cooperative members and their accounts</p>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Members Management</h3>
                <p className="mt-1 text-sm text-gray-500">This section will include member management features.</p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Add New Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="bg-white rounded-xl shadow w-[100vw]">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Reports & Analytics</h2>
              <p className="text-gray-600 mt-1">Generate financial reports and view analytics</p>
            </div>
            <div className="p-6">
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Reports & Analytics</h3>
                <p className="mt-1 text-sm text-gray-500">This section will include financial reports and analytics.</p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-auto">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Guaranta</span>
              </div>
              <button
                onClick={() => window.location.href = '/'}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Admin Dashboard</p>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveMenu("transactions")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeMenu === "transactions"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000-16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092c.938-.177 1.791-.604 2.353-1.253a1 1 0 10-1.51-1.31c.163.187.452.377.843.504v-1.941a4.535 4.535 0 00-1.676-.662C9.398 10.235 9 9.49 9 8c0-.99.398-1.765 1.324-2.246A4.535 4.535 0 0011 5.092V4z" clipRule="evenodd" />
                  </svg>
                  Transactions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenu("members")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeMenu === "members"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Members
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenu("reports")}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeMenu === "reports"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Reports
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your cooperative's financial operations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Deposits</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardStats.totalDeposits)}
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
                  <p className="text-sm font-medium text-gray-600">Total Withdrawals</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(dashboardStats.totalWithdrawals)}
                  </p>
                </div>
              </div>
            </div>

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
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardStats.memberCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
