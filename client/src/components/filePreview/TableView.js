import React, { useState } from "react";
import axios from 'axios';

export const TableView = () => {
    const [files, setFiles] = useState([[]]);
    const [searchTerm, setSearchTerm] = useState('');

    //select all files
    const getTable = (e) => {
    e.preventDefault();
    axios.get('//localhost:3001/images/database')
          .then((response) => {
            console.log("getTable invoked")
            // console.log(response.data)
            setFiles(response.data)
            console.log(files)
            console.log(files.length)
          })
          .catch((e) => {
            console.error('Error', e)
          });
        };

    //select search files only
    const getSearched = (e) => {
        e.preventDefault();

        // this is tricky point { wrapping the varibale inside searchKey }
        const searchKey = {
            key: searchTerm
        };

        console.log(searchTerm)
        axios.post('//localhost:3001/images/search', {searchKey})
                .then((response) => {
                    console.log("getSearched invoked")
                    // console.log(response.data)
                    setFiles(response.data)
                    // console.log(files)
                    // console.log(files.length)
                })
                .catch((e) => {
                console.error('Error', e)
            });
        };

        // delete operation by id
        const getDeleted = (id) => {
            console.log(id)
            axios.delete(`//localhost:3001/images/delete/${id}`)
            };
        
        //download file by id    
        // const getDownload = (id) => {
        //     console.log(id)
        //     axios.get(`//localhost:3001/images/download/${id}`)
        //     .then((response) => {
        //         console.log("getDownload invoked")
        //         // console.log(response.data)
        //         // setFiles(response.data)
        //         // console.log(files)
        //       })
        //       .catch((e) => {
        //         console.error('Error', e)
        //       });
        //     };

    return (
        <div>
          <div>------------------</div>
          <button onClick={getTable}>Refresh_Table</button>
          <div>------------------</div>
          <form method="post" action="#" id="#" onSubmit={getSearched}>
          <input type="search" placeholder="Search..." name="search"  onChange={e => setSearchTerm(e.target.value)} />
          <button type="submit">Search..!</button>
          </form>
          <div>------------------</div>

        {files.map((val)=>{
            return (
                <div>
                <div>
                <img style={{maxWidth: '50px'}} src={`//localhost:3001/${val.uniqueName}`} alt={val.originalname}/>
                <h4>Name: {val.name} || Type: {val.type} || Size: {val.size} MB</h4>
                </div>
                <button id={val.id} onClick=" ">Download!</button> 
                {/* put it inside click to activate download: {() => getDownload(val.id)}  */}
                <button id={val.id} onClick={() => getDeleted(val.id)}>Remove!</button>
                <div>------------------</div>
                </div>
            )
        })}

          {/* <img style={{maxWidth: '200px'}} src= {`//localhost:3001/${files[i].name}`} alt="No images found"/> */}
        </div>
    );
}