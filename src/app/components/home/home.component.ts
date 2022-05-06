import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  auth = getAuth();

  displayName: any = "OP" // auth.currentUser.displayName 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkAuth();
  }

  logOut(){
    signOut(this.auth).then(() => {
      // Sign-out successful
      // this.displayName = this.auth.currentUser?.displayName
      localStorage.clear()
      this.refresh();
    }).catch((error) => {
      // An error happened
    });
  }

  checkAuth(){
    const user = localStorage.getItem('user')
    if(user == null){
      this.router.navigateByUrl('login')
    }
  }

  refresh(): void {
    window.location.reload();
}

}
