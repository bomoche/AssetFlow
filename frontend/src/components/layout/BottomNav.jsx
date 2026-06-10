import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../constants/routes';

const navItems = [
  { path: ROUTES.PORTFOLIO, icon: 'pie_chart',  label: 'Portfolio' },
  { path: ROUTES.WITHDRAW,  icon: 'payments',   label: 'Withdraw'  },
  { path: ROUTES.HISTORY,   icon: 'history',    label: 'History'   },
];

export default function BottomNav() {
  return (
    <nav
      className="md:hidden flex"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        borderRadius: '50px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 16px',
        zIndex: 50,
      }}
    >
      {navItems.map(({ path, icon, label }) => (
        <NavLink
          key={path}
          to={path}
          style={{ textDecoration: 'none', flex: 1 }}
        >
          {({ isActive }) => (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              paddingTop: isActive ? '0px' : '8px',
              paddingBottom: '4px',
            }}>

              {/* Raised circle for active tab */}
              {isActive && (
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#0a2240',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '-28px',
                  marginBottom: '4px',
                  boxShadow: '0 4px 12px rgba(10,34,64,0.3)',
                }}>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: '#f5a623', fontSize: '22px' }}
                  >
                    {icon}
                  </span>
                </div>
              )}

              {/* Inactive icon */}
              {!isActive && (
                <span
                  className="material-symbols-outlined"
                  style={{ color: '#44474e', fontSize: '22px', marginBottom: '2px' }}
                >
                  {icon}
                </span>
              )}

              {/* Label */}
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive ? '#0a2240' : '#44474e',
              }}>
                {label}
              </span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}