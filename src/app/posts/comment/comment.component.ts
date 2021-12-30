import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from 'src/app/interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment!: IComment;
  @Output() editComment = new EventEmitter<IComment>();
}
