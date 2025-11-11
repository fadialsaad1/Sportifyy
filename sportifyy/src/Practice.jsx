import React from "react";
import BottomNavigation from "./BottomNavigation";
import { motion } from "framer-motion";

export default function PracticePage({ currentPage, setCurrentPage }) {
    const practiceResources = [
        { title: "This 5 Minute DRIBBLING WORKOUT Changes Your Game FOREVER 🤯", url: "https://www.youtube.com/watch?v=oADaM2L1YLc", description: "Dribbling drills to improve ball handling and control." },
        { title: "🏀 Basketball Passing Drills", url: "https://www.youtube.com/watch?v=dmXPryj71Eg", description: "Learn chest, bounce, and overhead passes with drills." },
        { title: "⚽ Soccer Passing & Shooting Drills", url: "https://www.youtube.com/watch?v=Z51rXqVZLLY", description: "Practice accurate passing and shooting techniques." },
        { title: "🎾 Tennis Practice Drills", url: "https://www.youtube.com/watch?v=YulpiQpSkmU", description: "Improve forehands, backhands, serves, and footwork." },
        { title: "🏈 Football Throwing & Catching Drills", url: "https://www.youtube.com/watch?v=59F3kpBUn0Q", description: "Drills to improve quarterback throwing mechanics." },
        { title: "🏐 Volleyball Passing & Serving Drills", url: "https://www.youtube.com/watch?v=sNMEiKS4178", description: "Learn bumping, setting, and serving with structured drills." }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f4c75, #3282b8, #bbe1fa)',
            paddingTop: '60px',
            paddingBottom: '120px',
            width: '100%',
            maxWidth: '1024px',
            margin: '0 auto',
            fontFamily: "'Poppins', sans-serif",
            position: 'relative'
        }}>
            {/* Top Right Icons */}
            <div style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
            }}>
                <img src="/notification_icon.png" alt="Notifications" style={{ width: '88px', height: '88px' }} />
                <img
                    src="/plus_button_icon.png"
                    alt="Add"
                    style={{ width: '88px', height: '88px', cursor: 'pointer' }}
                    onClick={() => setCurrentPage('Upload')}
                />
            </div>

            {/* Main Content Container */}
            <div style={{
                padding: '0 24px',
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <header style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '24px'
                }}>
                    <img src="/app_icon.png" alt="Sportifyy" style={{ width: '40px', height: '40px' }} />
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        marginLeft: '16px',
                        color: '#fff'
                    }}>Practice</h1>
                </header>

                {/* Practice Info Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    marginBottom: '24px'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
                        Practice Routines
                    </h2>
                    <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                        Access your training routines, drills, and sessions for basketball, soccer, tennis, and more.
                        Click the links below to watch the tutorials on YouTube.
                    </p>
                </div>

                {/* Practice Video Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '20px',
                        marginBottom: '24px'
                    }}
                >
                    {practiceResources.map((res, i) => (
                        <a
                            key={i}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '16px',
                                color: '#1e293b',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                            }}
                        >
                            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>
                                {res.title}
                            </h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
                                {res.description}
                            </p>
                        </a>
                    ))}
                </motion.div>

                {/* Placeholder for Saved Sessions */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    minHeight: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    fontSize: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                    Your saved practice sessions will appear here.
                </div>
            </div>

            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}
