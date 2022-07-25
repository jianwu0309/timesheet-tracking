import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  updateUserEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  loginUser(userObj: any) {
    localStorage.setItem('user', JSON.stringify(userObj));
    localStorage.setItem('token', userObj.accessToken);
  }

  updateUser(userObj: any) {
    localStorage.setItem('user', JSON.stringify(userObj));
  }

  logoutUser() {
    localStorage.clear();
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getUserName() {
    const userObj = this.getUser();
    return userObj ? userObj.firstName + ' ' + userObj.lastName : null;
  }

  getProfilePicture() {
    const user = this.getUser();
    return user ? user.pictureUrl : null;
  }

  hasUserLoggedIn() {
    return this.getUser();
  }
}
