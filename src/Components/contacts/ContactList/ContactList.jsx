import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices';
import Spinner from '../../spinner/Spinner';

let ContactList = () => {
    let [query, setQuery] = useState({
        text: ''
    })
    let [state, setState] = useState({
        loading : false,
        contacts : [],
        filteredContacts : [],
        errorMessage :''
    });


    useEffect(() => {
        async function fetchMyAPI(){
            try{
            setState({
                ...state,
                loading: true
            })
            let response = await ContactServices.getAllContacts();
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts : response.data
            })
        } catch(error){
            setState({
                ...state,
                loading: false,
                errorMessage : error.message
            })
        }
        }
        fetchMyAPI();
}, [])

 let clickDelete = async (contactId) => {
    try{
        let response = await ContactServices.deleteContact(contactId);
        if(response){
            setState({
                ...state,
                loading: true
            })
            let response = await ContactServices.getAllContacts();
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                filteredContacts: response.data
            })
        }
    } catch(error){
        setState({
            ...state,
            loading: false,
            errorMessage : error.message
        })
    }
 }

 let searchContacts = (event) => {
    setQuery({
        ...query,
        text : event.target.value
    });
    let theContacts = state.contacts.filter(contact =>  {
        return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setState({
        ...state,
        filteredContacts: theContacts
    })

 }

    let {loading, contacts, filteredContacts, errorMessage} = state;
    return (
        <>
            <section className='contact-search p-3'>
                <div className='container'>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col'>
                                <p className='h3 fw-bold'>Contact Manager
                                    <Link to='/contacts/add' className='btn btn-primary ms-2'>
                                        <i className='fa fa-plus-circle me-2'></i>
                                        New</Link>
                                </p>
                                <p className='fst-italic'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <form className='row'>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <input onChange={searchContacts} value={query.text} name="text"  type='text' className='form-control' placeholder='Search Names'></input>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <input  type='submit' className='btn btn-outline-dark' value="Search" ></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner/> : <>
                <section className='contact-list'>
                <div className='container'>
                    <div className='row'>
                    {
                        filteredContacts.length > 0 &&
                        filteredContacts.map(contact => {
                            return(
                                <div className='col-md-6' key={contact.id}>
                            <div className='card my-2'>
                                <div className='card-body'>
                                    <div className='row align-items-center d-flex justify-content-around'>
                                        <div className='col-md-4'>
                                            <img src={contact.photo} alt='' className='contact-img' />
                                        </div>
                                        <div className='col-md-7'>
                                            <ul className='list-group'>
                                                <li className='list-group-item list-group-item-action'>
                                                    Name  : <span className='fw-bold'>{contact.name}</span>
                                                </li>
                                                <li className='list-group-item list-group-item-action'>
                                                    Mobile Number  : <span className='fw-bold'>{contact.mobile}</span>
                                                </li>
                                                <li className='list-group-item list-group-item-action'>
                                                    Email  : <span className='fw-bold'>{contact.email}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='col-md-1 d-flex flex-column align-items-center'>
                                           <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                             <i className='fa fa-eye'></i>
                                           </Link>
                                           <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                             <i className='fa fa-pen'></i>
                                           </Link>
                                           <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                             <i className='fa fa-trash'></i>
                                           </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            )
                        })
                    }
                        
                    </div>
                </div>
            </section>
                </>
            }

           
        </>
    );
}

export default ContactList;