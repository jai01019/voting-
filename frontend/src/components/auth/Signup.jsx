// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";
// import {
//   Vote,
//   User,
//   Lock,
//   Mail,
//   Phone,
//   MapPin,
//   AlertCircle,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     mobile: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//     aadharCardNumber: "",
//     role: "voter",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { signup, isAuthenticated, isAdmin } = useAuth();
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

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError("Name is required");
//       return false;
//     }

//     if (!formData.age || formData.age < 18) {
//       setError("Age must be 18 or older");
//       return false;
//     }

//     if (!formData.address.trim()) {
//       setError("Address is required");
//       return false;
//     }

//     if (!formData.aadharCardNumber || formData.aadharCardNumber.length !== 12) {
//       setError("Aadhar card number must be 12 digits");
//       return false;
//     }

//     if (formData.password.length < 4) {
//       setError("Password must be at least 4 characters long");
//       return false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }

//     if (formData.email && !isValidEmail(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     if (formData.mobile && !isValidMobile(formData.mobile)) {
//       setError("Please enter a valid mobile number");
//       return false;
//     }

//     return true;
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const isValidMobile = (mobile) => {
//     const mobileRegex = /^[6-9]\d{9}$/;
//     return mobileRegex.test(mobile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setError("");

//     // Prepare data for submission
//     const submitData = {
//       ...formData,
//       age: parseInt(formData.age),
//       aadharCardNumber: parseInt(formData.aadharCardNumber),
//     };

//     // Remove confirmPassword before sending
//     delete submitData.confirmPassword;

//     const result = await signup(submitData);

//     if (result.success) {
//       // Navigation will be handled by useEffect above
//     } else {
//       setError(result.error);
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <Vote className="h-12 w-12 text-indigo-600" />
//           </div>
//           <h2 className="mt-4 text-3xl font-bold text-gray-900">
//             Create Account
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Register to participate in voting
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
//               <AlertCircle className="h-5 w-5 mr-2" />
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           <div className="space-y-4">
//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Age */}
//             <div>
//               <label
//                 htmlFor="age"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Age *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="age"
//                   name="age"
//                   type="number"
//                   required
//                   min="18"
//                   max="100"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter your age"
//                   value={formData.age}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </label>
//               <div className="relative mt-1">
//                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter your email (optional)"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Mobile */}
//             <div>
//               <label
//                 htmlFor="mobile"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Mobile Number
//               </label>
//               <div className="relative mt-1">
//                 <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="mobile"
//                   name="mobile"
//                   type="tel"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter mobile number (optional)"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label
//                 htmlFor="address"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Address *
//               </label>
//               <div className="relative mt-1">
//                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <textarea
//                   id="address"
//                   name="address"
//                   required
//                   rows={3}
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
//                   placeholder="Enter your complete address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Aadhar Card Number */}
//             <div>
//               <label
//                 htmlFor="aadharCardNumber"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Aadhar Card Number *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="aadharCardNumber"
//                   name="aadharCardNumber"
//                   type="number"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter 12-digit Aadhar number"
//                   value={formData.aadharCardNumber}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Role *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <select
//                   id="role"
//                   name="role"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none text-gray-900"
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="voter">Voter</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//               <p className="mt-1 text-xs text-gray-500">
//                 Note: Only one admin account is allowed
//               </p>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password *
//               </label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   minLength={6}
//                   className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter password (min 6 characters)"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Confirm Password *
//               </label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Confirm your password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? <EyeOff /> : <Eye />}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Signup;
///////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";

// import {
//   Vote,
//   User,
//   Lock,
//   Mail,
//   Phone,
//   MapPin,
//   AlertCircle,
//   Eye,
// } from "lucide-react";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     mobile: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//     aadharCardNumber: "",
//     role: "voter",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { signup, isAuthenticated, isAdmin } = useAuth();
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

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError("Name is required");
//       return false;
//     }

//     if (!formData.age || formData.age < 18) {
//       setError("Age must be 18 or older");
//       return false;
//     }

//     if (!formData.address.trim()) {
//       setError("Address is required");
//       return false;
//     }

//     if (!formData.aadharCardNumber || formData.aadharCardNumber.length !== 12) {
//       setError("Aadhar card number must be 12 digits");
//       return false;
//     }

//     if (formData.password.length < 4) {
//       setError("Password must be at least 4 characters long");
//       return false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }

//     if (formData.email && !isValidEmail(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     if (formData.mobile && !isValidMobile(formData.mobile)) {
//       setError("Please enter a valid mobile number");
//       return false;
//     }

//     return true;
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const isValidMobile = (mobile) => {
//     const mobileRegex = /^[6-9]\d{9}$/;
//     return mobileRegex.test(mobile);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setError("");

//     // Prepare data for submission
//     const submitData = {
//       ...formData,
//       age: parseInt(formData.age),
//       aadharCardNumber: parseInt(formData.aadharCardNumber),
//     };

//     // Remove confirmPassword before sending
//     delete submitData.confirmPassword;

//     const result = await signup(submitData);

//     if (result.success) {
//       // Navigation will be handled by useEffect above
//     } else {
//       setError(result.error);
//     }

//     setLoading(false);
//   };

//   return (
//     // Fixed container with explicit centering
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <Vote className="h-12 w-12 text-indigo-600" />
//           </div>
//           <h2 className="mt-4 text-3xl font-bold text-gray-900">
//             Create Account
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Register to participate in voting
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
//               <AlertCircle className="h-5 w-5 mr-2" />
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           <div className="space-y-4">
//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Age */}
//             <div>
//               <label
//                 htmlFor="age"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Age *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="age"
//                   name="age"
//                   type="number"
//                   required
//                   min="18"
//                   max="100"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter your age"
//                   value={formData.age}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </label>
//               <div className="relative mt-1">
//                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter your email (optional)"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Mobile */}
//             <div>
//               <label
//                 htmlFor="mobile"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Mobile Number
//               </label>
//               <div className="relative mt-1">
//                 <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="mobile"
//                   name="mobile"
//                   type="tel"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter mobile number (optional)"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label
//                 htmlFor="address"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Address *
//               </label>
//               <div className="relative mt-1">
//                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <textarea
//                   id="address"
//                   name="address"
//                   required
//                   rows={3}
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
//                   placeholder="Enter your complete address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Aadhar Card Number */}
//             <div>
//               <label
//                 htmlFor="aadharCardNumber"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Aadhar Card Number *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="aadharCardNumber"
//                   name="aadharCardNumber"
//                   type="number"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter 12-digit Aadhar number"
//                   value={formData.aadharCardNumber}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Role Selection */}
//             <div>
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Role *
//               </label>
//               <div className="relative mt-1">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <select
//                   id="role"
//                   name="role"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none text-gray-900"
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="voter">Voter</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//               <p className="mt-1 text-xs text-gray-500">
//                 Note: Only one admin account is allowed
//               </p>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password *
//               </label>
//               <div className="relative mt-1">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   id="password"
//                   name="password"
//                   required
//                   minLength={6}
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Enter password (min 6 characters)"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Confirm Password *
//               </label>
//               <div className="relative mt-1">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
//                   placeholder="Confirm your password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
///////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";
// import {
//   FaVoteYea,
//   FaUser,
//   FaLock,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaExclamationCircle,
//   FaEye,
//   FaEyeSlash,
//   FaIdCard,
// } from "react-icons/fa";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     mobile: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//     aadharCardNumber: "",
//     role: "voter",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { signup, isAuthenticated, isAdmin } = useAuth();
//   const navigate = useNavigate();

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

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError("Name is required");
//       return false;
//     }
//     if (!formData.age || formData.age < 18) {
//       setError("Age must be 18 or older");
//       return false;
//     }
//     if (!formData.address.trim()) {
//       setError("Address is required");
//       return false;
//     }
//     if (!formData.aadharCardNumber || formData.aadharCardNumber.length !== 12) {
//       setError("Aadhar card number must be 12 digits");
//       return false;
//     }
//     if (formData.password.length < 4) {
//       setError("Password must be at least 4 characters long");
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }
//     if (formData.email && !isValidEmail(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }
//     if (formData.mobile && !isValidMobile(formData.mobile)) {
//       setError("Please enter a valid mobile number");
//       return false;
//     }
//     return true;
//   };

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     const submitData = {
//       ...formData,
//       age: parseInt(formData.age),
//       aadharCardNumber: parseInt(formData.aadharCardNumber),
//     };
//     delete submitData.confirmPassword;

//     const result = await signup(submitData);
//     if (!result.success) setError(result.error);

//     setLoading(false);
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <FaVoteYea className="h-12 w-12 text-indigo-600" />
//           </div>
//           <h2 className="mt-4 text-3xl font-bold text-gray-900">
//             Create Account
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Register to participate in voting
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && (
//             <div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
//               <FaExclamationCircle className="h-5 w-5 mr-2" />
//               <span className="text-sm">{error}</span>
//             </div>
//           )}

//           <div className="space-y-4">
//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Full Name *
//               </label>
//               <div className="relative mt-1">
//                 <FaUser className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Age */}
//             <div>
//               <label
//                 htmlFor="age"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Age *
//               </label>
//               <div className="relative mt-1">
//                 <FaUser className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   id="age"
//                   name="age"
//                   type="number"
//                   required
//                   min="18"
//                   max="100"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   placeholder="Enter your age"
//                   value={formData.age}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </label>
//               <div className="relative mt-1">
//                 <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   placeholder="Enter your email (optional)"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Mobile */}
//             <div>
//               <label
//                 htmlFor="mobile"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Mobile Number
//               </label>
//               <div className="relative mt-1">
//                 <FaPhone className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   id="mobile"
//                   name="mobile"
//                   type="tel"
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   placeholder="Enter mobile number (optional)"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label
//                 htmlFor="address"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Address *
//               </label>
//               <div className="relative mt-1">
//                 <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
//                 <textarea
//                   id="address"
//                   name="address"
//                   required
//                   rows={3}
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-900"
//                   placeholder="Enter your complete address"
//                   value={formData.address}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Aadhar */}
//             <div>
//               <label
//                 htmlFor="aadharCardNumber"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Aadhar Card Number *
//               </label>
//               <div className="relative mt-1">
//                 <FaIdCard className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   id="aadharCardNumber"
//                   name="aadharCardNumber"
//                   type="number"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   placeholder="Enter 12-digit Aadhar number"
//                   value={formData.aadharCardNumber}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Role */}
//             <div>
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Role *
//               </label>
//               <div className="relative mt-1">
//                 <FaUser className="absolute left-3 top-3 text-gray-400" />
//                 <select
//                   id="role"
//                   name="role"
//                   required
//                   className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   value={formData.role}
//                   onChange={handleChange}
//                 >
//                   <option value="voter">Voter</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>
//               <p className="mt-1 text-xs text-gray-500">
//                 Note: Only one admin account is allowed
//               </p>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password *
//               </label>
//               <div className="relative mt-1">
//                 <FaLock className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   minLength={6}
//                   className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   placeholder="Enter password (min 6 characters)"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 {/* <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 p-0 m-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash size={20} />
//                   ) : (
//                     <FaEye size={20} />
//                   )}
//                 </button> */}

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 p-0 m-0 bg-transparent border-0 shadow-none outline-none cursor-pointer text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash size={20} />
//                   ) : (
//                     <FaEye size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label
//                 htmlFor="confirmPassword"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Confirm Password *
//               </label>
//               <div className="relative mt-1">
//                 <FaLock className="absolute left-3 top-3 text-gray-400" />
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   required
//                   className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                   placeholder="Confirm your password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-3 p-0 m-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   {showConfirmPassword ? (
//                     <FaEyeSlash size={20} />
//                   ) : (
//                     <FaEye size={20} />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
//           >
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-indigo-600 hover:text-indigo-500"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
///////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";
// import {
//   FaVoteYea,
//   FaUser,
//   FaLock,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaExclamationCircle,
//   FaEye,
//   FaEyeSlash,
//   FaIdCard,
// } from "react-icons/fa";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     email: "",
//     mobile: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//     aadharCardNumber: "",
//     role: "voter",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { signup, isAuthenticated, isAdmin } = useAuth();
//   const navigate = useNavigate();

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

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError("Name is required");
//       return false;
//     }
//     if (!formData.age || formData.age < 18) {
//       setError("Age must be 18 or older");
//       return false;
//     }
//     if (!formData.address.trim()) {
//       setError("Address is required");
//       return false;
//     }
//     if (!formData.aadharCardNumber || formData.aadharCardNumber.length !== 12) {
//       setError("Aadhar card number must be 12 digits");
//       return false;
//     }
//     if (formData.password.length < 4) {
//       setError("Password must be at least 4 characters long");
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }
//     if (formData.email && !isValidEmail(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }
//     if (formData.mobile && !isValidMobile(formData.mobile)) {
//       setError("Please enter a valid mobile number");
//       return false;
//     }
//     return true;
//   };

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     const submitData = {
//       ...formData,
//       age: parseInt(formData.age),
//       aadharCardNumber: parseInt(formData.aadharCardNumber),
//     };
//     delete submitData.confirmPassword;

//     const result = await signup(submitData);
//     if (!result.success) setError(result.error);

//     setLoading(false);
//   };

//   return (
//     <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
//       <div className="text-center">
//         <div className="flex justify-center">
//           <FaVoteYea className="h-12 w-12 text-indigo-600" />
//         </div>
//         <h2 className="mt-4 text-3xl font-bold text-gray-900">
//           Create Account
//         </h2>
//         <p className="mt-2 text-sm text-gray-600">
//           Register to participate in voting
//         </p>
//       </div>

//       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//         {error && (
//           <div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
//             <FaExclamationCircle className="h-5 w-5 mr-2" />
//             <span className="text-sm">{error}</span>
//           </div>
//         )}

//         <div className="space-y-4">
//           {/* Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Full Name *
//             </label>
//             <div className="relative mt-1">
//               <FaUser className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Age */}
//           <div>
//             <label
//               htmlFor="age"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Age *
//             </label>
//             <div className="relative mt-1">
//               <FaUser className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="age"
//                 name="age"
//                 type="number"
//                 required
//                 min="18"
//                 max="100"
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 placeholder="Enter your age"
//                 value={formData.age}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email Address
//             </label>
//             <div className="relative mt-1">
//               <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 placeholder="Enter your email (optional)"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Mobile */}
//           <div>
//             <label
//               htmlFor="mobile"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Mobile Number
//             </label>
//             <div className="relative mt-1">
//               <FaPhone className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="mobile"
//                 name="mobile"
//                 type="tel"
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 placeholder="Enter mobile number (optional)"
//                 value={formData.mobile}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <label
//               htmlFor="address"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Address *
//             </label>
//             <div className="relative mt-1">
//               <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
//               <textarea
//                 id="address"
//                 name="address"
//                 required
//                 rows={3}
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-900"
//                 placeholder="Enter your complete address"
//                 value={formData.address}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Aadhar */}
//           <div>
//             <label
//               htmlFor="aadharCardNumber"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Aadhar Card Number *
//             </label>
//             <div className="relative mt-1">
//               <FaIdCard className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="aadharCardNumber"
//                 name="aadharCardNumber"
//                 type="number"
//                 required
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 placeholder="Enter 12-digit Aadhar number"
//                 value={formData.aadharCardNumber}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {/* Role */}
//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Role *
//             </label>
//             <div className="relative mt-1">
//               <FaUser className="absolute left-3 top-3 text-gray-400" />
//               <select
//                 id="role"
//                 name="role"
//                 required
//                 className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="voter">Voter</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//             <p className="mt-1 text-xs text-gray-500">
//               Note: Only one admin account is allowed
//             </p>
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password *
//             </label>
//             <div className="relative mt-1">
//               <FaLock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 minLength={6}
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 placeholder="Enter password (min 6 characters)"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 p-0 m-0 bg-transparent border-0 shadow-none outline-none cursor-pointer text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Confirm Password *
//             </label>
//             <div className="relative mt-1">
//               <FaLock className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 required
//                 className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-3 p-0 m-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
//               >
//                 {showConfirmPassword ? (
//                   <FaEyeSlash size={20} />
//                 ) : (
//                   <FaEye size={20} />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
//         >
//           {loading ? "Creating Account..." : "Create Account"}
//         </button>

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;
///////////////////////////////////////////////////////////
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import {
  FaVoteYea,
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaIdCard,
} from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
    aadharCardNumber: "",
    role: "voter",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

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

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.age || formData.age < 18) {
      setError("Age must be 18 or older");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Address is required");
      return false;
    }
    if (!formData.aadharCardNumber || formData.aadharCardNumber.length !== 12) {
      setError("Aadhar card number must be 12 digits");
      return false;
    }
    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.email && !isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.mobile && !isValidMobile(formData.mobile)) {
      setError("Please enter a valid mobile number");
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const submitData = {
      ...formData,
      age: parseInt(formData.age),
      aadharCardNumber: parseInt(formData.aadharCardNumber),
    };
    delete submitData.confirmPassword;

    const result = await signup(submitData);
    if (!result.success) setError(result.error);

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <div className="flex justify-center">
          <FaVoteYea className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Register to participate in voting
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
            <FaExclamationCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-3">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age *
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="age"
                name="age"
                type="number"
                required
                min="18"
                max="100"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Enter your email (optional)"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <div className="relative mt-1">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                id="mobile"
                name="mobile"
                type="tel"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Enter mobile number (optional)"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address *
            </label>
            <div className="relative mt-1">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-900"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Aadhar */}
          <div>
            <label
              htmlFor="aadharCardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Aadhar Card Number *
            </label>
            <div className="relative mt-1">
              <FaIdCard className="absolute left-3 top-3 text-gray-400" />
              <input
                id="aadharCardNumber"
                name="aadharCardNumber"
                type="number"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Enter 12-digit Aadhar number"
                value={formData.aadharCardNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role *
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <select
                id="role"
                name="role"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="voter">Voter</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Note: Only one admin account is allowed
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password *
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Enter password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 p-0 m-0 bg-transparent border-0 shadow-none outline-none cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password *
            </label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 p-0 m-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
