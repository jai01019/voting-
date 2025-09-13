import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { candidateAPI, userAPI } from "../../services/api";
import {
  Users,
  Vote,
  Trophy,
  UserCheck,
  BarChart3,
  Settings,
  Eye,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalVotes: 0,
    votingPercentage: 0,
  });
  const [topCandidates, setTopCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersResponse, candidatesResponse] = await Promise.all([
        userAPI.getAll(),
        candidateAPI.getResults(),
      ]);

      const users = usersResponse.data;
      const candidates = candidatesResponse.data;

      const totalVotes = candidates.reduce(
        (sum, candidate) => sum + candidate.voteCount,
        0
      );
      const votedUsers = users.filter((user) => user.isVoted).length;

      setStats({
        totalUsers: users.length,
        totalCandidates: candidates.length,
        totalVotes,
        votingPercentage:
          users.length > 0 ? Math.round((votedUsers / users.length) * 100) : 0,
      });

      setTopCandidates(candidates.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div
      className="bg-white rounded-lg shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-8 w-8`} style={{ color }} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of voting system statistics and management
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          color="#3B82F6"
          subtitle="Registered voters"
        />
        <StatCard
          icon={Vote}
          title="Total Candidates"
          value={stats.totalCandidates}
          color="#10B981"
          subtitle="Running for election"
        />
        <StatCard
          icon={Trophy}
          title="Total Votes"
          value={stats.totalVotes}
          color="#F59E0B"
          subtitle="Votes cast"
        />
        <StatCard
          icon={UserCheck}
          title="Voting Percentage"
          value={`${stats.votingPercentage}%`}
          color="#8B5CF6"
          subtitle="User participation"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <Link
              to="/admin/users"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-blue-900">Manage Users</p>
                <p className="text-sm text-blue-600">
                  View and manage registered users
                </p>
              </div>
            </Link>
            <Link
              to="/admin/candidates"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Settings className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-green-900">Manage Candidates</p>
                <p className="text-sm text-green-600">
                  Add, edit, or remove candidates
                </p>
              </div>
            </Link>
            <Link
              to="/admin/results"
              className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-purple-900">View Results</p>
                <p className="text-sm text-purple-600">
                  Real-time voting results
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Top Candidates */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Top Candidates
          </h2>
          {topCandidates.length > 0 ? (
            <div className="space-y-3">
              {topCandidates.map((candidate, index) => (
                <div
                  key={candidate._id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : index === 1
                        ? "bg-gray-100 text-gray-800"
                        : index === 2
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">
                      {candidate.name}
                    </p>
                    <p className="text-sm text-gray-600">{candidate.party}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {candidate.voteCount}
                    </p>
                    <p className="text-xs text-gray-500">votes</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Vote className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No voting data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
          <Eye className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
            <p className="text-sm font-medium text-green-800">System Online</p>
            <p className="text-xs text-green-600">All services running</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
            <p className="text-sm font-medium text-blue-800">
              Database Connected
            </p>
            <p className="text-xs text-blue-600">MongoDB active</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
            <p className="text-sm font-medium text-yellow-800">Voting Active</p>
            <p className="text-xs text-yellow-600">Users can vote</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
