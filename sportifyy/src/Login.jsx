import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage({ currentPage, setCurrentPage }) {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f4c75, #3282b8, #bbe1fa)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                maxWidth: '900px',
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden'
            }}>
                {/* Welcome Section */}
                <div style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #0f4c75, #3282b8)',
                    color: 'white',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#bbe1fa'
                    }}>Sportifyy</div>
                    
                    <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#bbe1fa', position: 'relative' }}>
                        Welcome to Sportifyy
                    </h1>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', position: 'relative' }}>
                        Join our community of sports enthusiasts! Create an account to connect with fellow fans, track your favorite teams, and get personalized sports content tailored just for you.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px', position: 'relative' }}>
                        {['🏀', '⚽', '⚾', '🏈', '🎾'].map((sport, index) => (
                            <div key={index} style={{
                                fontSize: '24px',
                                background: 'rgba(187, 225, 250, 0.2)',
                                padding: '10px',
                                borderRadius: '50%',
                                animation: `float 3s ease-in-out ${index * 0.2}s infinite`
                            }}>
                                {sport}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Section */}
                <div style={{
                    flex: 1,
                    padding: '40px',
                    background: '#f8f9fa'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '30px',
                        gap: '10px',
                        background: 'white',
                        padding: '10px',
                        borderRadius: '50px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}>
                        <button 
                            onClick={() => setIsLogin(true)}
                            style={{
                                background: isLogin ? 'linear-gradient(135deg, #0f4c75, #3282b8)' : 'none',
                                border: 'none',
                                color: isLogin ? 'white' : '#666',
                                fontWeight: '600',
                                cursor: 'pointer',
                                padding: '10px 25px',
                                borderRadius: '25px',
                                transition: 'all 0.3s'
                            }}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => setIsLogin(false)}
                            style={{
                                background: !isLogin ? 'linear-gradient(135deg, #0f4c75, #3282b8)' : 'none',
                                border: 'none',
                                color: !isLogin ? 'white' : '#666',
                                fontWeight: '600',
                                cursor: 'pointer',
                                padding: '10px 25px',
                                borderRadius: '25px',
                                transition: 'all 0.3s'
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                    {isLogin ? (
                        // Login Form
                        <div>
                            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#0f4c75' }}>
                                Login to Your Account
                            </h2>
                            <p style={{ color: '#666', marginBottom: '30px' }}>
                                Welcome back! Please enter your details.
                            </p>
                            
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '16px'
                                        }}
                                        required 
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '20px', position: 'relative' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                        Password
                                    </label>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '16px'
                                        }}
                                        required 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '15px',
                                            top: '40px',
                                            background: 'none',
                                            border: 'none',
                                            color: '#777',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                
                                <button 
                                    type="submit"
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '14px',
                                        background: 'linear-gradient(135deg, #0f4c75, #3282b8)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setCurrentPage('Home')}
                                >
                                    Login to Sportifyy
                                </button>
                            </form>
                            
                            <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                                Don't have an account?{' '}
                                <button 
                                    onClick={toggleForm}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#3282b8',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    ) : (
                        // Sign Up Form
                        <div>
                            <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '10px', color: '#0f4c75' }}>
                                Create an Account
                            </h2>
                            <p style={{ color: '#666', marginBottom: '30px' }}>
                                Join our sports community today!
                            </p>
                            
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                            First Name
                                        </label>
                                        <input 
                                            type="text" 
                                            style={{
                                                width: '100%',
                                                padding: '12px 15px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '16px'
                                            }}
                                            required 
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                            Last Name
                                        </label>
                                        <input 
                                            type="text" 
                                            style={{
                                                width: '100%',
                                                padding: '12px 15px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '16px'
                                            }}
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                        Email
                                    </label>
                                    <input 
                                        type="email" 
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '16px'
                                        }}
                                        required 
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                        Favorite Sport
                                    </label>
                                    <select style={{
                                        width: '100%',
                                        padding: '12px 15px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '16px'
                                    }} required>
                                        <option value="">Select your favorite sport</option>
                                        <option value="basketball">Basketball</option>
                                        <option value="football">Football</option>
                                        <option value="soccer">Soccer</option>
                                        <option value="tennis">Tennis</option>
                                        <option value="baseball">Baseball</option>
                                    </select>
                                </div>
                                
                                <div style={{ marginBottom: '20px', position: 'relative' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                        Password
                                    </label>
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '16px'
                                        }}
                                        required 
                                        minLength="6"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '15px',
                                            top: '40px',
                                            background: 'none',
                                            border: 'none',
                                            color: '#777',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                                        Confirm Password
                                    </label>
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        style={{
                                            width: '100%',
                                            padding: '12px 15px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '16px'
                                        }}
                                        required 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '15px',
                                            top: '40px',
                                            background: 'none',
                                            border: 'none',
                                            color: '#777',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                
                                <button 
                                    type="submit"
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '14px',
                                        background: 'linear-gradient(135deg, #0f4c75, #3282b8)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setCurrentPage('Home');
                                    }}
                                >
                                    Join Sportifyy
                                </button>
                            </form>
                            
                            <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                                Already have an account?{' '}
                                <button 
                                    onClick={toggleForm}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#3282b8',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                `}
            </style>
        </div>
    );
}
