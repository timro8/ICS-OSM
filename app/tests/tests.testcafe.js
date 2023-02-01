import { listStuffAdminPage, /* manageDatabasePage, */ signOutPage, listRoomPage, listRoomAdminPage, facultyPage } from './simple.page';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { signUpPage } from './signup.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const facultyCredentials = { username: 'faculty@foo.com', password: 'changeme' };
const studentCredentials = { username: 'student@foo.com', password: 'changeme' };
const officeCredentials = { username: 'office@foo.com', password: 'changeme' };
const techCredentials = { username: 'tech@foo.com', password: 'changeme' };
// const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

async function signinAndSignout(username, password) {
  await navBar.gotoSignInPage();
  await signInPage.signin(username, password);
  await navBar.isLoggedIn(username);
  await navBar.logout();
  await signOutPage.isDisplayed();
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
  await navBar.gotoListRoomPage();
  await listRoomPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that sign up page shows up', async () => {
  await navBar.gotoSignUpPage();
  await signUpPage.isDisplayed();
});

test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomPage();
  await listRoomPage.isDisplayed();
  await navBar.gotoListStuffAdminPage();
  await listStuffAdminPage.isDisplayed();
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await navBar.gotoFacultyPage();
  await facultyPage.isDisplayed();
});
