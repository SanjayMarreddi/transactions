import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TablePage } from "./components/TablePage";
import { ComingSoon } from './components/ComingSoon';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <ComingSoon/> } > </Route>
        <Route path="/home" element={ <ComingSoon/> } > </Route>
        <Route path="/table" element={ <TablePage/> }></Route>
      </Routes>
    </div>
  );
}

export default App;
  