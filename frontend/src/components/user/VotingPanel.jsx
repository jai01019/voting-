import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import { candidateAPI } from "../../services/api";
import { Vote, Users, CheckCircle, AlertCircle, Clock } from "lucide-react";

const VotingPanel = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ✅ only once
  const { user, setUser } = useAuth();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await candidateAPI.getAll();
      setCandidates(response.data);
    } catch (error) {
      showMessage("Failed to load candidates", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleVote = async (candidateId) => {
    if (user?.isVoted) {
      showMessage("You have already voted!", "error");
      return;
    }

    setVoting(true);
    try {
      await candidateAPI.vote(candidateId);

      // ✅ immediately update context user
      setUser({ ...user, isVoted: true });

      showMessage("Vote cast successfully!", "success");
      fetchCandidates();
    } catch (error) {
      showMessage(
        error.response?.data?.error || "Failed to cast vote",
        "error"
      );
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cast Your Vote
        </h1>
        <p className="text-gray-600">
          Select your preferred candidate below. You can only vote once.
        </p>
      </div>

      {/* Voting Status */}
      <div
        className={`mb-6 p-4 rounded-lg ${
          user?.isVoted
            ? "bg-green-100 border border-green-200"
            : "bg-blue-100 border border-blue-200"
        }`}
      >
        <div className="flex items-center">
          {user?.isVoted ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800">You have already voted</span>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800">You haven't voted yet</span>
            </>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center ${
            messageType === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {messageType === "success" ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          {message}
        </div>
      )}

      {/* Candidates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow"
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {candidate.name}
              </h3>
              <p className="text-gray-600">{candidate.party}</p>
              <p className="text-sm text-gray-500">Age: {candidate.age}</p>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Votes</span>
                <span>{candidate.voteCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      candidates.length > 0
                        ? (candidate.voteCount /
                            Math.max(
                              ...candidates.map((c) => c.voteCount),
                              1
                            )) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => handleVote(candidate._id)}
              disabled={user?.isVoted || voting}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                user?.isVoted
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              }`}
            >
              {voting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Vote className="h-4 w-4 mr-2" />
              )}
              {user?.isVoted ? "Already Voted" : "Vote"}
            </button>
          </div>
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No candidates available
          </h3>
          <p className="text-gray-600">
            Check back later when candidates are added.
          </p>
        </div>
      )}
    </div>
  );
};

export default VotingPanel;
