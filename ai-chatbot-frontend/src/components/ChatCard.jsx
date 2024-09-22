import chatIcon from '../assets/chat-icon.png';
import avatar from '../assets/avatar.png';
import Text from './Text';

const ChatCard = ({ width }) => {
    const count = 24;
    const timeLapsed = '24 mins';
    return (
        <div className="flex chat-card pointer" style={{ width }}>
            <div className="avatar-container">
                <img src={avatar} alt="avatar" className='avatar' />
                <img src={chatIcon} alt="chat-icon" className='absolute chat-icon' />
            </div>
            <div className="flex flex-col text ellipsis">
                <Text text={'How to design saas web application UI application UI'} fontSize={16} fontWeight='600' style={{ width: '80%' }} className={'ellipsis'} />
                <Text text={`${count} Questions asked • ${timeLapsed} ago`} fontSize={14} fontWeight='500' color='#727676' />
            </div>
        </div>
    )
}

export default ChatCard;