import chatIcon from '../assets/chat-icon.png';
import avatar from '../assets/avatar.png';
import Text from './Text';
import { timeLapsed } from '../utilities/setElapsedTime';
import { useEffect, useState } from 'react';

const ChatCard = ({ width, chatHistory, onClick }) => {
    const [chat_created_at, setCreatedAt] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setCreatedAt(timeLapsed(chatHistory.created_at))
        }, 1000);
    })

    return (
        <div className="flex chat-card pointer" style={{ width }} onClick={() => onClick()}>
            <div className="avatar-container">
                <img src={avatar} alt="avatar" className='avatar' />
                <img src={chatIcon} alt="chat-icon" className='absolute chat-icon' />
            </div>
            <div className="flex flex-col text ellipsis">
                <Text text={chatHistory.first_question} fontSize={16} fontWeight='600' style={{ width: '80%' }} className={'ellipsis'} />
                <Text text={`${chatHistory.question_history.length / 2} ${chatHistory.question_history.length / 2 > 1 ? 'Questions' : 'Question'} asked • ${chat_created_at}`} fontSize={14} fontWeight='500' color='#727676' />
            </div>
        </div>
    )
}

export default ChatCard;