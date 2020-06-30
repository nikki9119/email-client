import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatch } from '../validators/password-match';
import { IsUniqueUsername } from '../validators/is-unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ],
    [this.isUniqueUser.validate]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  },{ validators: [this.passMatch.validate] });
  constructor(
    private passMatch: PasswordMatch,
    private isUniqueUser: IsUniqueUsername,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }

    this.auth.signup(this.authForm.value)
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/inbox');
        },
        error: err => {
          if(err.status === 0){
            this.authForm.setErrors({ noConnection: true });
          }
          else{
            this.authForm.setErrors({ unknownErr: true })
          }
        }
      });
  }
}
