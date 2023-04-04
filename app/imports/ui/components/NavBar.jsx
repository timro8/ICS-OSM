import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useLocation } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Clubs } from '../../api/club/Club';
import LoadingSpinner from './LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import AddClub from './AddClub';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { facultyId, clubs, ready, currentUser } = useTracker(() => {
    const user = Meteor.user() ? Meteor.user().username : '';
    const subscription = FacultyProfiles.subscribeFacultyProfile();
    const subscription2 = Clubs.subscribeClub();
    const rdy = subscription.ready() && subscription2.ready();
    const facultyItems = FacultyProfiles.find({ email: user }).fetch();
    const clubItems = Clubs.find({}).fetch();
    return ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
      facultyId: facultyItems.length > 0 ? facultyItems[0]._id : '',
      clubs: clubItems,
      ready: rdy,
    });
  }, []);

  const menuStyle = {
    boxShadow: '0px 0px 10px rgb(0 0 0 /20%)',
    background: '#FFF',
  };

  const handleSignout = async () => {
    await Meteor.logout(() => {
      window.location.assign('/');
    });
  };
  const location = useLocation();

  return (!(location.pathname === '/' || location.pathname === '/signin') ?
    (
      <Navbar expand="lg" style={menuStyle} className="px-3">
        <Container fluid>
          <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/">
            <img
              src="/images/Hawaii_Warriors_logo.svg.png"
              width="70"
              className="d-inline-block align-top"
              alt="UH Manoa logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
          <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
            <Nav className="me-auto justify-content-start">
              {currentUser ? ([
                <Nav.Link id={COMPONENT_IDS.NAVBAR_HOME} as={NavLink} to="/home" key="faculty">Home</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FACULTY} as={NavLink} to="/faculty" key="faculty">Faculty</Nav.Link>,
                <NavDropdown id={COMPONENT_IDS.NAVBAR_DROPDOWN_CLUB} title="Clubs">
                  {ready && clubs ? (
                    clubs.map((club) => (<Nav.Link className="d-flex justify-content-center" as={NavLink} to={`/clubs/${club._id}`} key={`${club._id}`}> {club.clubName} </Nav.Link>))
                  ) : <LoadingSpinner message="Loading Club" /> }
                  <Nav.Item className="d-flex justify-content-center">
                    <AddClub />
                  </Nav.Item>
                </NavDropdown>,
              ]) : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
                [
                  <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_ROOM_ADMIN} as={NavLink} to="/adminroom" key="adminroom">Room Admin</Nav.Link>,
                ]
              ) : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.FACULTY, ROLE.TECH, ROLE.OFFICE]) ? (
                [<Nav.Link id={COMPONENT_IDS.NAVBAR_RESERVE_ROOM} as={NavLink} to="/cal" key="cal">Reserve</Nav.Link>,
                ]
              ) : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.TECH, ROLE.ADMIN]) ? (
                [<Nav.Link id={COMPONENT_IDS.NAVBAR_DROPDOWN_TECH} as={NavLink} to="/tech" key="cal">Tech</Nav.Link>,
                ]
              ) : ''}
            </Nav>
            <Nav className="justify-content-end">
              {currentUser === '' ? (
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} as={NavLink} to="/signin">
                  Login
                </Nav.Link>
              ) : (
                <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                  {ready && facultyId ? (
                    <NavDropdown.Item
                      id={COMPONENT_IDS.NAVBAR_PROFILE}
                      as={NavLink}
                      to={`/profile/${facultyId}`}
                    >
                      <PersonFill />Profile
                    </NavDropdown.Item>
                  ) : ''}
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} onClick={handleSignout}><BoxArrowRight />Sign out</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    ) : ''
  );
};

export default NavBar;
