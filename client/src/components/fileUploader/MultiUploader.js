import React, { useState } from 'react';
import axios from 'axios';

export const MultiUploader = ({onSuccess}) => {
const [files, setFiles] = useState([]);

const onInputChange = (e) =>{
  // console.log(e.target.files)
  setFiles(e.target.files)
};

const onSubmit = (e) => {
  e.preventDefault();
  const data = new FormData();
  
  for(let i = 0; i<files.length; i++){
    data.append('file', files[i]);
  }

  axios.post('//localhost:3001/upload', data)
    .then((response) => {
      console.log('Success');
      onSuccess(response.data)
    })
    .catch((e) => {
      console.error('Error', e)
    })
};

  return (

     <div className="multiUploader">
       <h3>Upload Your Photos Here</h3>
       <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form">
      <input type="file" onChange={onInputChange} name="file" accept="image/*" multiple />
      <button>Submit!</button>
      </div>
      </form>
     </div>

  );
}
