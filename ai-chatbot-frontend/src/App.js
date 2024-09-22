import './App.css';
import Sidenav from './components/Sidenav';
import Header from './components/Header';
import NoQuestionsAdded from './components/NoQuestionsAdded';
import Text from './components/Text';
import Icon from './components/Icon';
import getIconPath from './utilities/getIcons';
import ChatCard from './components/ChatCard';

function App() {
  return (
    <div className="app-wrapper">
      <div className="sidenav">
        <Sidenav />
      </div>
      <div className="main-content">
        <Header />
        <div className="content">
          <div className="flex flex-col top-section">
            <div className='flex flex-col text'>
              <Text text={'Get answers in seconds'} fontWeight={600} fontSize={18} />
              <Text text={'Create and complete tasks using boards'} fontWeight={400} fontSize={14} color='#727676' />
            </div>
            <div className='no-questions-added shadow'>
              {/* <NoQuestionsAdded /> */}
              <div className="flex space-between ">
                <Text text={'Search History'} fontWeight={600} fontSize={14} />
                <div className="clear-chat-history flex items-center">
                  <Text text={'Clear Chat History'} fontWeight={600} fontSize={14} color='#6a6b70' />
                </div>
              </div>
              <div className="flex space-between flex-wrap chat-cards">
                {
                  [1, 2, 3].map((chat, index) => {
                    return <ChatCard key={index} width={'49%'} />
                  })
                }
              </div>
            </div>

          </div>

          <div className="flex flex-col bottom-section">
            <div className="input-container">
              <input type="text" placeholder='Write Coding about new HTML Tags' width={'100%'} />
              <div className="input-icons flex absolute">
                <Icon width={22} height={22} path={getIconPath('microphone')} strokeWidth={1.7} color='#5d5d65' classes='pointer' />
                <Icon width={20} height={20} path={getIconPath('paper_plane')} strokeWidth={1.7} color='#5d5d65' classes='paper-plane-icon pointer' />
              </div>
            </div>
            <Text text={'Superpage AI Chat V1.2'} fontSize={12} fontWeight={500} color='#5d5d65' className={'app-version'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
