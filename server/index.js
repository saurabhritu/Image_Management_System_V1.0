const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

global.currentUser = null; // to set curent user
global.currDate = null; // to set the unique name of the assets

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "amsdb_test",
});

app.use(cors());

app.use(express.static('Images'));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, currDate + '_' + file.originalname)
    }
});

const upload = multer({storage}).array('file'); // replace single with array and vice versa to use multiUploader or Uploader

// for creating user
app.post('/createUser', (req, res) =>{
    const userName = req.body.userName
    const userMail = req.body.userMail
    const userPassword = req.body.userPassword
    const sqlInsertUser = "INSERT INTO userdb (userName, userMail, userPassword) VALUES (?, ?, ?)";
    db.query(sqlInsertUser, [userName, userMail, userPassword], (err, result) =>{
        if(err) {
            // console.log(err)
            res.send(err.sqlMessage)
        }
        else{
        console.log(result)
        // res.send(result) // Do comment it will cause error
        }
    });
});

//for login 
app.post('/loginUser', (req, res) =>{
    // const userName = req.body.userName
    const userMail = req.body.userMail
    const userPassword = req.body.userPassword
    const sqlSetUser = "SELECT id FROM userdb WHERE userMail = ? AND userPassword = ? ";
    db.query(sqlSetUser, [userMail, userPassword], (err, result) =>{
        if(err) {
            console.log(err)
            res.send(err.sqlMessage)
        }
        else{
        currentUser = result[0].id 
        console.log("Current User Id: ", currentUser)
        // res.send(result) // Do comment it will cause error
        }
    });
});


// upload route
app.post('/upload', (req, res) => {
    currDate = Date.now();
    upload(req, res, (err) => {
    if(err){
        return res.status(500).json(err)
    }
    const no_of_file = req.files.length;
    if(no_of_file){
    const i = 0;
    const uniqueName = currDate + '_' + req.files[i].originalname;
     const Name = req.files[i].originalname;
     const Type = req.files[i].mimetype;
     const Size = req.files[i].size /(1024*1024);
     const Path = req.files[i].path;

    const sqlInsert = "INSERT INTO assettable (uniqueName,name,type,size,filepath, userID) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert,[uniqueName, Name, Type, Size, Path, currentUser], (err, result) =>{
        // console.log(result);
        // console.log(req.files)
    })
    }
    return res.status(200).send(req.files) // change file with files to show preview in CDT
    })
});


// get images for Grid
app.get('/images', (req, res) => {
    // fs.readdir('./Images', function(err, files){
    //     if(err) console.log('Error', err)
    //     else res.send(files) //console.log('Result', files)
    // });
    const sqlSelect = "SELECT * FROM assettable WHERE userID = " + currentUser;
    db.query(sqlSelect, (err, result) => {
        // console.log(result)
        if(err) res.send(err)
        else
        res.send(result);
    });
});

//get file info & image from database using get table
app.get('/images/database', (req, res) => {
   
    const sqlSelect = "SELECT * FROM assettable WHERE userID = " + currentUser;
    db.query(sqlSelect, (err, result) => {
        // console.log(result)
        res.send(result);
    });
});

//get file info & image from database using get table
app.post('/images/search', (req, res) => {
//    console.log(req.body.searchKey.key)
   const searchKeyword = req.body.searchKey.key;
    const sqlSelect = "SELECT * FROM assettable WHERE ( name LIKE ? OR type LIKE ? ) AND userID = ? ";
    db.query(sqlSelect, ['%' + searchKeyword + '%', '%' + searchKeyword + '%', currentUser], (err, result) => {
        // console.log(result)
        res.send(result);
    });
});

// delete by id
app.delete('/images/delete/:id', (req, res) => {
    //    console.log(req.params.id)
    const id = req.params.id;
    let uniqueImageName = ''
    const sqlSelect = "SELECT uniqueName FROM assettable WHERE id = ? AND userID = ?"; // there is no use of using userID in query
       db.query(sqlSelect, [id, currentUser], (err, result, fields) => {
        //    console.log(result[0].name)
        //    res.send(result);
        // const name = result[0].name;
        // console.log(name)

        Object.keys(result).forEach((key) => {
            var row = result[key];
            uniqueImageName = row.uniqueName;
        });
        console.log(uniqueImageName)
        const filePath = path.join('./Images/', uniqueImageName)
        fs.unlink(filePath, (err) => {
        if(err) console.log('Error', err)
        else console.log("File Deleted Successfuly!")
        });
    });

    const sqlDelete = "DELETE FROM assettable WHERE id = ?";
        db.query(sqlDelete, id , (err, result) => {
            // console.log(result)
            // res.send(result);
            if(err) console.log(err);
        });
    });


// download by id
// app.get('/images/download/:id', (req, res) => {
//        console.log(req.params.id)
//        const id = req.params.id;

//        const sqlSelect = "SELECT name FROM assettable WHERE id = ?";
//        db.query(sqlSelect, id, (err, result, fields) => {
//            console.log(result)
//         //    res.send(result);
//         // get name from table to delete file from file system directory
//         Object.keys(result).forEach((key) => {
//             var row = result[key];
//             console.log(row.name)
//         const name = row.name;
//         const filePath = path.join('./Images/', name)
//         // res.download(filePath);
        
//         const writer = fs.createWriteStream(path)
//         const response =  axios({
//             url: filePath,
//             method: 'GET',
//             responseType: 'stream'
//           })

//           response.data.pipe(fs.createReadStream(filePath))

//           return new Promise((resolve, reject) => {
//             writer.on('finish', resolve)
//             writer.on('error', reject)
//           })
//           });
//        });
//     });



app.listen(3001, () => {
    console.log('App is running on port 3001')
});