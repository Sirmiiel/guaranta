import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function MemberProfile() {
  // Mock user data - in a real app this would come from props or context
  const [user] = useState({
    name: "Miss. Baraka",
    email: "baraka@example.com",
    phone: "+234 801 234 5678",
    memberId: "MEM-001",
    joinDate: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const [transactions] = useState([
    { id: 1, date: "2025-01-15", type: "deposit", amount: 5000, description: "Monthly contribution" },
    { id: 2, date: "2025-01-10", type: "deposit", amount: 3000, description: "Additional savings" },
    { id: 3, date: "2025-01-05", type: "withdrawal", amount: 2000, description: "Emergency fund" },
    { id: 4, date: "2024-12-20", type: "deposit", amount: 4000, description: "Monthly contribution" },
    { id: 5, date: "2024-12-15", type: "deposit", amount: 2500, description: "Additional savings" },
    { id: 6, date: "2024-12-10", type: "withdrawal", amount: 1500, description: "Personal expense" },
  ]);

  const [creditScoreHistory] = useState([
    { month: "Jan 2025", score: 75, change: "+5" },
    { month: "Dec 2024", score: 70, change: "+10" },
    { month: "Nov 2024", score: 60, change: "+5" },
    { month: "Oct 2024", score: 55, change: "+5" },
    { month: "Sep 2024", score: 50, change: "0" },
  ]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalDeposits = transactions.filter(t => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = transactions.filter(t => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalDeposits - totalWithdrawals;
    const currentScore = creditScoreHistory[0]?.score || 50;
    
    return { totalDeposits, totalWithdrawals, netBalance, currentScore };
  }, [transactions, creditScoreHistory]);

  function getCreditScoreColor(score) {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  }

  function getCreditScoreLabel(score) {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Link
              to="/member"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Member Profile</h1>
          </div>
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

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                {/* Lottie Animation Profile Picture */}
                <div className="w-full h-full rounded-full overflow-hidden">
                  <DotLottieReact 
                    src="https://lottie.host/cccdeae7-ae67-4d0d-a851-8e00fa337df3/AcGlO6oSNx.lottie"
                    loop
                    autoplay
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Optional: Fallback static image overlay for better accessibility */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-sm text-gray-600 mb-4">Member ID: {user.memberId}</p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm text-gray-700">{user.phone}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Credit Score */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Deposits</p>
                <p className="text-2xl font-bold text-green-600">₦{stats.totalDeposits.toLocaleString()}</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Withdrawals</p>
                <p className="text-2xl font-bold text-red-600">₦{stats.totalWithdrawals.toLocaleString()}</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-1">Net Balance</p>
                <p className={`text-2xl font-bold ${stats.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₦{stats.netBalance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Credit Score Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Credit Score</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getCreditScoreColor(stats.currentScore).replace('text-', 'bg-').replace('-600', '-100')
                } ${getCreditScoreColor(stats.currentScore)}`}>
                  {getCreditScoreLabel(stats.currentScore)}
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className={`text-5xl font-extrabold mb-2 ${getCreditScoreColor(stats.currentScore)}`}>
                  {stats.currentScore}
                </div>
                <p className="text-sm text-gray-600">Current Score</p>
              </div>

              {/* Credit Score History Chart */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Score History (Last 5 Months)</h4>
                <div className="space-y-2">
                  {creditScoreHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">{record.month}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{record.score}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          record.change.startsWith('+') 
                            ? 'bg-green-100 text-green-700' 
                            : record.change === '0'
                            ? 'bg-gray-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {record.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded-2xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-left text-sm text-gray-600">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {transactions.slice(0, 6).map(tx => (
                  <tr key={tx.id} className="text-sm hover:bg-gray-50">
                    <td className="px-6 py-3">{tx.date}</td>
                    <td className="px-6 py-3">{tx.description}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tx.type === "deposit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className={`px-6 py-3 font-medium ${
                      tx.type === "deposit" ? "text-green-600" : "text-red-600"
                    }`}>
                      {tx.type === "deposit" ? "+" : "-"}₦{tx.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t bg-gray-50">
            <Link
              to="/member"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all transactions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
