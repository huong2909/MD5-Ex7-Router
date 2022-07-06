import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/Post';
import {PostService} from '../../service/post.service';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  post: Post[] = [];
  postForm: FormGroup = new FormGroup({
    title: new FormControl('')
  });

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    const title = this.postForm.value.title;
    if (title === '') {
      this.getAll();
    } else {
      this.search();
    }
  }

  getAll() {
    this.postService.getAll().subscribe(result => {
      // @ts-ignore
      this.post = result.content;
      console.log(result);
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

  search() {
    console.log('----------------');
    // @ts-ignore
    const title = this.postForm.value.title;
    // @ts-ignore
    this.postService.getByTitle(title).subscribe(result => {
      this.post = result;
      console.log(result);
    });
  }
}
