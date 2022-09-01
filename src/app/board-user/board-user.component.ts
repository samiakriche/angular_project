import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  users!: User[];

  constructor(private usersService:UsersService, private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers():void {
 
    this.usersService.listeUser().pipe().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }
}
