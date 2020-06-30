import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  constructor(
    private auth:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }
    this.auth.signin(this.authForm.value)
      .subscribe({
        next:()=>{
          this.router.navigateByUrl('/inbox');
        },
        error:({ status, error })=>{
          if(status === 0){
            this.authForm.setErrors({ noConnection: true });
          }
          if(error.username || error.password){
            this.authForm.setErrors({ credentials: true });
          }
        }
      })
  }

}
