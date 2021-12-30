import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap, map } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { IComment } from 'src/app/interfaces/comment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postId: number = 0;
  comments: IComment[] = [];
  comment: IComment = {
    user: '',
    content: ''
  };

  private subscription: Subscription = new Subscription();

  constructor(
    private postsService: PostsService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this.subscription = this.postsService.getComments<IComment[]>(this.postId).pipe(
      map(comments => {
        comments.sort((commentA, commentB) => {
          const dateA = commentA.date ? new Date(commentA.date) : new Date();
          const dateB = commentB.date ? new Date(commentB.date) : new Date();

          return dateA > dateB ? -1 : 1;
        });

        return comments;
      }),
      tap(comments => {
        this.comments = comments;
      })
    ).subscribe();
  }

  editComment(comment: IComment): void {
    this.comment = comment;
  }

  updateComments(comment: IComment): void {
    const index = this.comments.findIndex(element => element.id === comment.id);
    if (index > -1) {
      this.comments[index] = comment;
    } else {
      this.comments = [comment].concat(this.comments);
    }
  }

}
