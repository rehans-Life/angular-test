import { Component, OnInit, Inject } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { HttpEventType } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { localStorageToken } from '../services/localStorageToken';

@Component({
  selector: 'agt-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css'],
})
export class PostsTableComponent implements OnInit {
  posts: Post[] = [];
  displayedColumns: string[] = ['id', 'title', 'body', 'More'];
  notAdmin: boolean = false;

  constructor(
    private router: Router,
    private postsSerive: PostsService,
    @Inject(localStorageToken) private localStorage: Storage
  ) {}

  ngOnInit(): void {
    if (!this.localStorage.getItem('user'))
      this.router.navigate(['/', 'login']);

    this.postsSerive.getPosts().subscribe((event) => {
      if (event.type === HttpEventType.Response && event.body) {
        this.posts = event.body;
      }
    });
  }

  handleClick(id: number) {
    let user: User = JSON.parse(this.localStorage.getItem('user') || '');

    if (user.role === 'admin')
      this.router.navigate(['/', 'posts-comments', id]);
    else this.notAdmin = true;
  }
}
