import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/Post';
import {PostService} from '../../service/post.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  post: Post[];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAll().subscribe(result => {
      // @ts-ignore
      this.post = result.content;
      console.log(result);
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

}
