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
import { techPageComponents } from './tech.page';
import { addStudentForm } from './add-student.form';
import { editStudentForm } from './edit-student.form';
import { addStaff } from './add-staff.form';
import { editStaff } from './edit-staff.form';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const facultyCredentials = { username: 'esb@hawaii.edu', password: 'changeme' };
const studentCredentials = { username: 'student@foo.com', password: 'changeme' };
const officeCredentials = { username: 'office@foo.com', password: 'changeme' };
const techCredentials = { username: 'tech@foo.com', password: 'changeme' };
const acmCredentials = { username: 'acm@foo.com', password: 'changeme' };
const toddCredentials = { username: 'toddtt@hawaii.edu', password: 'changeme' };
const addFacultyCredentials = { firstName: 'TEST', lastName: 'test', email: 'test@foo.com', password: 'changeme', bio: 'Hello World!', phone: '808-123-2567' };
const editFacultyCredentials = { firstName: 'TEST2', lastName: 'test2', bio: 'Hello ICS!', phone: '765-432-1808' };
const addStudentCredentials = { firstName: 'TEST', lastName: 'test', email: 'teststudent@foo.com', password: 'changeme' };
const editStudentCredentials = { firstName: 'Caitlyn', lastName: 'Belmont' };
const addStaffCredentials = { firstName: 'TEST3', lastName: 'test3', email: 'test3@foo.com', password: 'changeme', bio: 'Hello World!', phone: '808-123-2567' };

// const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

/** Club */
const addClubCredentials = { clubName: 'CLUBNAME', image: 'image', description: 'DESCRIPTION', joinLink: 'JOINLINK.COM', meetingDay: 'SUNDAY', meetingTime: '12AM', meetingLocation: 'MANOA', advisor: 'ADVISOR' };
const editClubCredentials = { clubName: 'CLUBNAME', image: 'image', description: 'DESCRIPTION', joinLink: 'JOINLINK.COM', meetingDay: 'SUNDAY', meetingTime: '12AM', meetingLocation: 'MANOA', advisor: 'ADVISOR' };
const addOfficerCrendentials = { studentId: 'acm@foo.com', clubId: 'ACManoa', isPresident: 'true', position: 'President' };

/** Room */
const addNewRoom = { roomKey: 'POST1337', roomNumber: '1337', capacity: '1', roomSqFt: '150', picture: '#' };

const addNewRoomEquipment = { quantity: '2', description: 'Herman Miller chairs', serialNumber: '100 and 101', assetTag: 'UH 100 and UH 101' };

const addNewRoomJack = { jackNumber: '8000', wallLocation: 'DH', IDFRoom: 'POST 320', description: 'close to ceiling' };

const addNewTechJack = { jackNumber: '9000', wallLocation: 'Ewa', IDFRoom: 'POST 320', description: 'with fax line' };

const addNewRoomDetailJack = { jackNumber: '7000', wallLocation: 'DH', IDFRoom: 'POST 320', description: '3 ft above the ground center' };

const addNewTechEquipment = { quantity: '2', description: 'Dell XPS 15', serialNumber: '2000DYX and 2000DZX', assetTag: 'UH 1001 and UH 1011' };

const editRoom = { capacity: '3', roomSqFt: '500' };

const editRoomEquipment = { quantity: '1', description: 'Herman Miller chair', serialNumber: '100', assetTag: 'UH 100' };

const editRoomJack = { jackNumber: '9000', wallLocation: 'DH', IDFRoom: 'POST 399', description: '2 fax lines' };

const editTechEquipment = { quantity: '1', description: 'Dell XPS 17', serialNumber: '2000DZX', assetTag: 'UH 1001' };

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

test('Navigating to profile from faculty page', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoFacultyPage();
  await facultyPage.isDisplayed();
  await facultyPage.gotoFacultyProfile();
  await facultyProfilePage.isDisplayed();
});

test('Navigating to club page', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoClubPage();
  await clubPage.isDisplayed();
});

test('Modal works for adding faculty', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await addFaculty.addFaculty(addFacultyCredentials);
});

test('Modal shows for editing faculty', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoFacultyPage();
  await facultyPage.isDisplayed();
  await facultyPage.gotoFacultyProfile();
  await facultyProfilePage.isDisplayed();
  await facultyProfilePage.editFaculty();
});

test('Modal works for editing faculty', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(facultyCredentials.username, facultyCredentials.password);
  await editFaculty.editFaculty(editFacultyCredentials);
});

test('Modal works for adding club', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.addClub(addClubCredentials);
});

test('Modal works for editing club', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(acmCredentials.username, acmCredentials.password);
  await navBar.isLoggedIn(acmCredentials.username);
  await navBar.gotoClubPage();
  await clubPage.isDisplayed();
  await clubPage.editClub(editClubCredentials);
});

test('Modal works for adding officer', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoClubPage();
  await clubPage.isDisplayed();
  await clubPage.addOfficer(addOfficerCrendentials);
});

test('Add student', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await addStudentForm.addStudent(addStudentCredentials);
});

test('Edit student', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await editStudentForm.editStudent(editStudentCredentials);
});

// ROOMS
test('Add Room', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.addRoom(addNewRoom);
});

test('Edit Room', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.editRoom(editRoom);
  await navBar.gotoListRoomAdminPage();
});

test('Add Room Admin Equipment', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.addEquipment(addNewRoomEquipment);
});

test('Add Room Admin Jack', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.addJack(addNewRoomJack);
});
test('Delete Admin Equipment', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.deleteAdminEquipment();
});

test('Delete Admin Jack', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.deleteAdminJack();
});

// ROOM DETAILS
test('Room details shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
});

test('Add Room Occupant in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.addRoomOccupant();
});

test('Add Room Equipment in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.addRoomEquipment(addNewRoomEquipment);
});

test('Add Room Jack in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.addRoomJack(addNewRoomDetailJack);
});

test('Add Room Note in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.addRoomNote();
});

test('Edit Room Equipment in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.editRoomEquipment(editRoomEquipment);
});

test('Edit Room Jack in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.editRoomJack(editRoomJack);
});
test('Delete Occupant in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.deleteRoomOccupant();
});

test('Delete Equipment in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.deleteRoomDetailEquipment();
});

test('Delete Jack in Room Details', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoListRoomAdminPage();
  await listRoomAdminPage.isDisplayed();
  await listRoomAdminPage.gotoRoomDetails();
  await listRoomAdminPage.deleteRoomDetailJack();
});

// TECH
test('Tech page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(toddCredentials.username, toddCredentials.password);
  await navBar.isLoggedIn(toddCredentials.username);
  await navBar.gotoTechPage();
  await techPageComponents.isDisplayed();
});

test('Add Tech Equipment', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(techCredentials.username, techCredentials.password);
  await navBar.isLoggedIn(techCredentials.username);
  await navBar.gotoTechPage();
  await techPageComponents.addTechEquipment(addNewTechEquipment);
});
test('Add Tech Jack', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(techCredentials.username, techCredentials.password);
  await navBar.isLoggedIn(techCredentials.username);
  await navBar.gotoTechPage();
  await techPageComponents.addTechJack(addNewTechJack);
});
test('Edit Tech Equipment', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(techCredentials.username, techCredentials.password);
  await navBar.isLoggedIn(techCredentials.username);
  await navBar.gotoTechPage();
  await techPageComponents.editTechEquipment(editTechEquipment);
});

test('Delete Tech Equipment', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(techCredentials.username, techCredentials.password);
  await navBar.isLoggedIn(techCredentials.username);
  await navBar.gotoTechPage();
  await techPageComponents.deleteTechEquipment();
});

test('Delete Tech Jack', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(techCredentials.username, techCredentials.password);
  await navBar.isLoggedIn(techCredentials.username);
  await navBar.gotoTechPage();
  await techPageComponents.deleteTechJack();
});

test('Add Staff', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await addStaff.addStaff(addStaffCredentials);
});

test('Edit Staff', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await editStaff.editStaff(editFacultyCredentials);
});
