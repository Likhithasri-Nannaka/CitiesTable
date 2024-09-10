import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherPage from './components/WeatherPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Cities Table page */}
          <Route path="/" element={<CitiesTable />} />
          {/* Weather details page */}
          <Route path="/weather/:cityName" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
