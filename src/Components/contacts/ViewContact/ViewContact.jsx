import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../../Services/ContactServices';
import Spinner from '../../spinner/Spinner';
function ViewContact(props) {

    let { contactId } = useParams();

    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: '', 
        group : {}
    });

    useEffect(() => {
        async function fetchMyData() {
            try {
                setState({
                    ...state,
                    loading: true
                })
                let response = await ContactServices.getContact(contactId);
                let groupResponse = await ContactServices.getGroup(response.data);
                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
                    group : groupResponse.data
                })
            } catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                })
            }
        }
        fetchMyData();
    }, [contactId]);

    let { loading, contact, errorMessage, group } = state;
    return (
        <>
            <section className='view-contact p-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h3 texxt-warning fw-bold'>View Contact</p>
                            <p className='fst-italic'>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> : <>
                    {
                        Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                        <section className='view-contact mt-3'>
                        <div className='container'>
                            <div className='row align-items-center'>
                                <div className='col-md-4'>
                                    <img src={contact.photo} className='contact-img' alt='' />
                                </div>
                                <div className='col-md-8'>
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
                                        <li className='list-group-item list-group-item-action'>
                                            Company  : <span className='fw-bold'>{contact.company}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                            Title : <span className='fw-bold'>{contact.title}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                            Group : <span className='fw-bold'>{group.name}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <Link to='/contacts/list' className='btn btn-warning'>Back</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    }
                </>
            }
        </>
    );
}

export default ViewContact;