import React from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <ChatList />
      <ChatWindow />
    </div>
  );
}