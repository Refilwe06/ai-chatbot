import Text from './Text';
import chatBubbles from '../assets/chat-bubbles.png';

const NoQuestionsAdded = () => {
    return (
        <>
            <Text text={'Search History'} fontWeight={600} fontSize={14} />
            <div className='flex flex-col items-center gap-3'>
                <div className="chat-bubbles">
                    <img src={chatBubbles} alt="chat-bubble" width={'100%'} />
                </div>
                <div className='flex flex-col items-center text'>
                    <Text text={'No Questions added'} fontWeight={600} fontSize={18} />
                    <Text text={'Type your questions to below input and get fast answers'} fontWeight={400} fontSize={14} color='#727676' />
                </div>
            </div>
        </>
    )
}

export default NoQuestionsAdded;