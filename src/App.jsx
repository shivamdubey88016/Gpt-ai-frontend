import React from 'react'
import './App.css'
import Sidebar from './Sidebar.jsx';
//import Chat from './Chat.jsx';  
import ChatWindo from './ChatWindo.jsx';
import { MyContext } from './Mycontex.jsx';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const App = () => {

  const [prompts, setPrompts] = useState('');
  const [allThreads, setAllThreads] = useState([]); // State to hold all threads
  const [responses, setResponses] = useState([]);
  const [currThread, setCurrThread] = useState(uuidv4());
  const [previousChats, setPreviousChats] = useState([]);// State to hold previous chats
  const [newChat, setNewChat] = useState(true); // State to trigger new chat creation
  const providerValues = { prompts, setPrompts, responses, setResponses, currThread, setCurrThread, previousChats, setPreviousChats, newChat, setNewChat, allThreads, setAllThreads };

  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar />


        <ChatWindo />
      </MyContext.Provider>
    </div>
  )
}

export default App
