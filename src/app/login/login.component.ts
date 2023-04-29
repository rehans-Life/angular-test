import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { localStorageToken } from '../services/localStorageToken';
import users from '../../user.json';
import { UsersService } from '../services/users/users.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'agt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  loginValid: boolean = true;
  username: string = '';
  password: string = '';

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private router: Router,
    @Inject(localStorageToken) private localStorage: Storage,
    private userService: UsersService
  ) {}

  onSubmit() {
    let users: User[] = this.userService.getPosts();

    const loggedInUser = users.find(
      (user: User) =>
        user.username === this.username && user.password === this.password
    );
    if (!loggedInUser) this.loginValid = false;
    else {
      this.router.navigate(['/', 'posts-table']);
      this.localStorage.setItem('user', JSON.stringify(loggedInUser));
    }
  }
}
