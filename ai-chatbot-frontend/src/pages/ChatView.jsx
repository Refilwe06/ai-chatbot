import React, { useContext, useEffect, useRef, useState } from 'react'
import Text from '../components/Text'
import { ChatContext } from '../context/ChatContext'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import useChatAPI from '../hooks/useChatAPI'
import InputSection from '../components/InputSection'
import Icon from '../components/Icon'
import getIconPath from '../utilities/getIcons'
import chatIcon from '../assets/chat-icon.png'
import { useLoader } from '../context/LoaderContext'
const ChatView = () => {
    const { chatData, setChatData } = useContext(ChatContext);
    const { user } = useContext(UserContext);
    const { session_id } = useParams();
    const [selectedChat, setSelectedChat] = useState(null);
    const { getMessages, reviewAnswer } = useChatAPI(user?.user_id, localStorage.getItem('token'));
    const { showLoader, hideLoader } = useLoader();
    const sectionRef = useRef(null);

    const handleScroll = () => {
        sectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const getChat = async () => {
        try {
            showLoader();
    
            // Check if chatData exists and is empty
            if (!chatData || chatData.length === 0) {
                const chats = await getMessages(user.user_id) || [];
                setChatData(chats); // Set chat data when no chats exist
                return;
            }
    
            // Find chat by session_id
            const selectedChat = chatData.find((chat) => chat.session_id === +session_id);
    
            if (selectedChat) {
                setSelectedChat(selectedChat); // If found, set the selected chat
                setTimeout(() => handleScroll(), 1); // Scroll after setting chat
                return;
            }
    
            // If no chat is found, alert the user (Optional)
            alert("Chat not found");
    
        } catch (error) {
            console.log('Error getting chat:', error);
            alert(error || 'Error getting chat');
        } finally {
            hideLoader(); // Always hide loader, whether successful or failed
        }
    };
    

    useEffect(() => {
        if (user) getChat();
    }, [user, chatData]);

    const chips = [{ label: 'Correct answer', value: true, icon: 'like' }, { label: 'Wrong answer', value: false, icon: 'dislike' }];

    const handleChipClick = async (review) => {
        try {
            showLoader();
            const chat = await reviewAnswer(selectedChat.session_id, review);
            return setSelectedChat(chat[0]);
        } catch (response) {
            alert(response || 'Error sending answer review');
        } finally {
            hideLoader();
        }

    }
    return (
        <>
            <div className="flex flex-col space-between ">
                <div className='no-questions-added shadow'>
                    {
                        !selectedChat
                            ?
                            <Text text={session_id ? `Error finding chat with session id: ${session_id}` : 'No chat selected'} />
                            :
                            <>
                                <div className='flex flex-col gap-1'>
                                    <div className="flex space-between items-center gap-1">
                                        <div className="flex items-center">
                                            <img style={{ marginRight: '1em' }} src={chatIcon} alt="chat-icon" className='chat-icon' width={40} />
                                            <Text text={selectedChat.first_question} fontWeight='500' textTransform={'capitalize'} />
                                        </div>
                                        <div className="options flex round">
                                            <Icon path={getIconPath('horizontal_dots')} strokeWidth={4} onClick={() => { }} />
                                        </div>
                                    </div>
                                    <div className="chat-section flex flex-col gap-1">
                                        <Text text={selectedChat?.question_history?.[1].content} />
                                        {
                                            selectedChat.question_history?.slice(2)?.map((_item, index) => {
                                                const chatArraySlice = [...selectedChat.question_history.slice(2)];
                                                const arrayToMapWith = chatArraySlice.map((item, indx) => {
                                                    if (indx % 2 === 0) {
                                                        return {
                                                            question: item.content,
                                                            answer: chatArraySlice[indx + 1].content
                                                        }
                                                    }
                                                    return null;
                                                }).filter(item => item);

                                                return (
                                                    arrayToMapWith[index] && <div key={index} className="flex flex-col gap-1 chat-bubble">
                                                        <div className="flex items-center">
                                                            <img style={{ marginRight: '1em' }} src={chatIcon} alt="chat-icon" className='chat-icon' width={40} />
                                                            <Text text={arrayToMapWith[index]?.question} fontWeight='600' textTransform={'capitalize'} />
                                                        </div>
                                                        <Text text={arrayToMapWith[index]?.answer} />
                                                    </div>
                                                )

                                            })
                                        }
                                        <div className="flex" ref={sectionRef}>
                                            {chips.map((chip, indx) => {
                                                const answer = selectedChat?.is_correct_answer;
                                                return (<div key={indx} className={`flex items-center chips pointer ${((answer > 0 && chip.value) || (answer === 0 && !chip.value)) ? 'selected-answer' : 'wrong-answer'}`} onClick={() => handleChipClick(chip.value)}>
                                                    <Icon path={getIconPath(chip.icon)} width={18} height={18} />
                                                    <Text text={chip.label} fontSize={14} />
                                                </div>)
                                            })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>

            </div>
            <InputSection session_id={session_id} />
        </>
    )
}

export default ChatView