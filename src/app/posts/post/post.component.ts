import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

import { IPost } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post$: Observable<IPost> = this.getPost();

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) { }

  private getPost(): Observable<IPost> {
    return this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') || '';
        return this.postsService.getPosts<IPost>(id);
      })
    );
  }

}
