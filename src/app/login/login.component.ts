import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  password:string;
  username:string;

  form:any={};
  isLoggedIn = false;
  isLoginFailed = false;
  admindashboard =false;
  userdashboard =false;
  subuserdashboard =false;
  errorMessage = '';

  roles: string[] = [];
  constructor(private authService: AuthService, private tokenService: TokenStorageService,   private router: Router) { }

  ngOnInit(): void {
     if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getUser().roles;

    }

  }
   save () {
 this.authService.login(this.form).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data);
        notify("Login successully ", "success", 1500);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getUser().roles;
        this.admindashboard= this.roles.includes('ROLE_ADMIN');
        this.userdashboard= this.roles.includes('ROLE_USER');
        if ( this.admindashboard){
           this.router.navigate(['/admindashboard/devices']);
          }
        if ( this.userdashboard){ this.router.navigate(['/dashboard/map']); }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        notify(this.errorMessage, "warning", 1500);
      }
    );
}





}
