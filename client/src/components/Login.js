import React, { useState } from 'react';
import axios from 'axios';

export const LogIn = ( ) => {
const [userMail, setUserMail] = useState('');
const [userPassword, setUserPassword] = useState('');
const [message, setMessage] = useState(null);


const onSubmit = (e) => {
  e.preventDefault();
    axios.post('//localhost:3001/loginUser', {userMail: userMail, userPassword: userPassword})
    .then((e) => {
      console.log('Success')
      console.log(e.data)
    //   if(e.data.includes('Duplicate'))
    //   setMessage("User with same Email Id already exist!")
    })
    .catch((e) => {
      console.error('Error', e)
      setMessage('Error')
    })
    setMessage('User Logged In... ')
};

  return (

     <div className="Uploader">
       <h3>Log In!</h3>
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form">
      <input type="email" placeholder="Email" onChange={e => setUserMail(e.target.value)} name="email" />
      <input type="password"placeholder="Password" onChange={e => setUserPassword(e.target.value)} name="password" />
      <button>Log In!</button>
      <p>{message}</p>
      </div>
      </form>
     </div>

  );
}