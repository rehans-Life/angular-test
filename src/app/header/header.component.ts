import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { localStorageToken } from '../services/localStorageToken';
import { Router } from '@angular/router';

@Component({
  selector: 'agt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: User;

  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.localStorage.getItem('user') || '');
  }

  logout() {
    this.router.navigate(['/', 'login']);
    this.localStorage.removeItem('user');
  }
}
