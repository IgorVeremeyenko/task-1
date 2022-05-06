import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  setPersistence, 
  browserSessionPersistence, 
  signInWithEmailAndPassword 
} from "firebase/auth";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  auth = getAuth();

  hide = true;

  isLoading = false;
  
  constructor(
    private router: Router, 
    private builder: FormBuilder, 
    private _snackBar: MatSnackBar
    ){}
  
  form: FormGroup = new FormGroup({});

  email = new FormControl('', [Validators.required, Validators.email]);   

  password = new FormControl('', [Validators.minLength(6), Validators.required]);

  ngOnInit() {
    this.form = this.builder.group({
      mail: [null, Validators.email],
      pass: [null, [Validators.minLength(6), Validators.required]]    
    });
  }

  openSnackBar(error: string) {
    this._snackBar.open(`Error: ${error}`, 'Ок', {
      duration: 5000
    });
  }

  submit(){ 
    this.isLoading = true;   
    const email = this.form.value.mail
    const password = this.form.value.pass   
    
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;            
      // ...     
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigateByUrl('home')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.openSnackBar(errorMessage);
      this.isLoading = false;
    });
       
    
  }

  getErrorMessage() {
    if (this.email.hasError('required') ) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


}

