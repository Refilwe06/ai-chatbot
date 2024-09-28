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
import Loader from './components/Loader';
import ProtectedRoutes from './utilities/ProtectedRoutes';
function App() {
  return (
    <BrowserRouter>
      <Loader />
      <div className="app-wrapper">
        <UserProvider>
          <div className="sidenav hide">
            <Sidenav />
          </div>
          <div className="main-content">
            <Header />
            <div className="content">
              <ChatProvider>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='login' element={<Login />} />
                  <Route path='register' element={<Register />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path='chat-history' element={<ChatHistory />} />
                    <Route path='view-chat/:session_id' element={<ChatView />} />
                  </Route>
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
