import React from 'react'
import {db} from './firebase'
import {collection , getDocs , doc , deleteDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react';


function Admin() {
    const [users, setUser]= useState([])
    const [username, setUsername]= useState("")
    const userCollectionRef = collection(db, "users");
    useEffect(()=>{
   
  const getUsers = async () =>{
    const data= await getDocs(userCollectionRef);
    console.log(data);
    setUser(data.docs.map((doc)=>(
      {...doc.data(),id:doc.id})
      ))
  
    }
    getUsers();
    },[userCollectionRef]);
    
   const deleteUser = (id) =>{
        const userDoc= doc(db,"users",id);
        deleteDoc(userDoc)
    }

    const inputUsername = (event) =>
    {
      console.log(event.target.value);
      setUsername(event.target.value);
    //   setsubmission('');
    }

    
    return (
        <div>
            
            {users.map((user)=>{
             return (
              <div>
                 <p> username: { user.name}</p>
                 <p> password : {user.pass}</p>
                 <input onChange={inputUsername} value={username}></input>
                 <button onClick={()=> deleteUser(user.id)}> delete</button>
               </div>
             )


            })}
        
        
        </div>
    )
}

export default Admin
