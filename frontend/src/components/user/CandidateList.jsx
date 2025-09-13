import React, { useState, useEffect } from "react";
import { candidateAPI } from "../../services/api";
import { Users, Trophy, Search, Filter } from "lucide-react";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("votes"); // votes, name, party

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    filterAndSortCandidates();
  }, [candidates, searchTerm, sortBy]);

  const fetchCandidates = async () => {
    try {
      const response = await candidateAPI.getAll();
      setCandidates(response.data);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCandidates = () => {
    let filtered = candidates;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.party.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "votes":
          return b.voteCount - a.voteCount;
        case "name":
          return a.name.localeCompare(b.name);
        case "party":
          return a.party.localeCompare(b.party);
        default:
          return 0;
      }
    });

    setFilteredCandidates(filtered);
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          All Candidates
        </h1>
        <p className="text-gray-600">
          View all candidates participating in the election
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Candidates
              </p>
              <p className="text-2xl font-semibold text-blue-900">
                {candidates.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Votes</p>
              <p className="text-2xl font-semibold text-green-900">
                {totalVotes}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-600 mr-4" />
            <div>
              <p className="text-sm font-medium text-gray-600">
                Leading Candidate
              </p>
              <p className="text-lg font-semibold text-yellow-900">
                {candidates.length > 0
                  ? candidates.sort((a, b) => b.voteCount - a.voteCount)[0].name
                  : "None"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate name or party..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="votes">Sort by Votes (High to Low)</option>
              <option value="name">Sort by Name (A-Z)</option>
              <option value="party">Sort by Party (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCandidates.map((candidate, index) => {
          const percentage =
            totalVotes > 0 ? (candidate.voteCount / totalVotes) * 100 : 0;
          const isLeading = index === 0 && sortBy === "votes";

          return (
            <div
              key={candidate._id}
              className={`bg-white rounded-lg shadow-md p-6 border-2 transition-all duration-200 hover:shadow-lg ${
                isLeading
                  ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-white"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              {/* Ranking Badge */}
              {sortBy === "votes" && (
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : index === 1
                        ? "bg-gray-100 text-gray-800"
                        : index === 2
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    Rank #{index + 1}
                  </div>
                  {isLeading && <Trophy className="h-5 w-5 text-yellow-600" />}
                </div>
              )}

              {/* Candidate Info */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {candidate.name}
                </h3>
                <p className="text-gray-600 font-medium">{candidate.party}</p>
                <p className="text-sm text-gray-500">Age: {candidate.age}</p>
              </div>

              {/* Vote Statistics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Votes Received
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {candidate.voteCount}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Vote Share
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">
                    {percentage.toFixed(1)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isLeading ? "bg-yellow-500" : "bg-indigo-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Additional Stats */}
                {totalVotes > 0 && (
                  <div className="pt-2 text-center">
                    <p className="text-xs text-gray-500">
                      {candidate.voteCount} out of {totalVotes} total votes
                    </p>
                  </div>
                )}
              </div>

              {/* Leading Indicator */}
              {isLeading && candidate.voteCount > 0 && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Trophy className="h-3 w-3 mr-1" />
                    Currently Leading
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No candidates found
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No candidates have been added yet"}
          </p>
        </div>
      )}

      {/* Summary Footer */}
      {filteredCandidates.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Election Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">
                  {candidates.length}
                </span>{" "}
                candidates participating
              </div>
              <div>
                <span className="font-medium text-gray-900">{totalVotes}</span>{" "}
                votes cast so far
              </div>
              <div>
                <span className="font-medium text-gray-900">
                  {candidates.length > 0
                    ? candidates.filter((c) => c.voteCount > 0).length
                    : 0}
                </span>{" "}
                candidates have received votes
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
