import { Component, OnInit, Inject } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { Post } from '../posts-table/post';
import { Comment } from './comment';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts/posts.service';
import { localStorageToken } from '../services/localStorageToken';
import { User } from '../login/user';

@Component({
  selector: 'agt-posts-comments',
  templateUrl: './posts-comments.component.html',
  styleUrls: ['./posts-comments.component.css'],
})
export class PostsCommentsComponent implements OnInit {
  post!: Post;
  comments!: Comment[];
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsSerive: PostsService,
    @Inject(localStorageToken) private localStorage: Storage
  ) {}

  ngOnInit(): void {
    let user: User = JSON.parse(this.localStorage.getItem('user') || '');
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/', 'login']);
    }

    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.postsSerive.getPost(this.id).subscribe((event) => {
      if (event.type === HttpEventType.Response && event.body) {
        this.post = event.body;
        console.log(this.post);
      }
    });
    this.postsSerive.getPostComments(this.id).subscribe((event) => {
      if (event.type === HttpEventType.Response && event.body) {
        this.comments = event.body;
        console.log(this.comments);
      }
    });
  }
}
