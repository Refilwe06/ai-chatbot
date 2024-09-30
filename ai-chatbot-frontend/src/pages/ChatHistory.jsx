import React, { useContext, useEffect } from 'react';
import ChatCard from '../components/ChatCard';
import Text from '../components/Text';
import { ChatContext } from '../context/ChatContext';
import NoQuestionsAdded from '../components/NoQuestionsAdded';
import useChatAPI from '../hooks/useChatAPI';
import InputSection from '../components/InputSection';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';

const ChatHistory = () => {
    const { setChatData, chatData } = useContext(ChatContext);
    const { user } = useContext(UserContext);
    const { getMessages, clearHistory } = useChatAPI(user?.user_id, localStorage.getItem('token'));
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    const handleClearChatHistory = async () => {
        try {
            showLoader();
            const res = await clearHistory();
            if (res) {
                setChatData(res);
            } else {
                throw new Error('Failed to clear chat history');
            }
        } catch (err) {
            console.error(err);
            alert(err.message || 'Failed to fetch chats');
        } finally {
            hideLoader();
        }
    };

    useEffect(() => {
        const fetchChats = async () => {
            showLoader();
            try {
                const res = await getMessages(user.user_id);
                if (Array.isArray(res)) {
                    const userMessages = res.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setChatData(prevChatData => {
                        if (JSON.stringify(prevChatData) !== JSON.stringify(userMessages)) {
                            return Array.from(
                                new Map(userMessages.map(chat => [chat.session_id, chat])).values()
                            );;
                        }
                        return Array.from(
                            new Map(prevChatData.map(chat => [chat.session_id, chat])).values()
                        );
                    });
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error('Error fetching chats:', err);
                alert(err.message || 'Failed to fetch chats');
            } finally {
                hideLoader();
            }
        }

        fetchChats();
    }, [user]);

    return (
        <>
            <div className="flex flex-col top-section">
                <div className='flex flex-col text'>
                    <Text text={'Get answers in seconds'} fontWeight={600} fontSize={18} />
                    <Text text={'Create and complete tasks using boards'} fontWeight={400} fontSize={14} color='#727676' />
                </div>
                <div className='no-questions-added shadow'>
                    {chatData.length === 0 ? (
                        <NoQuestionsAdded />
                    ) : (
                        <>
                            <div className="flex space-between">
                                <Text text={'Search History'} fontWeight={600} fontSize={14} />
                                <div className="clear-chat-history flex items-center pointer" onClick={handleClearChatHistory}>
                                    <Text text={'Clear Chat History'} fontWeight={600} fontSize={14} color='#6a6b70' />
                                </div>
                            </div>
                            <div className="flex space-between flex-wrap chat-cards">
                                {chatData.map((chatHistory, index) => (
                                    <ChatCard
                                        key={index}
                                        width={'49%'}
                                        chatHistory={chatHistory}
                                        onClick={() => navigate(`/view-chat/${chatHistory.session_id}`)}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            <InputSection />
        </>
    );
};

export default ChatHistory;
