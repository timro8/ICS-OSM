import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
// import { signUpPage } from './signup.page';
import { navBar } from './navbar.component';
import { facultyPage } from './faculty.page';
import { facultyProfilePage } from './faculty-profile.page';
import { listRoomAdminPage } from './room-admin.page';
import { clubPage } from './club.page';
import { addFaculty } from './add-faculty.form';
import { editFaculty } from './edit-faculty.form';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const facultyCredentials = { username: 'esb@hawaii.edu', password: 'changeme' };
const studentCredentials = { username: 'student@foo.com', password: 'changeme' };
const officeCredentials = { username: 'office@foo.com', password: 'changeme' };
const techCredentials = { username: 'tech@foo.com', password: 'changeme' };
const addFacultyCredentials = { firstName: 'TEST', lastName: 'test', email: 'test@foo.com', password: 'changeme', bio: 'Hello World!', phone: '808-123-2567' };
const editFacultyCredentials = { firstName: 'TEST2', lastName: 'test2', bio: 'Hello ICS!', phone: '765-432-1808' };
// const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

/** Room */
const addNewRoom = { roomKey: 'POST1337', roomNumber: '1337', capacity: '1', roomSqFt: '150', picture: '#' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');
/*
test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

async function signinAndSignout(username, password) {
  await navBar.gotoSignInPage();
  await signInPage.signin(username, password);
  await navBar.isLoggedIn(username);
  await navBar.logout();
  await landingPage.isDisplayed();
}

test('Test that signin and signout work for all roles', async () => {
  await signinAndSignout(userCredentials.username, userCredentials.password);
  await signinAndSignout(adminCredentials.username, adminCredentials.password);
  await signinAndSignout(facultyCredentials.username, facultyCredentials.password);
  await signinAndSignout(studentCredentials.username, studentCredentials.password);
  await signinAndSignout(officeCredentials.username, officeCredentials.password);
  await signinAndSignout(techCredentials.username, techCredentials.password);
});

test('Test that user pages shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(userCredentials.username, userCredentials.password);
  await navBar.isLoggedIn(userCredentials.username);
  await navBar.logout();
  await landingPage.isDisplayed();
});

test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await navBar.gotoFacultyPage();
  await facultyPage.isDisplayed();
});

test('Room details shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
});
*/
test('Add Room', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.addRoom(addNewRoom);
});
/*
test('Navigating to profile from faculty page', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoFacultyPage();
  await facultyPage.isDisplayed();
  await facultyPage.gotoFacultyProfile();
  await facultyProfilePage.isDisplayed();
});

test('Modal shows for Edit Room', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.editRoom();
});

test('Navigating to club page', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoClubPage();
  await clubPage.isDisplayed();
});

test('Add faculty', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await addFaculty.addFaculty(addFacultyCredentials);
});

test('Edit faculty', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(facultyCredentials.username, facultyCredentials.password);
  await editFaculty.editFaculty(editFacultyCredentials);
});
*/
// TODO: implement test for adding room
// TODO: implement test for editing room
// TODO: implement test for adding club
// TODO: implement test for editing club
// TODO: implement test for tech page
// TODO: implement test for add jack
// TODO: implement test for edit jack
// TODO: implement test for add equipment
// TODO: implement test for edit equipment
// TODO: implement test for add note
