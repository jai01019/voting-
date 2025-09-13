// import React from "react";
// import Navbar from "../components/common/Navbar";
// import "./Auth.css";

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="auth-container">
//       {/* Navbar full width */}
//       <header className="auth-navbar">
//         <Navbar />
//       </header>

//       {/* Centered form */}
//       <main className="auth-content">
//         <div className="w-full max-w-md">{children}</div>
//       </main>
//     </div>
//   );
// };

// export default AuthLayout;
/////////////////////////////////////////////////////////
import React from "react";
import Navbar from "../components/common/Navbar";
import "./Auth.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      {/* Navbar full width */}
      <header className="auth-navbar">
        <Navbar />
      </header>
      {/* Centered form */}
      <main className="auth-content">{children}</main>
    </div>
  );
};

export default AuthLayout;
