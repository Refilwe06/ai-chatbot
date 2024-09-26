import React, { useContext, useEffect } from 'react'
import ChatCard from '../components/ChatCard'
import Text from '../components/Text'
import { ChatContext } from '../context/ChatContext'
import NoQuestionsAdded from '../components/NoQuestionsAdded'
import useChatAPI from '../hooks/useChatAPI'
import InputSection from '../components/InputSection'
import { UserContext } from '../context/UserContext'

const ChatHistory = () => {
    const { setChatData, chatData = [] } = useContext(ChatContext);
    const { user } = useContext(UserContext);
    const { getMessages } = useChatAPI(user?.user_id, localStorage.getItem('token'));

    const getChats = async () => {
        if (user) {
            const userMessages = (await getMessages(user?.user_id))?.sort((a, b) => (new Date(b.created_at).getTime()) - (new Date(a.created_at).getTime()));;
            setChatData(userMessages);
        }

    };
    useEffect(() => {
        getChats();
    }, [user])

    return (
        <>
            <div className="flex flex-col top-section">
                <div className='flex flex-col text'>
                    <Text text={'Get answers in seconds'} fontWeight={600} fontSize={18} />
                    <Text text={'Create and complete tasks using boards'} fontWeight={400} fontSize={14} color='#727676' />
                </div>
                <div className='no-questions-added shadow'>
                    {
                        chatData.length === 0
                            ?
                            <NoQuestionsAdded />
                            :
                            <>
                                <div className="flex space-between ">
                                    <Text text={'Search History'} fontWeight={600} fontSize={14} />
                                    <div className="clear-chat-history flex items-center pointer">
                                        <Text text={'Clear Chat History'} fontWeight={600} fontSize={14} color='#6a6b70' />
                                    </div>
                                </div>
                                <div className="flex space-between flex-wrap chat-cards">
                                    {
                                        chatData.map((chatHistory, index) => {
                                            // Using the element in the array below to create a single instance of the ChatCard per list of questions
                                            return [1].map((_chatSession, index) => {
                                                return <ChatCard key={index} width={'49%'} chatHistory={chatHistory} />
                                            })
                                        })
                                    }
                                </div></>
                    }
                </div>

            </div>
            <InputSection />
        </>
    )
}

export default ChatHistory