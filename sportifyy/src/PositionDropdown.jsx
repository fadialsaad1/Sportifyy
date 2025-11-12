import React, { useState, useEffect } from 'react';

const PositionDropdown = () => {
  const [position, setPosition] = useState('');
  const [user, setUser] = useState(null);

  const positions = [
    { value: 'Point Guard', tips: 'Focus on court vision, passing, and ball handling. Work on your decision-making and leadership skills.' },
    { value: 'Shooting Guard', tips: 'Develop your shooting accuracy and off-ball movement. Work on creating your own shot opportunities.' },
    { value: 'Small Forward', tips: 'Build versatility in scoring and defense. Work on driving to the basket and perimeter defense.' },
    { value: 'Power Forward', tips: 'Focus on rebounding, post moves, and mid-range shooting. Develop your physicality inside.' },
    { value: 'Center', tips: 'Work on rim protection, rebounding, and post scoring. Develop your footwork and defensive positioning.' }
  ];

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.basketballPosition) {
        setPosition(parsedUser.basketballPosition);
      }
    }
  }, []);

  const handleChange = (e) => {
    const newPosition = e.target.value;
    setPosition(newPosition);
    
    // Update user data in localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const updatedUser = {
        ...parsedUser,
        basketballPosition: newPosition
      };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const getPositionTips = () => {
    const positionObj = positions.find(pos => pos.value === position);
    return positionObj ? positionObj.tips : '';
  };

  if (!user) return null;

  return (
    <div style={{ 
      margin: '15px 0', 
      padding: '20px',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      borderRadius: '16px',
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '24px', marginRight: '10px' }}>🏀</span>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', fontSize: '16px' }}>
            Basketball Position
          </label>
          {position && (
            <span style={{ fontSize: '12px', opacity: '0.9' }}>
              Current: <strong>{position}</strong>
            </span>
          )}
        </div>
      </div>
      
      <select 
        value={position} 
        onChange={handleChange}
        style={{ 
          padding: '12px', 
          borderRadius: '8px', 
          border: '2px solid rgba(255,255,255,0.3)',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'white',
          width: '100%',
          fontSize: '14px',
          marginBottom: '10px'
        }}
      >
        <option value="">Select Your Position</option>
        {positions.map(pos => (
          <option key={pos.value} value={pos.value}>{pos.value}</option>
        ))}
      </select>
      
      {position && getPositionTips() && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          borderLeft: '3px solid #ff6b6b'
        }}>
          <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.4', fontStyle: 'italic' }}>
            💡 <strong>Tips for {position}:</strong> {getPositionTips()}
          </p>
        </div>
      )}
    </div>
  );
};

export default PositionDropdown;
