import { redirect } from "react-router-dom";
import { logInUser } from "./features/reducerSlices/userSlice";
import store from "./app/store";
import axios from "axios";
import { initializeStoreAction } from "./features/reducerSlices/todosSlice";

const actions = async({request}) =>{
const data = await request.formData();
const submission = {
    id:data.get('userId'),
    newId:data.get('newUserId'),
    newName:data.get('newUserName'),
    newAge:data.get('newUserAge'),
    newEmail: data.get('newUserEmail'),
    newPhoneNo:data.get('newUserPhoneNo')
}
if(submission.id){
 let res = await fetch(`http://localhost:8080/users/?id=${submission.id}`)
 res = await res.json();
 if(res.length > 0){
    store.dispatch(logInUser(submission.id));
    let data = await axios.get(`http://localhost:8080/todos?userId=${submission.id}`);
    store.dispatch(initializeStoreAction(data.data));
    window.localStorage.setItem('userId',submission.id);
    return redirect('home');
}}
else{
        const newUser = {
            id:submission.newId,
            name:submission.newName,
            age:submission.newAge,
            email:submission.newEmail,
            phoneNo:submission.newPhoneNo
        };
        let res = await fetch(`http://localhost:8080/users`,{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(newUser)
    })
    window.localStorage.setItem('userId',submission.newId);
    store.dispatch(logInUser(newUser));
    return redirect('home');

}
return redirect('/');
}


export default actions;