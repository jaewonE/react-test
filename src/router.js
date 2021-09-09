import React, { useState } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import ScrollApp from 'scrollTest/scrollApp';
import App from 'weatherAppProject/App';

const Navigation = ({ darkMode, setDarkMode }) => {
  return (
    <div
      className="navigation-container"
      style={{ backgroundColor: darkMode ? '#000' : '#fff' }}
    >
      <div className="navigation-wrapper">
        <Link to="/weatherApp">WeatherApp</Link>
        <Link to="/scrollApp">ScrollApp</Link>
      </div>
      <div className="set-darkMode">
        <div onClick={() => setDarkMode(!darkMode)}>{darkMode ? "Dark Mode" : "Light Mode"}</div>
      </div>
    </div>
  );
};

const AppRouter = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        </Route>
        <Route exact path="/weatherApp" component={App} /> {/* weatherApp */}
        <Route exact path="/scrollApp">
          <ScrollApp darkMode={darkMode} />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
