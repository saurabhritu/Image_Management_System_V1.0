import React, { useState } from 'react';
import axios from 'axios';

export const SignUp = ( ) => {
const [userName, setUserName] = useState('');
const [userMail, setUserMail] = useState('');
const [userPassword, setUserPassword] = useState('');
const [message, setMessage] = useState(null);


const onSubmit = (e) => {
  e.preventDefault();
    axios.post('//localhost:3001/createUser', {userName: userName, userMail: userMail, userPassword: userPassword})
    .then((e) => {
      console.log('Success')
      console.log(e.data)
      if(e.data.includes('Duplicate'))
      setMessage("User with same Email Id already exist!")
    })
    .catch((e) => {
      console.error('Error', e)
      setMessage('Error')
    })
    setMessage('User Created!')
};

  return (

     <div className="Uploader">
       <h3>Sign Up!</h3>
       <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form">
      <input type="search" placeholder="Name" onChange={e => setUserName(e.target.value)} name="name" />
      <input type="email" placeholder="Email" onChange={e => setUserMail(e.target.value)} name="email" />
      <input type="password"placeholder="Password" onChange={e => setUserPassword(e.target.value)} name="password" />
      <button>Sign Up!</button>
      <p>{message}</p>
      </div>
      </form>
     </div>

  );
}