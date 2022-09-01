import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../_services/user.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  employees: any;
  users!: User[];
  p: number = 1;
  total: number = 0;
  form: any = {
    username: null,
    email: null,
    password: null,
    roles:[]
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user : User = {
    username:'',
    email:'',
    password:'',
    roles:[],
  };
  editUser: any;
  constructor(private userService: UserService, private usersService:UsersService, private router:Router) { }
  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
    this.getAllUsers();
  }
  getAllUsers():void {
 
    this.usersService.listeUser().pipe().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }
  onEdit(id?: number)
  {
    console.log("id = ", id);
    this.usersService.getId(id);
  }
  onSubmit(): void {
    const { username, email, password, service, departement, telFixe, telMobile, roles } = this.form;
    console.log(roles)
    this.usersService.register(username, email, password, service, departement, telFixe, telMobile,roles).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
          window.location.reload()
      },
      error: err => {
        this.errorMessage = err.error.message;

        this.isSignUpFailed = true;
      }
    });
  }
 

  OnDeleteEmployee(id? : number) 
  {
    if (confirm("Are you sure you want to delete this ?")) {
   this.usersService.deleteUser(id).subscribe(next => {
    this.getAllUsers()
     
   }
   ,
   );


  }}
  updateEmployeeRecord(id? : number){
    console.log("id = ", id);
    this.usersService.getId(id);
    this.router.navigate(['update-employee']);
  }


}