import React, { useEffect, useState } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import { ContactServices } from '../../../Services/ContactServices';
import  Axios  from 'axios';
function EditContact(props) {

    let navigate = useNavigate();
    let {contactId} = useParams();
    let [state, setState] = useState({
        loading : false,
        contact : {
            name : '',
            photo : '',
            mobile : '',
            email : '',
            company : '',
            title : '',
            groupId : ''
        },
        groups : [],
        errorMessage : ''
    });

    useEffect(() => {
        async function myData(){
            try{
                setState({
                    ...state,
                    loading: true
                })
                let response = await ContactServices.getContact(contactId);
                let dataurl=`http://localhost:9000/groups`;
                Axios.get(dataurl).then((res)=>
             {
            setState(
                {
                    ...state,
                    loading:true,
                    contact : response.data,
                    groups:res.data
                    

                }
            )
        }).catch((error)=>
        {
           setState({
            ...state,
            loading: false,
            errorMessage : error.message
           })

        }) 
            } catch(error){
                setState({
                    ...state,
                    loading: false,
                    errorMessage : error.message
                })
            }
        }
        myData();
    }, [contactId]);

    let updateInput = (event) => {
        setState({
            ...state,
            contact : {
                ...state.contact,
                [event.target.name] : event.target.value 
            }
        })
    }

    let submitForm = async (event) => {
        event.preventDefault();
        try{
            let response = await ContactServices.updateContact(state.contact, contactId);
            if(response) {
                navigate('/contacts/list', {replace: true});
            }
        } catch(error) {
            setState({
                ...state,
                errorMessage: error.message
            })
            navigate(`/contacts/edit/${contactId}`, {replace: false});
        }
    }
    let {loading, contact, groups, errorMessage } = state; 
    return (
        <>
        
        <section className='add-contact p-3'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='h3 text-primary fw-bold'>Edit Contact</p>
                        <p className='fst-italic'>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-md-4'>
                     <form onSubmit={submitForm}>
                        <div className='mb-2'>
                            <input required={true} type="text" name="name" onChange={updateInput} value={contact.name} className="form-control" placeholder='Name'/>
                        </div>
                        <div className='mb-2'>
                            <input required={true} type="text" name="photo" onChange={updateInput} value={contact.photo} className="form-control" placeholder='Photo URL'/>
                        </div>
                        <div className='mb-2'>
                            <input required={true} type="number" name="mobile" onChange={updateInput} value={contact.mobile} className="form-control" placeholder='Mobile Number'/>
                        </div>
                        <div className='mb-2'>
                            <input required={true} type="email" name="email" onChange={updateInput}  value={contact.email} className="form-control" placeholder='Email'/>
                        </div>
                        <div className='mb-2'>
                            <input required={true} type="text" name="company" onChange={updateInput} value={contact.company} className="form-control" placeholder='Company'/>
                        </div>
                        <div className='mb-2'>
                            <input required={true} type="text" name="title" onChange={updateInput} value={contact.title} className="form-control" placeholder='Title'/>
                        </div>
                        <div className='mb-2'>
                            <select  required={true} name="groupId" value={contact.groupId} onChange={updateInput} className='form-control'>
                                 <option value='' >Select a Group</option>
                                 {
                                    groups.length  > 0 &&
                                    groups.map(group => {
                                        return(
                                            <option key={group.id} value={group.id}>{group.name}</option>
                                        )
                                    })
                                 }
                            </select>
                        </div>
                        <div className='mb-2'>
                            <input type="submit" className="btn btn-primary" value='Update'/>
                            <Link to='/contacts/list' className='btn btn-dark ms-2'>Cancel</Link>
                        </div>
                     </form>
                  </div>
                  <div className='col-md-6'>
                      <img src={contact.photo} className="contact-img" alt=''></img>
                  </div>
                </div>
            </div>
        </section>
    </>
    );
}

export default EditContact;