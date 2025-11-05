import React from "react";
import { motion } from "framer-motion";

export default function PracticePage({ currentPage, setCurrentPage }) {
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
                    }}>Practice</h1>
                </header>

                {/* Practice Content */}
                <main className="w-full">
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        marginBottom: '24px'
                    }}>
                        <h2 style={{fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1e293b'}}>
                            Practice Routines
                        </h2>
                        <p style={{color: '#64748b', lineHeight: '1.6'}}>
                            Access your basketball training routines, drills, and practice sessions. 
                            Start a new practice or continue with your scheduled workouts.
                        </p>
                    </div>

                    {/* Practice Routines Placeholder */}
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
                            Practice routines and drills will be displayed here
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
                            color: item.label === 'Practice' ? '#1e293b' : '#64748b',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '8px',
                            minWidth: item.label === 'Progress' ? '80px' : '50px',
                            maxWidth: item.label === 'Progress' ? '90px' : '60px'
                        }}
                        onMouseEnter={(e) => {
                            if (item.label !== 'Practice') {
                                e.target.style.color = '#1e293b';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (item.label !== 'Practice') {
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