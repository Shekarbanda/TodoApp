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
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
const auth = getAuth(app);


const form1 = document.querySelector('#form1');

async function signin(email,pass){
   await signInWithEmailAndPassword(auth,email,pass).then(
    (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert("Login Successful");
        window.location.href = '../Home/ToDo.html';
    })
.catch((err)=>alert(err.message));
  }

form1.addEventListener("submit",(e)=>{
  e.preventDefault();
  const email = e.target.email.value;
  const pass = e.target.pass.value;

  
  signin(email,pass);
})

