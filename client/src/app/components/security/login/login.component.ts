import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/service/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  login() {
    if (this.formLogin.valid) {
      this.securityService.loginUser({
        email: this.formLogin.value.email,
        password: this.formLogin.value.password,
      });
      console.log(this.formLogin.value);
    }
  }
}
