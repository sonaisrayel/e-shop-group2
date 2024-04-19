import axios from 'axios';
import { getToken } from "./auth-test.js";
const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
export const getUsers = async () => {
    try {
        const url = "http://localhost:4000/users"
        const inputValues = {
            "username": ADMIN_USERNAME,
            "password":ADMIN_PASSWORD
        }
        const token = await getToken({ ADMIN_USERNAME, ADMIN_PASSWORD })
        const options = {
            method: "GET",
      headers: { "content-type": "application/json", Authorization:token},
      data: inputValues,
      url,
        }
        const response = await axios(options)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async () => {
    try {
        const url = "http://localhost:4000/users"
        const token = await getToken({ ADMIN_USERNAME, ADMIN_PASSWORD })
        const params = {
            id: '66224abc13a994164ac69a64'
        }
        const options = {
            method: "DELETE",
      headers: { "content-type": "application/json", Authorization:token},
    data: inputValues,
      url,
      params,
        }
        return await axios(options)
    } catch (error) {
        console.log(error);
    }
}
export const updateUser = async () => {
    try {
        const url = "http://localhost:4000/users"
        const inputValues = {
            "username":"martina",
            "password":"123456"
        }
const token = await getToken(inputValues)
        
        const updateValues = {
            "name":"Manushak",
            "surname":"Manushyan"
        }
        const options = {
            method: "update",
            url,
            headers: { "content-type": "application/json",Authorization:token},
          data: updateValues,
            
        }
        const response =  await axios(options)
        return response.data.token
    } catch (error) {
        console.log(error);
    }
}

