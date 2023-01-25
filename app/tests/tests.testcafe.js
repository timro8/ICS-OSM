import { /* manageDatabasePage, */ signOutPage, listRoomPage } from './simple.page';
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
const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

async function signin(username, password) {
  await navBar.gotoSignInPage();
  await signInPage.signin(username, password);
  await navBar.isLoggedIn(username);
  await navBar.logout();
  await signOutPage.isDisplayed();
}

test('Test that signin and signout work for all roles', async () => {
  await signin(userCredentials.username, userCredentials.password);
  await signin(adminCredentials.username, adminCredentials.password);
  await signin(facultyCredentials.username, facultyCredentials.password);
  await signin(studentCredentials.username, studentCredentials.password);
  await signin(officeCredentials.username, officeCredentials.password);
  await signin(techCredentials.username, techCredentials.password);
});

test('Test that list room page show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(userCredentials.username, userCredentials.password);
  await navBar.isLoggedIn(userCredentials.username);
  await navBar.gotoListRoomPage();
  await listRoomPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

// test('Test that sign up and sign out work', async () => {
//   await navBar.gotoSignUpPage();
//   await signUpPage.isDisplayed();
//   await signUpPage.signupUser(newCredentials.username, newCredentials.password);
//   await navBar.isLoggedIn(newCredentials.username);
//   await navBar.logout();
//   await signOutPage.isDisplayed();
// });
