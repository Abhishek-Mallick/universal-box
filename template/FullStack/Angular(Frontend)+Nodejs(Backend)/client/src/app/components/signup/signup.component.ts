import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone:string='';

  constructor(private router:Router){}

  onSubmit() {
  const register=async()=>{
    try{
      const response=await axios.post("http://localhost:8000/user/signup",{
        email:this.email,
        name:this.name,
        phone:this.phone,
        password:this.password
      });
      
      window.alert(response.data.message);
      this.router.navigate(['/signin'])
    }
    catch(err){
      console.error(err);
    }
  }
  register();
  }
}