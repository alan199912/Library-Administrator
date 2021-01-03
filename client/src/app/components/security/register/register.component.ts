import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/service/security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private securitySerice: SecurityService
  ) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  register() {
    if (this.formRegister.valid) {
      this.securitySerice.registerUser({
        name: this.formRegister.value.name,
        surname: this.formRegister.value.surname,
        username: this.formRegister.value.username,
        email: this.formRegister.value.email,
        password: this.formRegister.value.pasword,
        userId: '',
      });
      // console.log(this.formRegister.value);
    }
  }
}
