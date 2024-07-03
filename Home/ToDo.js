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

import { getDatabase,get,set,child,ref,push,remove,update,onValue} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
const app = initializeApp(firebaseConfig);
const db=getDatabase(app);
const auth = getAuth();

async function check(){
    await onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const displayName = user.displayName;
        const email = user.email;
        name.innerText = displayName;
        getdata();
        start();

        // ...
    } else {
        // User is signed out
        // ...
        window.location.href='../Signin/Todo_Signin.html';
    }
    });

}

const name = document.querySelector('.name');



window.onload = check();

const log = document.querySelector('.log');

async function logout(){
    await signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = 'Todo_Signin.html';
    }).catch((error) => {
        // An error happened.
    });
}

log.addEventListener('click',logout)

let num=document.querySelector(".num");
async function getdata(){
await onValue(ref(db,`/TodoApp/${name.innerText}`),function(data){
    try{        
    let a=Object.values(data.val());
    let size=a.length;
    num.innerText=`You have ${size} Pending Tasks`;
    }
    catch(error){
        num.innerText=`You have ${0} Pending Tasks`;
        no.style.display="block";
    }
})
}

let user=document.querySelector(".main");
let all=document.querySelector(".all");


all.addEventListener("click",()=>{

    remove(ref(db,`TodoApp/`+name.innerText));
    user.innerHTML="";
    user.appendChild(no);
    no.style.display="block";
})
let no=document.querySelector(".no");

async function start(){

await get(child(ref(db),`TodoApp/${name.innerText}`)).then((data)=>
    {
        let a=Object.values(data.val());
        div.style.display="none";
        msg.style.display="none";
        for(let i=0;i<a.length;i++){
            let newEl=document.createElement("li");
            let del=document.createElement("img");
            let edit=document.createElement("img");
            let main=document.querySelector(".main");
            let content=document.createElement("div");
            newEl.style.display="inline-block";
            del.src="../Images/delete.webp";
            edit.src="../Images/edit.png";
            newEl.innerText=a[i].value;
            main.appendChild(content);
            content.appendChild(newEl);
            content.appendChild(edit);
            content.appendChild(del);
            del.setAttribute("class","del");
            edit.setAttribute("class","edit1");
            del.setAttribute("id",a[i].key);
            edit.setAttribute("id",a[i].key);
            content.setAttribute("class","content")
            
           

    del.addEventListener("click",()=>{
        main.removeChild(content);
        remove(ref(db,`TodoApp/${name.innerText}/`+del.id))
        
})
content.addEventListener("mouseover",()=>{
    del.style.visibility="visible";
    edit.style.visibility="visible"
})
content.addEventListener("mouseout",()=>{
    del.style.visibility="hidden";
    edit.style.visibility="hidden";
})

let no=document.querySelector(".no");

        edit.addEventListener("click",()=>{
            let new_val=prompt("Enter Updated task:");
            while(new_val===""){
                new_val=prompt("Once check the task entered:");
            }
            let new_obj={
                key:edit.id,
                value:new_val
            }
            update(ref(db,`TodoApp/${name.innerText}/`+edit.id),new_obj);
            newEl.innerText=new_val;
        })
    }
        
}).catch((err)=>{
    div.style.display="none";
    msg.style.display="none";
    no.style.display="block";
})


}
let content=document.querySelector(".content");
let div= document.querySelector(".load");
let msg=document.querySelector(".msg");

no.style.display="none";


let add=document.querySelector(".add");
let task=document.querySelector(".task");



let addTask=()=>{
    const db=getDatabase(app);
    if(task.value){
        no.style.display="none";
        let user_task=task.value
        let newEl=document.createElement("li");
        let del=document.createElement("img");
        let edit=document.createElement("img");
        let main=document.querySelector("main");
        let content=document.createElement("div");
        newEl.style.display="inline-block"
        del.src="delete.webp"
        edit.src="edit.png";
        newEl.innerText=task.value;
        main.appendChild(content);
            content.appendChild(newEl);
            content.appendChild(edit);
            content.appendChild(del);
        del.setAttribute("class","del");
        edit.setAttribute("class","edit1");
        content.setAttribute("class","content")
        

    let key1= push(ref(db,`TodoApp/${name.innerText}/`)).key
    const obj={
        key:key1,
        value:user_task
    }
    set(child(ref(db),`TodoApp/${name.innerText}/`+key1),obj)
   
    task.value="";
    add.classList.remove("add1");

    del.addEventListener("click",()=>{
        main.removeChild(content);
        remove(ref(db,`TodoApp/${name.innerText}/`+key1))
        let no=document.querySelector(".no");
    })

    content.addEventListener("mouseover",()=>{
        del.style.visibility="visible";
        edit.style.visibility="visible"
    })

    content.addEventListener("mouseout",()=>{
        del.style.visibility="hidden";
        edit.style.visibility="hidden";
    })

    edit.addEventListener("click",()=>{
        let new_val=prompt("Enter Updated task:");
        let new_obj={
            key:key1,
            value:new_val
        }
        update(ref(db,`TodoApp/${name.innerText}/`+key1),new_obj);
        newEl.innerText=new_val;
    })
}}

add.addEventListener("click",addTask);

task.onkeyup=(e)=>{
    if(task.value.trim()!=0){
        add.classList.add("add1");
        if(e.key==="Enter"){
            addTask();
        }
    }
    else{
        add.classList.remove("add1");
    }
}