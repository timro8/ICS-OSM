import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useLocation } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

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
          <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/"><h1>ICS-OSM</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
          <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
            <Nav className="me-auto justify-content-start">
              {currentUser ? ([
                <Nav.Link id={COMPONENT_IDS.NAVBAR_FACULTY} as={NavLink} to="/faculty" key="faculty">Faculty</Nav.Link>,
                <Nav.Link id={COMPONENT_IDS.NAVBAR_RESERVE_ROOM} as={NavLink} to="/discus" key="discus">Discuss</Nav.Link>,
              ]) : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
                [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin</Nav.Link>,
                  <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_ROOM_ADMIN} as={NavLink} to="/adminroom" key="adminroom">Room Admin</Nav.Link>,
                ]
              ) : ''}
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN, ROLE.FACULTY, ROLE.TECH, ROLE.OFFICE]) ? (
                [<Nav.Link id={COMPONENT_IDS.NAVBAR_RESERVE_ROOM} as={NavLink} to="/cal" key="cal">Reserve</Nav.Link>,
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
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_PROFILE} as={NavLink} to="/profile/:_id  "><PersonFill />Profile</NavDropdown.Item>
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
