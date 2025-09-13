import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { candidateAPI } from "../../services/api";
import {
  Vote,
  Users,
  CheckCircle,
  Clock,
  Trophy,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await candidateAPI.getAll();
      setCandidates(response.data.sort((a, b) => b.voteCount - a.voteCount));
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.voteCount,
    0
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Your voting dashboard - track candidates and cast your vote
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Voting Status */}
        <div
          className={`rounded-lg shadow-md p-6 border-l-4 ${
            user?.isVoted
              ? "bg-green-50 border-green-500"
              : "bg-yellow-50 border-yellow-500"
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user?.isVoted ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <Clock className="h-8 w-8 text-yellow-600" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Voting Status</p>
              <p
                className={`text-2xl font-semibold ${
                  user?.isVoted ? "text-green-900" : "text-yellow-900"
                }`}
              >
                {user?.isVoted ? "Voted" : "Not Voted"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.isVoted ? "Thank you for voting!" : "Cast your vote now"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Candidates */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Candidates
              </p>
              <p className="text-2xl font-semibold text-blue-900">
                {candidates.length}
              </p>
              <p className="text-xs text-gray-500">Running for election</p>
            </div>
          </div>
        </div>

        {/* Total Votes */}
        <div className="bg-purple-50 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Votes</p>
              <p className="text-2xl font-semibold text-purple-900">
                {totalVotes}
              </p>
              <p className="text-xs text-gray-500">Votes cast so far</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Voting Action */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>

          {!user?.isVoted ? (
            <Link
              to="/vote"
              className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
            >
              <div className="flex items-center">
                <Vote className="h-6 w-6 mr-3" />
                <div>
                  <p className="font-medium">Cast Your Vote</p>
                  <p className="text-sm text-indigo-100">
                    Choose your preferred candidate
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <div className="flex items-center p-4 bg-green-100 text-green-800 rounded-lg">
              <CheckCircle className="h-6 w-6 mr-3" />
              <div>
                <p className="font-medium">Vote Submitted</p>
                <p className="text-sm text-green-600">
                  Thank you for participating!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium text-gray-900">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Age:</span>
              <span className="font-medium text-gray-900">{user?.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Role:</span>
              <span className="font-medium text-gray-900 capitalize">
                {user?.role}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Voting Status:</span>
              <span
                className={`font-medium ${
                  user?.isVoted ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {user?.isVoted ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
          <Link
            to="/profile"
            className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View Full Profile <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Candidates Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Current Standings
          </h2>
          <Link
            to="/vote"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            View All Candidates
          </Link>
        </div>

        {candidates.length > 0 ? (
          <div className="space-y-4">
            {candidates.slice(0, 5).map((candidate, index) => (
              <div
                key={candidate._id}
                className="flex items-center p-4 bg-gray-50 rounded-lg"
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 text-sm font-medium ${
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
                  <p className="font-medium text-gray-900">{candidate.name}</p>
                  <p className="text-sm text-gray-600">{candidate.party}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {candidate.voteCount}
                  </p>
                  <p className="text-xs text-gray-500">votes</p>
                </div>

                <div className="ml-4 w-20">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          totalVotes > 0
                            ? (candidate.voteCount / totalVotes) * 100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No candidates available
            </h3>
            <p className="text-gray-600">
              Candidates will appear here once they are added by the admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
