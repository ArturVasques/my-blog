
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { FormatDatePipe } from './../pipes/format-date.pipe';
import { CommentFormComponent } from './comment-form/comment-form.component';




@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
    FormatDatePipe,
    CommentsComponent,
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PostListComponent
  ]
})
export class PostsModule { }
