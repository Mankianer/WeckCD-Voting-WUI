import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginService} from "../services/login.service";
import {CookiesService} from "../services/cookies.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(private fb: FormBuilder, private loginServie: LoginService, public cookies: CookiesService) {}

  onSubmit(): void {
    if(this.addressForm.status == 'VALID') {
      let isSuccess = this.loginServie.loggIn(this.addressForm.get('login')?.value, this.addressForm.get('password')?.value);
      if(!isSuccess) this.addressForm.get('password')?.setValue('');
    }
  }
}
