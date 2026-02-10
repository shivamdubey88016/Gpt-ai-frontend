import React from 'react'
import './ChatWindo.css';
import { MyContext } from './Mycontex.jsx';
import { ScaleLoader } from 'react-spinners';
import { useState, useContext, useEffect } from 'react';
import Chat from './Chat.jsx';







//import Chat from './Chat.jsx';
const ChatWindo = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { prompts, setPrompts, responses, setResponses, currThread, setCurrThread, previousChats, setPreviousChats ,setNewChat} = useContext(MyContext);
  const getResponse = async () => {
setNewChat(false);
    setLoading(true);


    const options = {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        threadId: currThread,
        message: prompts
      })

    };
    try {
      const response = await fetch('https://gpt-ai-backend-77w5.onrender.com/api/chats', options);
      const data = await response.json();
      console.log(data.reply);
      setResponses(data.reply);

      setLoading(false);


    } catch (err) {
      console.log(err);
    }



  }
  //append new chat to previous chats
  useEffect(() => {

    if (prompts && responses) {
      setPreviousChats(previousChats => ([
        ...previousChats,
        {
          role: "user",
          content: prompts
        },
        {
          role: "assistant",
          content: responses
        }



      ]));}
 setPrompts('');
}, [responses]);


const handelProfileClick=()=>{
  setIsOpen(!isOpen);
}
  return (
    <>
      <div className="chat-window">
        <div className="navbar">

          <span>Dev tool &nbsp; <i className="fa-solid fa-angle-down"></i> </span>
          <div className="userIcon" onClick={handelProfileClick}>
            <span><i className="fa-solid fa-user" id="ui"></i></span>
          </div>
        </div>
{
isOpen && <div className="userMenu">
  <div className="dropDownItem">Upgrade plan <i className="fa-solid fa-arrow-up-right-from-square"></i></div>
  <div className="dropDownItem">Settings <i className="fa-solid fa-gear"></i></div>

  <div className="dropDownItem">Logout <i className="fa-solid fa-sign-out"></i></div>
   <div className="dropDownItem">signup <i className="fa-solid fa-user-plus"></i></div>


  
</div>



}
        <Chat></Chat>
      

        <ScaleLoader color='white' loading={loading} className='loader' size={150}>

        </ScaleLoader>


        <div className="chatInput">
          <div className="userInput">
            <input type="text" placeholder='Type your message here...' value={prompts} onChange={(e) => setPrompts(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? getResponse() : null}

            ></input>


            <div id='submit' onClick={getResponse}><i className="fa-solid fa-arrow-up-right-from-square" ></i></div>
          </div>
          <p className='info'> shivam dubey</p>

        </div>
      </div>

    </>
  )
}

export default ChatWindo
