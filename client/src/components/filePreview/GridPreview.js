import React, { useState } from "react";
import axios from 'axios';
// import { Grid } from "./Grid";

export const GridPreview = () => {
    const [files, setFiles] = useState([]);

    const getGrid = (e) => {

    axios.get('//localhost:3001/images')
          .then((response) => {
            console.log("getGrid invoked")
            // console.log(response.data)
            setFiles(response.data)
            console.log(files)
          })
          .catch((e) => {
            console.error('Error', e)
          });

        };
    return (
        <div>
          <div>------------------</div>
          <button onClick={getGrid}>Refresh_Grid</button>
          <div>
            {/* <Grid files={files}/> */}
          </div>

          {files.map((val)=>{
            return ( <span style={{margin: '2px'}}><img style={{maxWidth: '200px'}} src={`//localhost:3001/${val.uniqueName}`} alt={val.originalname}/> 
            </span>
            )
        })}

          {/* <img style={{maxWidth: '200px'}} src= {`//localhost:3001/${files[2]}`} alt="No images found"/> */}
        </div>
    );
}