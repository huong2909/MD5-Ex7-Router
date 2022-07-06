import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostService} from "../../service/post.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {
  postForm: FormGroup;
  id: number;
  constructor(private postService: PostService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getPost(this.id);
    });
  }

  ngOnInit() {
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
  delete(id: number) {
    this.postService.delete(id).subscribe(() => {
      this.router.navigate(['/']);
      alert('Xoá thành công');
    }, e => {
      console.log(e);
    });
  }

}
