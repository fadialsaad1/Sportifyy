import React from "react";
import BottomNavigation from "./BottomNavigation";

export default function ProgressPage({ currentPage, setCurrentPage }) {
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

            {/* Header */}
            <header style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                marginBottom: '24px'
            }}>
                <img src="/app_icon.png" alt="Sportifyy" style={{ width: '40px', height: '40px' }} />
                <h1 style={{ fontSize: '24px', fontWeight: '700', marginLeft: '16px', color: '#fff' }}>
                    Progress
                </h1>
            </header>

            {/* Progress Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 20px' }}>
                {/* Progress Info Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#1e293b' }}>
                        Your Progress
                    </h2>
                    <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                        Track your basketball improvement over time. View your stats, achievements,
                        and see how you're progressing towards your goals.
                    </p>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {[
                        { title: 'Your skills are sharpening with every practice! 💪🏀', },
                        { title: 'You’re climbing the leaderboard! Keep it up! 🔥',},
                        { title: 'Bullseye! Your precision is improving steadily! 🎯',  },
                        { title: 'Great job hitting those baskets! Every shot counts! 🏀',  }
                    ].map((card, index) => (
                        <div key={index} style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '16px',
                            width: '165px',
                            height: '110px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', margin: 0, fontFamily: 'cursive'}}>
                                    {card.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Placeholder */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <p style={{ color: '#94a3b8', fontSize: '16px' }}>
                        Progress charts and analytics will be displayed here
                    </p>
                </div>
            </div>

            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}
