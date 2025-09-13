// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";
// import { Vote, User, Lock, AlertCircle } from "lucide-react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     aadharCardNumber: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { login, isAuthenticated, isAdmin } = useAuth();
//   const navigate = useNavigate();

//   // Redirect if already authenticated
//   React.useEffect(() => {
//     if (isAuthenticated) {
//       navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
//     }
//   }, [isAuthenticated, isAdmin, navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const result = await login(formData.aadharCardNumber, formData.password);

//     if (result.success) {
//       // Navigation will be handled by useEffect above
//     } else {
//       setError(result.error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
//       <div className="text-center">
//         <div className="flex justify-center">
//           <Vote className="h-12 w-12 text-indigo-600" />
//         </div>
//         <h2 className="mt-4 text-3xl font-bold text-gray-900">Voting System</h2>
//         <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
//       </div>

//       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//         {error && (
//           <div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
//             <AlertCircle className="h-5 w-5 mr-2" />
//             <span className="text-sm">{error}</span>
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label htmlFor="aadharCardNumber" className="sr-only">
//               Aadhar Card Number
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 id="aadharCardNumber"
//                 name="aadharCardNumber"
//                 type="number"
//                 required
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                 placeholder="Aadhar Card Number"
//                 value={formData.aadharCardNumber}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="sr-only">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? "Signing in..." : "Sign in"}
//         </button>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
///////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Vote, User, Lock, AlertCircle } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    aadharCardNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.aadharCardNumber, formData.password);

    if (result.success) {
      // Navigation will be handled by useEffect above
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <div className="flex justify-center">
          <Vote className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Voting System</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="aadharCardNumber" className="sr-only">
              Aadhar Card Number
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="aadharCardNumber"
                name="aadharCardNumber"
                type="number"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                placeholder="Aadhar Card Number"
                value={formData.aadharCardNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
