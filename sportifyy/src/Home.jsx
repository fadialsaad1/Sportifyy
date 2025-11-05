import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, TrendingUp, Box, Settings } from "lucide-react";

const StatCard = ({ title, value, subtitle, color = 'sky' }) => (
    <div className="bg-slate-900 rounded-xl p-4 w-48 h-28 shadow-lg text-white flex flex-col justify-between">
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <p className="text-xs text-slate-300 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className="text-right">
                <p className="text-sm text-slate-400">{subtitle}</p>
            </div>
        </div>
        <div className={`h-1 rounded-full bg-${color}-400`} />
    </div>
);

export default function HomePage({ currentPage, setCurrentPage }) {
    const [selectedDay, setSelectedDay] = useState(1); // Monday is selected by default (index 1)
    
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
                <img src="/plus_button_icon.png" alt="Add" style={{width: '88px', height: '88px'}} />
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
                    }}>Sportify</h1>
                </header>

            {/* Goal bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                border: '2px solid black',
                borderRadius: '25px',
                padding: '12px 20px',
                marginBottom: '24px',
                width: '100%',
                maxWidth: '800px',
                justifyContent: 'space-between'
            }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{fontSize: '14px', color: '#64748b', marginRight: '8px'}}>Goal:</span>
                    <span style={{fontSize: '14px', color: '#1e293b', fontWeight: '700'}}>Basketball Shot</span>
                </div>
                <img src="/basketball_icon.png" alt="Basketball" style={{width: '32px', height: '32px'}} />
            </div>

            <main className="w-full">
                {/* Calendar/Timeline row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '34px',
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto 34px auto',
                    border: '1px solid #e2e8f0'
                }}>
                    <button style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}>&lt;</button>
                    <div style={{display: 'flex', gap: '4px'}}>
                        {[
                            {day: 'S', date: 14},
                            {day: 'M', date: 15},
                            {day: 'T', date: 16},
                            {day: 'W', date: 17},
                            {day: 'T', date: 18},
                            {day: 'F', date: 19},
                            {day: 'S', date: 20}
                        ].map((item, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedDay(i)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    backgroundColor: selectedDay === i ? '#0f172a' : 'transparent',
                                    color: selectedDay === i ? 'white' : '#64748b',
                                    minWidth: '40px'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedDay !== i) {
                                        e.target.style.backgroundColor = '#f1f5f9';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedDay !== i) {
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span style={{fontSize: '11px', marginBottom: '2px'}}>{item.day}</span>
                                <span style={{fontSize: '13px', fontWeight: '600'}}>{item.date}</span>
                            </button>
                        ))}
                    </div>
                    <button style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}>&gt;</button>
                </div>

                {/* Black Stat cards row */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '24px',
                    justifyContent: 'flex-start'
                }}>
                    {/* Technique Score */}
                    <div style={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        padding: '14px',
                        width: '165px',
                        height: '110px',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <p style={{fontSize: '11px', color: '#cbd5e1', marginBottom: '4px'}}>Technique Score</p>
                            <h3 style={{fontSize: '26px', fontWeight: 'bold', color: 'white', margin: '0'}}>8.9</h3>
                            <p style={{fontSize: '13px', color: '#94a3b8'}}>/10</p>
                        </div>
                        <div style={{height: '4px', borderRadius: '2px', backgroundColor: '#8b5cf6'}} />
                    </div>

                    {/* Overall Rating */}
                    <div style={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        padding: '14px',
                        width: '165px',
                        height: '110px',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <p style={{fontSize: '11px', color: '#cbd5e1', marginBottom: '4px'}}>Overall Rating</p>
                            <h3 style={{fontSize: '26px', fontWeight: 'bold', color: 'white', margin: '0'}}>92</h3>
                            <p style={{fontSize: '13px', color: '#94a3b8'}}>★</p>
                        </div>
                        <div style={{height: '4px', borderRadius: '2px', backgroundColor: '#10b981'}} />
                    </div>

                    {/* Accuracy */}
                    <div style={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        padding: '14px',
                        width: '165px',
                        height: '110px',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <p style={{fontSize: '11px', color: '#cbd5e1', marginBottom: '4px'}}>Accuracy</p>
                            <h3 style={{fontSize: '26px', fontWeight: 'bold', color: 'white', margin: '0'}}>87%</h3>
                        </div>
                        <div style={{height: '4px', borderRadius: '2px', backgroundColor: '#3b82f6'}} />
                    </div>

                    {/* Shots Made */}
                    <div style={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        padding: '14px',
                        width: '165px',
                        height: '110px',
                        color: 'white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <p style={{fontSize: '11px', color: '#cbd5e1', marginBottom: '4px'}}>Shots Made</p>
                            <h3 style={{fontSize: '26px', fontWeight: 'bold', color: 'white', margin: '0'}}>54</h3>
                            <p style={{fontSize: '13px', color: '#94a3b8'}}>🏀</p>
                        </div>
                        <div style={{height: '4px', borderRadius: '2px', backgroundColor: '#f97316'}} />
                    </div>
                </div>
            {/* Last Practice bubble - positioned under the black cards */}
            <div style={{
                width: '100%',
                marginTop: '24px',
                marginBottom: '24px'
            }}>
                <h4 style={{fontSize: '14px', color: '#64748b', marginBottom: '10px'}}>Last Practice</h4>
                <div style={{
                    backgroundColor: '#dcfce7',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #bbf7d0',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    maxWidth: '500px'
                }}>
                    {/* Small video thumbnail on the left */}
                    <div style={{
                        position: 'relative',
                        backgroundColor: '#1e293b',
                        width: '80px',
                        height: '60px',
                        flexShrink: 0,
                        borderRadius: '6px',
                        overflow: 'hidden'
                    }}>
                        <img 
                            src="/last_video_thumbnail.png"
                            alt="Last practice thumbnail"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        {/* Tiny play button */}
                        <div style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '0',
                                    height: '0',
                                    borderLeft: '8px solid #1e293b',
                                    borderTop: '5px solid transparent',
                                    borderBottom: '5px solid transparent',
                                    marginLeft: '2px'
                                }}></div>
                            </div>
                        </div>
                    </div>
                    {/* Message text on the right */}
                    <div style={{flex: 1}}>
                        <p style={{fontSize: '13px', color: '#374151', margin: '0', lineHeight: '1.5', letterSpacing:'1.2px'}}>
                            Your shooting accuracy improved by 5% since last week! Keep it up!
                        </p>
                    </div>
                </div>
            </div>

            </main>
            
            {/* Close content container */}
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
                    { img: '/upload_icon.png', label: 'Upload' },
                ].map((item, i) => (
                    <button 
                        key={i} 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: item.label === 'Home' ? '#1e293b' : '#64748b',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            padding: '8px',
                            minWidth: item.label === 'Progress' ? '80px' : '50px',
                            maxWidth: item.label === 'Progress' ? '90px' : '60px'
                        }}
                        onMouseEnter={(e) => {
                            if (item.label !== 'Home') {
                                e.currentTarget.style.color = '#1e293b';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (item.label !== 'Home') {
                                e.currentTarget.style.color = '#64748b';
                            }
                        }}
                        onClick={() => {
                            setCurrentPage(item.label);
                        }}
                    >
                        <img src={item.img} alt={item.label} style={{width: '24px', height: '24px', marginBottom: '4px'}} />
                        <span style={{fontSize: '12px', textAlign: 'center', wordWrap: 'break-word'}}>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}