import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsUniqueUsername implements AsyncValidator {
    constructor(private auth:AuthService) {}
    validate = (control: FormControl) => {
        const { value } = control;

        return this.auth.usernameAvail(value).pipe(
            map(()=>{
                return null;
            }),
            catchError((err)=>{
                console.log(err);
                if(err.error.username){
                    return of({ nonUniqueUsername: true });
                }else{
                    return of({ noConnection: true });
                }
            })
        );
    };
}
