import React, { useState } from "react";
import BottomNavigation from "./BottomNavigation";
import { motion } from "framer-motion";

export default function PracticePage({ currentPage, setCurrentPage }) {
    const [selectedSport, setSelectedSport] = useState("basketball");
    const [selectedPosition, setSelectedPosition] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");

    // Basketball drills data
    const basketballDrills = {
        "point-guard": {
            "easy": [
                {
                    "name": "Stationary Dribbling",
                    "description": "Practice basic dribbling techniques while standing in place. Focus on control and keeping your head up.",
                    "duration": "10-15 minutes",
                    "equipment": ["Basketball"],
                    "focus": ["Ball Control", "Hand-Eye Coordination"]
                },
                {
                    "name": "Two-Ball Dribbling",
                    "description": "Dribble two basketballs simultaneously to improve hand-eye coordination and ball control.",
                    "duration": "10 minutes",
                    "equipment": ["2 Basketballs"],
                    "focus": ["Ambidexterity", "Coordination"]
                }
            ],
            "medium": [
                {
                    "name": "Cone Weaving Dribble",
                    "description": "Dribble through a series of cones while maintaining control and speed. Work on change of direction.",
                    "duration": "20 minutes",
                    "equipment": ["Basketball", "5-7 Cones"],
                    "focus": ["Ball Handling", "Change of Direction"]
                }
            ],
            "hard": [
                {
                    "name": "Game Situation Decision Making",
                    "description": "Simulate game situations with defenders to practice making quick decisions under pressure.",
                    "duration": "30 minutes",
                    "equipment": ["Basketball", "2-3 Defenders", "Half Court"],
                    "focus": ["Basketball IQ", "Pressure Situations"]
                }
            ]
        },
        "shooting-guard": {
            "easy": [
                {
                    "name": "Form Shooting",
                    "description": "Focus on proper shooting form close to the basket. Emphasize elbow alignment and follow-through.",
                    "duration": "15 minutes",
                    "equipment": ["Basketball", "Basket"],
                    "focus": ["Shooting Mechanics", "Fundamentals"]
                }
            ],
            "medium": [
                {
                    "name": "Catch and Shoot",
                    "description": "Practice catching passes and immediately shooting with proper footwork and balance.",
                    "duration": "25 minutes",
                    "equipment": ["Basketball", "Partner", "Basket"],
                    "focus": ["Quick Release", "Footwork"]
                }
            ],
            "hard": [
                {
                    "name": "Game Speed Shooting",
                    "description": "Simulate game conditions with defenders and fatigue to practice shooting under pressure.",
                    "duration": "30 minutes",
                    "equipment": ["Basketball", "Defender", "Basket"],
                    "focus": ["Game Simulation", "Pressure Shooting"]
                }
            ]
        },
        "small-forward": {
            "easy": [
                {
                    "name": "Layup Variations",
                    "description": "Practice different types of layups with both hands - regular, reverse, and Euro steps.",
                    "duration": "15 minutes",
                    "equipment": ["Basketball", "Basket"],
                    "focus": ["Finishing", "Footwork"]
                }
            ],
            "medium": [
                {
                    "name": "Triple Threat Attacks",
                    "description": "Work on reading defenders from triple threat position and making the appropriate move.",
                    "duration": "25 minutes",
                    "equipment": ["Basketball", "Active Defender"],
                    "focus": ["Reading Defenders", "Decision Making"]
                }
            ],
            "hard": [
                {
                    "name": "Isolation Scoring",
                    "description": "Practice creating your own shot in one-on-one situations against tough defenders.",
                    "duration": "30 minutes",
                    "equipment": ["Basketball", "Skilled Defender"],
                    "focus": ["One-on-One Skills", "Scoring"]
                }
            ]
        },
        "power-forward": {
            "easy": [
                {
                    "name": "Post Position Fundamentals",
                    "description": "Work on establishing and maintaining low post position against a defender.",
                    "duration": "15 minutes",
                    "equipment": ["Basketball", "Passive Defender"],
                    "focus": ["Post Positioning", "Footwork"]
                }
            ],
            "medium": [
                {
                    "name": "Face-up Game",
                    "description": "Practice facing up from the post and attacking with one or two dribbles.",
                    "duration": "25 minutes",
                    "equipment": ["Basketball", "Active Defender", "Basket"],
                    "focus": ["Face-up Moves", "Driving from Post"]
                }
            ],
            "hard": [
                {
                    "name": "Advanced Post Moves",
                    "description": "Combine multiple post moves in sequence to counter defensive adjustments.",
                    "duration": "30 minutes",
                    "equipment": ["Basketball", "Skilled Defender", "Basket"],
                    "focus": ["Advanced Post Play", "Counter Moves"]
                }
            ]
        },
        "center": {
            "easy": [
                {
                    "name": "Basic Hook Shots",
                    "description": "Practice both right and left-handed hook shots from close range.",
                    "duration": "15 minutes",
                    "equipment": ["Basketball", "Basket"],
                    "focus": ["Hook Shot", "Touch Around Basket"]
                }
            ],
            "medium": [
                {
                    "name": "Screen Setting",
                    "description": "Practice setting solid screens to free up teammates, both on and off the ball.",
                    "duration": "20 minutes",
                    "equipment": ["Teammates", "Defenders"],
                    "focus": ["Screen Setting", "Physicality"]
                }
            ],
            "hard": [
                {
                    "name": "Passing from the Post",
                    "description": "Work on reading double teams and making accurate passes to open teammates.",
                    "duration": "30 minutes",
                    "equipment": ["Basketball", "Double Team Defenders", "Cutters"],
                    "focus": ["Post Passing", "Reading Defenses"]
                }
            ]
        }
    };

    const practiceResources = [
        { title: "This 5 Minute DRIBBLING WORKOUT Changes Your Game FOREVER 🤯", url: "https://www.youtube.com/watch?v=oADaM2L1YLc", description: "Dribbling drills to improve ball handling and control." },
        { title: "🏀 Basketball Passing Drills", url: "https://www.youtube.com/watch?v=dmXPryj71Eg", description: "Learn chest, bounce, and overhead passes with drills." },
        { title: "⚽ Soccer Passing & Shooting Drills", url: "https://www.youtube.com/watch?v=Z51rXqVZLLY", description: "Practice accurate passing and shooting techniques." },
        { title: "🎾 Tennis Practice Drills", url: "https://www.youtube.com/watch?v=YulpiQpSkmU", description: "Improve forehands, backhands, serves, and footwork." },
        { title: "🏈 Football Throwing & Catching Drills", url: "https://www.youtube.com/watch?v=59F3kpBUn0Q", description: "Drills to improve quarterback throwing mechanics." },
        { title: "🏐 Volleyball Passing & Serving Drills", url: "https://www.youtube.com/watch?v=sNMEiKS4178", description: "Learn bumping, setting, and serving with structured drills." }
    ];

    // Filter drills based on selections
    const getFilteredDrills = () => {
        if (selectedSport !== "basketball") return [];
        
        const positionsToShow = selectedPosition === "all" 
            ? Object.keys(basketballDrills) 
            : [selectedPosition];
        
        let filtered = [];
        
        positionsToShow.forEach(position => {
            const positionData = basketballDrills[position];
            const difficultiesToShow = selectedDifficulty === "all"
                ? Object.keys(positionData)
                : [selectedDifficulty];
            
            difficultiesToShow.forEach(difficulty => {
                if (positionData[difficulty]) {
                    positionData[difficulty].forEach(drill => {
                        filtered.push({
                            ...drill,
                            difficulty: difficulty,
                            position: position
                        });
                    });
                }
            });
        });
        
        return filtered;
    };

    const filteredDrills = getFilteredDrills();

    const formatPositionName = (position) => {
        return position.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '#34a853';
            case 'medium': return '#f9ab00';
            case 'hard': return '#ea4335';
            default: return '#64748b';
        }
    };

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
                    onClick={() => setCurrentPage('Basketball Analysis')}
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

                {/* Sport Selection */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
                        Select Sport
                    </h2>
                    <select 
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '12px',
                            fontSize: '16px',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="basketball">🏀 Basketball</option>
                        <option value="soccer">⚽ Soccer</option>
                        <option value="tennis">🎾 Tennis</option>
                        <option value="football">🏈 Football</option>
                        <option value="volleyball">🏐 Volleyball</option>
                    </select>
                </div>

                {/* Basketball Drills Section */}
                {selectedSport === "basketball" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Filters */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            padding: '20px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            marginBottom: '20px'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1e293b' }}>
                                Basketball Drills
                            </h2>
                            <p style={{ color: '#64748b', marginBottom: '16px', lineHeight: '1.5' }}>
                                Filter drills by position and difficulty level to find the perfect exercises for your training.
                            </p>
                            
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <div style={{ flex: '1', minWidth: '150px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                                        Position:
                                    </label>
                                    <select 
                                        value={selectedPosition}
                                        onChange={(e) => setSelectedPosition(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '10px',
                                            fontSize: '14px',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <option value="all">All Positions</option>
                                        <option value="point-guard">Point Guard</option>
                                        <option value="shooting-guard">Shooting Guard</option>
                                        <option value="small-forward">Small Forward</option>
                                        <option value="power-forward">Power Forward</option>
                                        <option value="center">Center</option>
                                    </select>
                                </div>
                                
                                <div style={{ flex: '1', minWidth: '150px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b' }}>
                                        Difficulty:
                                    </label>
                                    <select 
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '10px',
                                            fontSize: '14px',
                                            backgroundColor: 'white'
                                        }}
                                    >
                                        <option value="all">All Levels</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Drills Grid */}
                        {filteredDrills.length > 0 ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: '16px',
                                marginBottom: '24px'
                            }}>
                                {filteredDrills.map((drill, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '16px',
                                            padding: '20px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                            border: `2px solid ${getDifficultyColor(drill.difficulty)}20`,
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            cursor: 'pointer'
                                        }}
                                        whileHover={{ 
                                            scale: 1.02,
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '12px'
                                        }}>
                                            <h3 style={{ 
                                                fontSize: '16px', 
                                                fontWeight: '700', 
                                                color: '#1e293b',
                                                margin: 0,
                                                flex: 1
                                            }}>
                                                {drill.name}
                                            </h3>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                backgroundColor: `${getDifficultyColor(drill.difficulty)}20`,
                                                color: getDifficultyColor(drill.difficulty),
                                                marginLeft: '8px'
                                            }}>
                                                {drill.difficulty.toUpperCase()}
                                            </span>
                                        </div>
                                        
                                        <p style={{ 
                                            fontSize: '14px', 
                                            color: '#64748b', 
                                            lineHeight: '1.5',
                                            marginBottom: '12px'
                                        }}>
                                            {drill.description}
                                        </p>
                                        
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            fontSize: '12px',
                                            color: '#94a3b8'
                                        }}>
                                            <span>⏱️ {drill.duration}</span>
                                            <span>🏀 {drill.position ? formatPositionName(drill.position) : ''}</span>
                                        </div>
                                        
                                        {drill.focus && drill.focus.length > 0 && (
                                            <div style={{ 
                                                display: 'flex', 
                                                flexWrap: 'wrap', 
                                                gap: '6px',
                                                marginTop: '12px'
                                            }}>
                                                {drill.focus.map((focus, idx) => (
                                                    <span 
                                                        key={idx}
                                                        style={{
                                                            padding: '2px 8px',
                                                            backgroundColor: '#e2e8f0',
                                                            color: '#475569',
                                                            borderRadius: '8px',
                                                            fontSize: '11px',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                        {focus}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                padding: '40px 24px',
                                textAlign: 'center',
                                color: '#64748b',
                                fontSize: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                marginBottom: '24px'
                            }}>
                                No drills found. Try selecting different filters.
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Practice Video Cards (for other sports) */}
                {selectedSport !== "basketball" && (
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
                        {practiceResources
                            .filter(res => res.title.includes(selectedSport === "soccer" ? "⚽" : 
                                                           selectedSport === "tennis" ? "🎾" :
                                                           selectedSport === "football" ? "🏈" :
                                                           selectedSport === "volleyball" ? "🏐" : ""))
                            .map((res, idx) => (
                            <a
                                key={idx}
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
                )}

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
