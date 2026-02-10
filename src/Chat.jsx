import React from 'react'
import './Chat.css';
import { MyContext } from './Mycontex.jsx';
import { useState, useContext ,useEffect} from 'react';
// react-markdown is a library that converts markdown text to react components
import ReactMarkdown from 'react-markdown';
// rehype-highlight is a library that adds syntax highlighting to code blocks in markdown
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Import a highlight.js theme





const Chat = () => {

    const { newChat, previousChats,responses } = useContext(MyContext);
    const [latest, setLatest] = useState(null);


    useEffect(() => {
     if(responses===null){
            setLatest(null);
            return;
        }
        if (!previousChats?.length ){
            return;
        } 
        const content=responses.split(" ");
        let idx=0;
        const intervalId=setInterval(()=>{

            setLatest(content.slice(0,idx+1).join(" "));
            idx++;
            if(idx>=content.length){
                clearInterval(intervalId);
            }
        },40);

return () => clearInterval(intervalId);


    }, [previousChats,responses]);

    return (
        <>
            {newChat && <h1>    Welocme back  </h1>}
            <div className="chats">
                {

                     previousChats?.slice(0,-1).map((chat, idx) =>

                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {


                                chat.role === "user" ?
                                    <p className='userMessage'>{chat.content}</p> :
                                   <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{chat.content}</ReactMarkdown>
                            }

                        </div>


                    )


                }

                {previousChats?.length > 0 && latest!==null && <div className="gptDiv" key={"typing"}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{latest}</ReactMarkdown>
                </div>}

                 {previousChats?.length > 0 && latest===null && <div className="gptDiv" key={"non-typing"}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{previousChats[previousChats.length - 1]?.content}</ReactMarkdown>
                </div>}
            </div>

        </>
    )
}

export default Chat