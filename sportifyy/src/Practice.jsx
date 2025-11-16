import React from "react";
import BottomNavigation from "./BottomNavigation";
import { motion } from "framer-motion";

export default function PracticePage({ currentPage, setCurrentPage }) {

    function getYouTubeID(url) {
        try {
            const urlObj = new URL(url);

            // Handles youtu.be links
            if (urlObj.hostname === "youtu.be") {
                return urlObj.pathname.substring(1);
            }

            // Handles normal youtube.com/watch?v=XXX
            return urlObj.searchParams.get("v");
        } catch {
            return null;
        }
    }


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
            background: 'linear-gradient(135deg, #d5e2ebff, #fdfeffff, #cce4f5ff)',
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
                {/* Practice Video Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '20px',
                        marginBottom: '24px'
                    }}


                >


                    {practiceResources.map((res, idx) => {
                        const videoId = getYouTubeID(res.url);

                        return (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    color: '#1e293b',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}
                            >
                                <h3 style={{ fontSize: '16px', fontWeight: '700' }}>
                                    {res.title}
                                </h3>

                                <p style={{ fontSize: '14px', color: '#64748b' }}>
                                    {res.description}
                                </p>

                                {/* ⬇️ The iframe goes here */}
                                {videoId ? (
                                    <iframe
                                        width="100%"
                                        height="180"
                                        style={{ borderRadius: '12px', border: 'none' }}
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <p style={{ color: "red" }}>Invalid YouTube URL</p>
                                )}
                            </div>
                        );
                    })}
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
