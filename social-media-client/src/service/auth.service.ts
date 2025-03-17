'use server'
import { AuthDto } from '@/dto/auth.dto';
import axios from 'axios';


// let api = "http://localhost:8000/api";
let api = process.env.API_SERVER;

export const LoginService = async ( data:AuthDto ) =>{
    await axios.post(`http://localhost:8000/api/auth/login`, data).then( res => {
        console.log(res.data);
        return res.data;
    }).catch( err => {
        console.log(err);
        return err;
    })
}