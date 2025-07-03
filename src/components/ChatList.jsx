import React from 'react';
import '../Chatlist.css';

const users = [
  { name: 'Pak RT', time: '17:46', initial: 'P', color: '#535ADF', active: true },];

export default function ChatList() {
  return (
    <div className="chat-list">
      {users.map((user, index) => (
        <div
          key={index}
          className={`chat-user ${user.active ? 'active' : ''}`}
        >
          <div className="user-avatar" style={{ backgroundColor: user.color }}>
            {user.initial}
          </div>
          <div className="user-details">
            <div className="user-header">
              <span className="user-name">{user.name}</span>
              <span className="user-time">{user.time}</span>
            </div>
            <p className="user-snippet">Lorem ipsum dolor sit amet...</p>
          </div>
          {user.active && <div className="active-bar" />}
        </div>
      ))}
    </div>
  );
}