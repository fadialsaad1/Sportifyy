import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage({ currentPage, setCurrentPage }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        favoriteSport: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const userData = {
            name: formData.firstName,
            level: 1,
            badges: 0,
            following: 0,
            stats: { shootingAccuracy: 0, freeThrow: 0 },
            activity: [],
            favoriteSport: formData.favoriteSport
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        setCurrentPage("Profile");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        if (!storedUser) {
            alert("No account found. Please sign up first.");
            return;
        }
        setCurrentPage("Profile");
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f0f6fb',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    padding: '32px'
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <img src="/app_icon.png" alt="Sportifyy" style={{ width: '50px', height: '50px', marginBottom: '12px' }} />
                    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>Sportifyy</h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                        {isLogin ? "Login to continue" : "Create a new account"}
                    </p>
                </div>

                {/* Toggle Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                    <button
                        onClick={() => setIsLogin(true)}
                        style={{
                            flex: 1,
                            padding: '10px 0',
                            borderRadius: '25px',
                            border: 'none',
                            fontWeight: '600',
                            cursor: 'pointer',
                            background: isLogin ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : '#f1f5f9',
                            color: isLogin ? 'white' : '#475569',
                            transition: 'all 0.3s'
                        }}
                    >Login</button>
                    <button
                        onClick={() => setIsLogin(false)}
                        style={{
                            flex: 1,
                            padding: '10px 0',
                            borderRadius: '25px',
                            border: 'none',
                            fontWeight: '600',
                            cursor: 'pointer',
                            background: !isLogin ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : '#f1f5f9',
                            color: !isLogin ? 'white' : '#475569',
                            transition: 'all 0.3s'
                        }}
                    >Sign Up</button>
                </div>

                {/* Form */}
                {isLogin ? (
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Email</label>
                            <input type="email" name="email" onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div style={{ marginBottom: '20px', position: 'relative' }}>
                            <label style={labelStyle}>Password</label>
                            <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} required style={inputStyle} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={toggleStyle}>
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <button type="submit" style={buttonStyle}>Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignUp}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required style={inputStyle} />
                            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required style={inputStyle} />
                        </div>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
                        <select name="favoriteSport" onChange={handleChange} required style={inputStyle}>
                            <option value="">Select your favorite sport</option>
                            <option value="basketball">Basketball</option>
                            <option value="football">Football</option>
                            <option value="soccer">Soccer</option>
                            <option value="tennis">Tennis</option>
                            <option value="baseball">Baseball</option>
                        </select>
                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={toggleStyle}>{showPassword ? "Hide" : "Show"}</button>
                        </div>
                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required style={inputStyle} />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={toggleStyle}>{showConfirmPassword ? "Hide" : "Show"}</button>
                        </div>
                        <button type="submit" style={buttonStyle}>Join Sportifyy</button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}

// Styles
const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none"
};

const labelStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
    marginBottom: "6px",
    display: "block"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    color: "white",
    marginTop: "10px"
};

const toggleStyle = {
    position: "absolute",
    right: "12px",
    top: "12px",
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    fontSize: "13px"
};
