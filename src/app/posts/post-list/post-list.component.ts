import { IPost } from './../../interfaces/post.interface';
import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts$: Observable<IPost[]> = new Observable<IPost[]>();

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    this.posts$ = this.postsService.getPosts<IPost[]>().pipe(
      map( posts => {
        posts.sort((postA, postB) => {
          const dateA = new Date(postA.publish_date);
          const dateB = new Date(postB.publish_date);

          return dateA < dateB ? -1 : 1;
        });

        return posts;
      })
    )
  }

  public formatDate(d: string): string {
    const date = new Date(d);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Out", "Nov", "Dec"]

    let day = '';
    if (date.getDate() === 1) {
      day = `${date.getDate()}st`
    } else if (date.getDate() === 2) {
      day = `${date.getDate()}nd`;
    } else {
      day = `${date.getDate()}th`
    }

    return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${day} ${date.getFullYear()}`;
  }

}
