import React, { useState } from 'react';
import axios from 'axios';

export const Uploader = ( ) => {
const [file, setFile] = useState(null);

const onInputChange = (e) =>{
  // console.log(e.target.files)
  setFile(e.target.files[0])
};

const onSubmit = (e) => {
  e.preventDefault();
  const data = new FormData();
  data.append('file', file);

  axios.post('//localhost:3001/upload', data)
    .then((e) => {
      console.log('Success')
    })
    .catch((e) => {
      console.error('Error', e)
    })
};

  return (

     <div className="Uploader">
       <h3>Upload Your Files Here</h3>
       <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form">
      <input type="file" onChange={onInputChange} name="file" accept="image/*" multiple=" " />
      <button>Submit!</button>
      </div>
      </form>
     </div>

  );
}
