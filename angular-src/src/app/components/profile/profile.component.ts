import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  user:User;
  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.getProfile().subscribe( profile => {
      const response = JSON.parse(JSON.stringify(profile))
      this.user = response.user
    }, err=>{
      console.log(err);
      return false
    })
  }
}
