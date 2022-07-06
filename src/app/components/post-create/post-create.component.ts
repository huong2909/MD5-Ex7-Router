import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostService} from '../../service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    title: new FormControl(),
    content: new FormControl(),
    createAt: new FormControl(),
    likes: new FormControl(),
  });
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  submit() {
    const post = this.postForm.value;
    this.postService.save(post).subscribe(() => {
      this.postForm.reset();
      alert('Tạo thành công');
    }, e => {
      console.log(e);
    });
  }
}
