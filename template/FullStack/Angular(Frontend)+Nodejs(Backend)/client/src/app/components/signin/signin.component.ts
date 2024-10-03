import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import axios from 'axios';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    const signin=async ()=>{
      try{
        const response =await axios.post("http://localhost:8000/user/login",{
          email:this.email,
          password:this.password
        });
        window.alert(response.data.message); 
        this.router.navigate(['/']);
      } 
      catch(err){
        console.error(err);
      }
    }
    signin();
  }
}

