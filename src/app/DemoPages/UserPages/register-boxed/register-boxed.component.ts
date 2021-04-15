import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-boxed',
  templateUrl: './register-boxed.component.html',
  styles: []
})
export class RegisterBoxedComponent implements OnInit {
  loading = false;
  registerForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router
  ) {
    this.registerForm = this.createForm();
   }

  ngOnInit() {
  }

  createForm(){
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      password_confirmation: new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  get f(){
    return this.registerForm.controls;
  }

  submitForm(event){
    this.loading = true;
    this.authenticationService.register(this.registerForm.value).subscribe(
      data =>{
        this.route.navigate(['/login']);
    },
    error =>{
      this.loading = false;
      console.log(error.error.errors);
    }
    )
  }
}
