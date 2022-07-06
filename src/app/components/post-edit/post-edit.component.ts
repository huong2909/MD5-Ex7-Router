import { Component, OnInit } from '@angular/core';
import {PostService} from '../../service/post.service';
import {Post} from '../../model/Post';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  postForm: FormGroup;
  id: number;
  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              // ActivatedRoute lấy dữ liệu trên đường dẫn
              private fb: FormBuilder) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    this.id = +paramMap.get('id');
    this.getPost(this.id);
  });
  }


  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe( paramap => {
    //   const id = paramap.get('id');
    //   this.postService.getById(id).subscribe(result => {
    //     this.post = result;
    //   }, error => {
    //     console.log(error);
    //   });
    // });
  }
  getPost(id: number) {
    return this.postService.getById(id).subscribe(post => {
      this.postForm = new FormGroup({
        title: new FormControl(post.title),
        content: new FormControl(post.content),
        likes: new FormControl(post.likes),
      });
    });
  }
  update(id: number) {
    const post = this.postForm.value;
    this.postService.update(id, post).subscribe(() => {
      alert('Cập nhật thành công');
    }, e => {
      console.log(e);
    });
  }

}
