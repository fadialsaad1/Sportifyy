import React, { useState } from "react";
import "./Login.css"; // You’ll create this next

export default function Login({ setCurrentPage }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        sport: "",
        password: "",
        confirmPassword: "",
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) =>
        /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\(\)\-\s]/g, ""));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            // --- Login Validation ---
            if (!validateEmail(formData.email) || !formData.password) {
                setSuccessMessage("❌ Please enter valid email and password.");
                return;
            }
            setSuccessMessage("✅ Login successful! Redirecting to Sportifyy...");
            setTimeout(() => setCurrentPage("Profile"), 2000);
        } else {
            // --- Signup Validation ---
            if (
                !formData.firstName ||
                !formData.lastName ||
                !validateEmail(formData.email) ||
                !validatePhone(formData.phone) ||
                !formData.sport ||
                formData.password.length < 6 ||
                formData.password !== formData.confirmPassword
            ) {
                setSuccessMessage("❌ Please fill all fields correctly.");
                return;
            }
            setSuccessMessage(
                `✅ Welcome ${formData.firstName}! Your Sportifyy ${formData.sport} account has been created!`
            );
            setTimeout(() => {
                setIsLogin(true);
                setSuccessMessage("");
            }, 2500);
        }
    };

    return (
        <div className="container">
            {/* Left welcome section */}
            <div className="welcome-section">
                <div className="brand-logo">Sportifyy</div>
                <h1>Welcome to Sportifyy</h1>
                <p>
                    Join our community of sports enthusiasts! Create an account to connect
                    with fans, track your favorite teams, and get personalized content.
                </p>
                <div className="sports-icons">
                    <i className="fas fa-futbol floating"></i>
                    <i
                        className="fas fa-basketball-ball floating"
                        style={{ animationDelay: "0.2s" }}
                    ></i>
                    <i
                        className="fas fa-baseball-ball floating"
                        style={{ animationDelay: "0.4s" }}
                    ></i>
                    <i
                        className="fas fa-football-ball floating"
                        style={{ animationDelay: "0.6s" }}
                    ></i>
                    <i
                        className="fas fa-running floating"
                        style={{ animationDelay: "0.8s" }}
                    ></i>
                </div>
            </div>

            {/* Right form section */}
            <div className="form-section">
                <button
                    onClick={() => setCurrentPage("Profile")}
                    className="btn"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <img
                        src="/signin.jpg"
                        alt="Sign in"
                        style={{ width: "24px", height: "24px", borderRadius: "50%" }}
                    />
                    <span>Sign in</span>
                </button>

                {/* Form Switch */}
                <div className="form-switch">
                    <button
                        className={`form-switch-btn ${isLogin ? "active" : ""}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`form-switch-btn ${!isLogin ? "active" : ""}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="form-container">
                    {successMessage && (
                        <div className="success-message">{successMessage}</div>
                    )}

                    <h2 className="form-title">
                        {isLogin ? "Login to Your Account" : "Create an Account"}
                    </h2>
                    <p className="form-subtitle">
                        {isLogin
                            ? "Welcome back! Please enter your details."
                            : "Join our sports community today!"}
                    </p>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div className="name-group">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Favorite Sport</label>
                                    <select id="sport" onChange={handleInputChange} required>
                                        <option value="">Select your favorite sport</option>
                                        <option value="football">Football</option>
                                        <option value="basketball">Basketball</option>
                                        <option value="baseball">Baseball</option>
                                        <option value="soccer">Soccer</option>
                                        <option value="tennis">Tennis</option>
                                        <option value="golf">Golf</option>
                                        <option value="running">Running</option>
                                        <option value="swimming">Swimming</option>
                                        <option value="cycling">Cycling</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {isLogin && (
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                onChange={handleInputChange}
                                required
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}

                        <button type="submit" className="btn">
                            {isLogin ? "Login to Sportifyy" : "Join Sportifyy"}
                        </button>
                    </form>

                    <p className="toggle-text">
                        {isLogin ? (
                            <>
                                Don’t have an account?{" "}
                                <span
                                    className="toggle-link"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Sign Up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span className="toggle-link" onClick={() => setIsLogin(true)}>
                                    Login
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
