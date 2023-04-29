import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Post } from '../../posts-table/post';
import { Comment } from '../../posts-comments/comment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts() {
    // Generating a Http Request using the class it can help us be more specific about our
    // request
    // And the data we get back will also be very specific as well
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts',
      {
        reportError: true,
      }
    );
    return this.http.request<Post[]>(request);
  }

  getPost(id: string) {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        reportError: true,
      }
    );
    return this.http.request<Post>(request);
  }

  getPostComments(id: string) {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      {
        reportError: true,
      }
    );
    return this.http.request<Comment[]>(request);
  }
}
