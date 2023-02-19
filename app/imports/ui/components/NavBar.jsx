import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useLocation } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { facultyId, ready, currentUser } = useTracker(() => {
    const user = Meteor.user() ? Meteor.user().username : '';
    const subscription = FacultyProfiles.subscribeFacultyProfile();
    const rdy = subscription.ready();
    const facultyItems = FacultyProfiles.find({ email: user }).fetch();

    return ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
      facultyId: facultyItems.length > 0 ? facultyItems[0]._id : '',
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
