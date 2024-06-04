import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header_footer/Header';
import Contact from './components/contact/Contact';
import Home from './components/Home';
import About from './components/about/About';
import ViewJudgment from './components/search_results/ViewJudgment';
import SearchResults from './components/search_results/SearchResults';
import './App.css';
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import Bookmarks from './components/dashboard/Bookmarks';
import { UserProvider } from './UserContext';
import ProtectedRoute from './ProtectedRoute';



const App = () => {

  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/viewjudgment/:JudgmentID" element={<ViewJudgment />} />
        <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
