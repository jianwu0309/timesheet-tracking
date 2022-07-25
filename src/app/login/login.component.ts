import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '../app.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    hidePassword = true;
    isLoading = false;
    showPassword = false;
    isError = false;

    constructor(
        private router: Router,
        private appService: AppService,
        private userService: UserService,
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, this.emailValidator()]),
            password: new FormControl('', Validators.required),
        });
    }

    emailValidator() {
        return (control: FormControl): ValidationErrors | null => {
            const regexp: RegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (control.value && !regexp.test(control.value)) {
                return { emailValidator: true };
            }
            return null;
        };
    }

    ngOnInit() {
    }

    onSubmit(): void {
        this.isLoading = true;
        this.appService.signIn(this.loginForm.value)
          .then((res) => {
            this.userService.loginUser(res.data);
            this.router.navigate(['/app']);
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = false;
            this.isError = true;
          });
    }
}