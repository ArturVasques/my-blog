import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IComment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsUrl = 'api/posts';
  commentsUrl = 'api/comments'

  constructor(private http: HttpClient) { }

  getPosts<T>(id: string = ''): Observable<T> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<T>(url);
  }

  getComments<T>(id: number = 0): Observable<T> {
    const url = `${this.postsUrl}/${id}/comments`;
    return this.http.get<T>(url);
  }

  saveComment<T>(postId: number, comment: IComment): Observable<T> {
    const url = `${this.postsUrl}/${postId}/comments`;
    return this.http.post<T>(url, comment);
  }

  updateComment<T>(commentId: number, comment: IComment): Observable<T> {
    const url = `${this.commentsUrl}/${commentId}`;
    return this.http.put<T>(url, comment);
  }

}
