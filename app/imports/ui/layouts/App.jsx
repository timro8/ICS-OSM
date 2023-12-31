import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Home from '../pages/home/Home';
import ListRoom from '../pages/ListRoom';
import ListRoomAdmin from '../pages/ListRoomAdmin';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import ReserveRoom from '../pages/ReserveRoom';
import SignUpRequest from '../pages/SignUpRequest';
import Faculty from '../pages/Faculty';
import FacultyProfile from '../pages/FacultyProfile';
import RoomDetails from '../pages/RoomDetails';
import LoadingSpinner from '../components/LoadingSpinner';
import Club from '../pages/Club';
import EditRoom from '../pages/EditRoom';
import Tech from '../pages/Tech';
import StaffProfile from '../pages/StaffProfile';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signuprequest" element={<SignUpRequest />} />
          <Route path="/profile/:_id" element={<FacultyProfile />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/clubs/:_id" element={<Club />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/listroom" element={<ProtectedRoute><ListRoom /></ProtectedRoute>} />
          <Route path="/adminroom" element={<AdminProtectedRoute ready={ready}><ListRoomAdmin /></AdminProtectedRoute>} />
          <Route path="/roomdetails/:_id" element={<ProtectedRoute><RoomDetails /></ProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cal" element={<ReserveRoom />} />
          <Route path="/editroom/:_id" element={<AdminProtectedRoute ready={ready}><EditRoom /></AdminProtectedRoute>} />
          <Route path="/tech/" element={<TechProtectedRoute ready={ready}><Tech /></TechProtectedRoute>} />
          <Route path="/staffprofile/:_id" element={<StaffProfile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

const OfficeProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);
  return (isLogged && isOffice) ? children : <Navigate to="/notauthorized" />;
};

const TechProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.TECH, ROLE.ADMIN]);
  return (isLogged && isOffice) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

// Require a component and location to be passed to each OfficeProtectedRoute.
OfficeProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

OfficeProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

// Require a component and location to be passed to each OfficeProtectedRoute.
TechProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

TechProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
