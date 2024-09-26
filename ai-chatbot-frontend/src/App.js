import './App.css';
import Sidenav from './components/Sidenav';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatHistory from './pages/ChatHistory';
import { ChatProvider } from './context/ChatContext';
import { UserProvider } from './context/UserContext';
import ChatView from './pages/ChatView';
function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <UserProvider>
          <div className="sidenav">
            <Sidenav />
          </div>
          <div className="main-content">
            <Header />
            <div className="content">
              <ChatProvider>
                <Routes>
                  <Route path='login' element={<Login />} />
                  <Route path='register' element={<Register />} />
                  <Route path='/' element={<ChatHistory />} />
                  <Route path='chat-history' element={<ChatHistory />} />
                  <Route path='view-chat/:session_id' element={<ChatView />} />

                </Routes>
              </ChatProvider>

            </div>
          </div>
        </UserProvider>
      </div>
    </BrowserRouter>

  );
}

export default App;
