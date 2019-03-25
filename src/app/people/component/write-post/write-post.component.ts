import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { TinymceService } from '../../services/tinymce.service';
import { MatSnackBar } from '@angular/material';
import { ValidationErrorHandler } from 'src/app/shared/validation-error-handler';

@Component({
  selector: 'app-write-post',
  templateUrl: './write-post.component.html',
  styleUrls: ['./write-post.component.scss']
})
export class WritePostComponent implements OnInit {

  editorSettings;

  postForm: FormGroup;

  constructor(
    private router: Router,
    private postService: PostService,
    private tinymce: TinymceService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(100)]]
    });

    this.editorSettings = this.tinymce.getSettings();
  }

  submit() {
    if (this.postForm.dirty && this.postForm.valid) {
      this.postService.addPost(this.postForm.value).subscribe(
        post => {
          this.router.navigate(['/people/posts/', post.id]);
        },
        validationResult => {
          this.snackBar.open('There are validation errors!', 'Close', { duration: 3000 });
          // 表单提交时，如果前端的验证通过，但是到后端api验证未通过，会返回422状态码，即会走到这里
          // 需要把后台验证错误信息分别对应到前台的每个属性上，并对应到属性具体的错误类型上
          ValidationErrorHandler.handleFormValidationErrors(this.postForm, validationResult);
        });
    }
  }

}
