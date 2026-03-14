import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PadaukRain from './components/PadaukRain';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import { usePlayer } from './hooks/usePlayer';

import Home from './pages/Home';
import Archive from './pages/Archive';
import Traditions from './pages/Traditions';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  const { currentTrack } = usePlayer();

  return (
    <Router>
      <div className="min-h-screen relative flex flex-col">
        <PadaukRain />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/traditions" element={<Traditions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
        <AudioPlayer />
      </div>
    </Router>
  );
}

export default App;
