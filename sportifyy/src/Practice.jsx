import React from "react";
import BottomNavigation from "./BottomNavigation";
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

            <BottomNavigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
}