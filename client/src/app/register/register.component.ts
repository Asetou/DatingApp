import { Component, OnInit, inject, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';
import { isArray } from 'ngx-bootstrap/chronos';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [ReactiveFormsModule, JsonPipe, TextInputComponent, DatePickerComponent]
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  cancelRegister = output<boolean>();
  registerForm: FormGroup = new FormGroup({});
  maxDate = new Date();
  validationErrors: string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), 
          Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    // Get the raw value from the form
    const rawValue = this.registerForm.value;
  
    // Format the date using our helper; note that rawValue.dateOfBirth might already be a string,
    // so it’s best to pass it to the helper function and log the result.
    const formattedDob = this.getDateOnly(rawValue.dateOfBirth);
  
    // Build the payload explicitly and remove any extra fields (like confirmPassword)
    const registerData = {
      gender: rawValue.gender,
      username: rawValue.username,
      knownAs: rawValue.knownAs,
      dateOfBirth: formattedDob, 
      city: rawValue.city,
      country: rawValue.country,
      password: rawValue.password
    };
  
    // Log the payload to verify its structure and date format
    console.log('Register Payload:', JSON.stringify(registerData));
  
    // Send the registration payload
    this.accountService.register(registerData).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: error => {
        console.error('Registration error:', error);
        if (Array.isArray(error)) {
          this.validationErrors = error as string[];
        }
      }
    });
  }
  
  
  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined): string | undefined {
    if (!dob) return;
    const date = new Date(dob);
    const year = date.getFullYear();
    // getMonth() is zero‑based so add 1 and pad with a zero if necessary
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
}