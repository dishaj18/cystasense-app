import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Landing from './pages/Landing';
import RiskCheck from './pages/RiskCheck';
import CycleTracker from './pages/CycleTracker';
import Plans from './pages/Plans';
import Companion from './pages/Companion';
import Dashboard from './pages/Dashboard';
import WorkoutSession from './pages/WorkoutSession';
import VideoLibrary from './pages/VideoLibrary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/risk-check" element={<RiskCheck />} />
        <Route path="/cycle-tracker" element={<CycleTracker />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workout" element={<WorkoutSession />} />
        <Route path="/videos" element={<VideoLibrary />} />
      </Routes>
    </Router>
  );
}

export default App;
