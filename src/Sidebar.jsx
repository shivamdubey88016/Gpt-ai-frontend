import React from 'react'
import './Sidebar.css';
import { MyContext } from './Mycontex.jsx';
import { useContext } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import logo from './assets/chat-gpt.png'


const Sidebar = () => {
  const { allThreads, setAllThreads, currThread, newChat, setNewChat, setPrompts, responses, setResponses, setCurrThread, setPreviousChats } = useContext(MyContext);
  const getAllThreads = async () => {
    try {
      const response = await fetch('https://gpt-ai-backend-77w5.onrender.com/api/threads');
      const data = await response.json();
      const threads = data.map(thread => ({
        threadId: thread.threadId,
        title: thread.title
      }));
      setAllThreads(threads);
    } catch (err) {
      console.log('Error fetching threads:', err);
    }

  }
  useEffect(() => {
    getAllThreads();
  }, [currThread])

  const createNewChat = () => {
    setNewChat(true);
    setPrompts('');
    setResponses(null);
    setCurrThread(uuidv4());
    setPreviousChats([]);


  }
  // Function to change the current thread and fetch its details(when you on thread history in sidebar)
  const changeThread = async (newThreadId) => {
    setCurrThread(newThreadId);

    try {
      const response = await fetch(`https://gpt-ai-backend-77w5.onrender.com/${newThreadId}`);
      const data = await response.json();


      setPreviousChats(data.messages || []);

      setNewChat(false);
      setResponses(null);
    } catch (err) {
      console.log('Error fetching thread details:', err);
    }
  };

  return (



    <>
      <section className="sidebar">
        <button onClick={createNewChat}>
          <img src={logo} alt="Sidebar Icon" className='logo'></img>
          <span> <i className="fa-solid fa-pen-to-square" style={{ color: "#ffffff" }}></i></span>

        </button>

        <ul className='history'>
          {

            allThreads?.map((thread, id) => (
              <li key={id}
                onClick={() => changeThread(thread.threadId)}>{thread.title}
                &nbsp;
                &nbsp;
                <i className="fa-solid fa-delete-left" id="delete" onClick={(e)=>{
                  //delete thread
                  e.stopPropagation();
                  fetch(`https://gpt-ai-backend-77w5.onrender.com/${thread.threadId}`,{
                    method:'DELETE'
                  }).then(res=>res.json())
                  .then(data=>{
                    console.log(data);
                    getAllThreads();
                    if(currThread===thread.threadId){
                      setCurrThread(null);
                      setPreviousChats([]);
                      setPrompts('');
                      setResponses(null);
                      setNewChat(true);
                    }
                  }).catch(err=>{
                    console.log('Error deleting thread:',err);
                  })
                }}></i>
                
                </li>
            ))
 }

        </ul>
        <div className='settings'>
      
        </div>

      </section>


    </>
  )
}

export default Sidebar
