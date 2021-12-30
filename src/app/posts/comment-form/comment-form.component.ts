import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IComment } from 'src/app/interfaces/comment.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnChanges {
  @Input() postId = -1;
  @Input() comment: IComment = {
    user: '',
    content: ''
  }
  @Output() updateComments = new EventEmitter();

  user = new FormControl('', [
    Validators.required
  ]);
  content = new FormControl('', [
    Validators.required
  ])

  constructor(
    private postService: PostsService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['comment']) {
      this.user.setValue(changes['comment'].currentValue.user);
      this.content.setValue(changes['comment'].currentValue.content)
    }
  }

  ngOnInit(): void {
  }

  submit(): void {
    if(this.comment.id) {
      this.updateComment(this.comment.id);
    } else {
      this.saveComment();
    }
  }

  resetForm(): void {
    this.comment = {
      user: '',
      content: ''
    };
    this.user.reset();
    this.content.reset();
  }

  saveComment(): void {
    const comment: IComment = {
      user: this.user.value,
      date: this.getCurrentDate(),
      content: this.content.value
    }

    this.postService.saveComment<IComment>(this.postId, comment).subscribe( comment => {
      this.resetForm();
      this.updateComments.emit(comment);
    });
  }

  updateComment(commentId: number): void {
    const comment: IComment = {
      ...this.comment,
      user: this.user.value,
      content: this.content.value
    }

    this.postService.updateComment<IComment>(commentId, comment).subscribe(comment => {
      this.resetForm();
      this.updateComments.emit(comment);
    });
  }

  private getCurrentDate(): string {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    return `${year}-${month}-${day}`;
  }

  formGroup = new FormGroup({
    name: this.user,
    content: this.content
  });

}
