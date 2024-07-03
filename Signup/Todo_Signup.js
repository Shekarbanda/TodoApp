 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDLjRFeob8EQEZ7xcu9kX1xkWPX7ZEll9E",
   authDomain: "todolist-a67be.firebaseapp.com",
   databaseURL: "https://todolist-a67be-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "todolist-a67be",
   storageBucket: "todolist-a67be.appspot.com",
   messagingSenderId: "44996104285",
   appId: "1:44996104285:web:99f654f0fab050b29bbdb4"
 };

const app = initializeApp(firebaseConfig);
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
const auth = getAuth(app);


const form = document.querySelector('#form');

async function signup(email,pass,name){
  await createUserWithEmailAndPassword(auth,email,pass).then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    alert("Signup successfull,now login");
    window.location.href='../Signin/Todo_Signin.html'})
.catch((err)=>console.log(err));
  }



  

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const name=e.target.name.value;
  const email = e.target.email.value;
  const pass = e.target.pass.value;

  
  signup(email,pass,name);

})

