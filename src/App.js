import React from 'react'
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import ContactList from './Components/contacts/ContactList/ContactList';
import AddContact from './Components/contacts/AddContact/AddContact';
import ViewContact from './Components/contacts/ViewContact/ViewContact';
import EditContact from './Components/contacts/EditContact/EditContact';
import Spinner from './Components/spinner/Spinner';

function App() {
  return (
    <>
    
    <Navbar/>
    <Routes>
       <Route path="/" element={<Navigate to="/contacts/list"></Navigate>} />
       <Route path="/contacts/list" element={<ContactList/>} />
       <Route path="/contacts/add" element={<AddContact/>} />
       <Route path="/contacts/view/:contactId" element={<ViewContact/>} />
       <Route path="/contacts/edit/:contactId" element={<EditContact/>} />

    </Routes>
    </>
  );
}

export default App;
