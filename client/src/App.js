import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Uploader }  from './components/fileUploader/Uploader';
import { MultiUploader }  from './components/fileUploader/MultiUploader';
import { Preview } from './components/filePreview/Preview';
import { GridPreview } from './components/filePreview/GridPreview';
import { TableView } from './components/filePreview/TableView';
import Navigation from './components/Navigation';
import { SignUp } from './components/SignUp';
import { LogIn } from './components/Login';
import './App.css'; 

function App() {

  const [files, setFiles] = useState([]);

  const onSuccess = (savedFiles) => {
    setFiles(savedFiles)
  };

  return (

     <div className="APP">
       <Router>
        <Navigation />
        <MultiUploader onSuccess={onSuccess}/>
        <Preview files={files}/> 
        <Switch>
          <Route path="/" exact component={() => <div><h1>Manage Your Photos!</h1><p>Are you a New user? Create Your account...</p><SignUp /><LogIn/></div>} />
          <Route path="/grid" exact component={() => <GridPreview />} />
          <Route path="/table" exact component={() => <TableView />} />
          <Route path="/login_signup" exact component={() => <div><SignUp /><LogIn/></div>} />
        </Switch>
        {/* <Footer /> */}
      </Router>

       {/* <GridPreview/>
       <TableView/> */}

     </div>

  );
}

export default App;
