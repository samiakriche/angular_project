import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user : User = {
    username:'',
    email:'',
    password:'',
    roles:[],
  };
  mode = 'list';

  constructor(private usersService:UsersService, private router:Router) { }

  ngOnInit(): void {
    this.getEmployeeById(); 

  }
  onCancel()
  {
    this.mode='list';
    this.router.navigate(['admin/employees']);


  }
  getEmployeeById() {
    this.usersService.getEmployeeById().subscribe(data => {
      this.user = data;
    });  }

    updateEmployee(id?:number){
    
      console.log(this.user);
      this.usersService.updateUser(this.user).subscribe({
        next:(res)=>{
          this.router.navigate(['admin']);

        },
        error:(err) =>{
          console.log(err)
        }
      });
}
}
