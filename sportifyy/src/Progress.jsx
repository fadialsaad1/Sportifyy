import React from "react";
import { motion } from "framer-motion";

export default function ProgressPage({ currentPage, setCurrentPage }) {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            paddingTop: '60px',
            paddingBottom: '120px',
            width: '100%',
            maxWidth: '1024px',
            margin: '0 auto',
            position: 'relative'
        }}>
            {/* Top right icons - positioned relative to viewport */}
            <div 
                style={{
                    position: 'fixed',
                    top: '16px',
                    right: '16px',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                }}
            >
                <img src="/notification_icon.png" alt="Notifications" style={{width: '88px', height: '88px'}} />
                <img 
                    src="/plus_button_icon.png" 
                    alt="Add" 
                    style={{
                        width: '88px', 
                        height: '88px',
                        cursor: 'pointer'
                    }}
                    onClick={() => setCurrentPage('Upload')}
                />
            </div>

            {/* Content container */}
            <div style={{padding: '0 24px', width: '100%'}}>
                {/* Header */}
                <header style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '24px'
                }}>
                    <img src="/app_icon.png" alt="Sportifyy" style={{width: '40px', height: '40px'}} />
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginLeft: '16px',
                        color: '#1e293b'
                    }}>Progress</h1>
                </header>

                {/* Progress Content */}
                <main className="w-full">
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        marginBottom: '24px'
                    }}>
                        <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b'}}>
                            Your Progress
                        </h2>
                        <p style={{color: '#64748b', lineHeight: '1.6'}}>
                            Track your basketball improvement over time. View your stats, achievements, 
                            and see how you're progressing towards your goals.
                        </p>
                    </div>

                    {/* Progress Charts Placeholder */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        marginBottom: '24px',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <p style={{color: '#94a3b8', fontSize: '16px'}}>
                            Progress charts and analytics will be displayed here
                        </p>
                    </div>
                </main>
            </div>

            {/* Bottom nav */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    backgroundColor: 'white',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    padding: '16px 32px',
                    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    borderTop: '1px solid #e2e8f0',
                    zIndex: 1000
                }}
            >
                {[
                    { img: '/home_icon.png', label: 'Home' },
                    { img: '/progress_icon.png', label: 'Progress' },
                    { img: '/routine_icon.png', label: 'Practice' },
                    { img: '/settings_icon.png', label: 'Profile' },
                ].map((item, i) => (
                    <button 
                        key={i} 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: item.label === 'Progress' ? '#1e293b' : '#64748b',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '8px',
                            minWidth: item.label === 'Progress' ? '80px' : '50px',
                            maxWidth: item.label === 'Progress' ? '90px' : '60px'
                        }}
                        onMouseEnter={(e) => {
                            if (item.label !== 'Progress') {
                                e.target.style.color = '#1e293b';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (item.label !== 'Progress') {
                                e.target.style.color = '#64748b';
                            }
                        }}
                        onClick={() => {
                            setCurrentPage(item.label);
                        }}
                    >
                        <img 
                            src={item.img} 
                            alt={item.label} 
                            style={{
                                width: item.label === 'Progress' ? '32px' : '24px', 
                                height: '24px', 
                                marginBottom: '4px'
                            }} 
                        />
                        <span style={{fontSize: '12px', textAlign: 'center', wordWrap: 'break-word'}}>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}