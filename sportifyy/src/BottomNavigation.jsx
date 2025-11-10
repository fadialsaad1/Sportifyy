import React from 'react';

const BottomNavigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { img: '/home_icon.png', label: 'Home' },
    { img: '/progress_icon.png', label: 'Progress' },
    { img: '/routine_icon.png', label: 'Practice' },
    { img: '/settings_icon.png', label: 'Profile' },
    { img: '/settings_icon.png', label: 'Sign in' }, // Using settings icon as fallback for now
  ];

  return (
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
      {navItems.map((item, i) => (
        <button 
          key={i} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: item.label === currentPage ? '#1e293b' : '#64748b',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            padding: '8px',
            minWidth: item.label === 'Progress' ? '80px' : '60px',
            maxWidth: item.label === 'Progress' ? '90px' : '70px',
            width: item.label === 'Progress' ? '85px' : '65px' // Fixed width to prevent shrinking
          }}
          onMouseEnter={(e) => {
            if (item.label !== currentPage) {
              e.currentTarget.style.color = '#1e293b';
            }
          }}
          onMouseLeave={(e) => {
            if (item.label !== currentPage) {
              e.currentTarget.style.color = '#64748b';
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
              width: '24px', 
              height: '24px', 
              marginBottom: '4px'
            }} 
          />
          <span style={{fontSize: '12px', textAlign: 'center', wordWrap: 'break-word'}}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;