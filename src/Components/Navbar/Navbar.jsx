import React from 'react';
import {Link} from 'react-router-dom';
function Navbar(props) {
    return (
        <>
         <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
            <div className='container'>
                <Link to='/' className='navbar-brand'>
                <i className='fa fa-mobile text-warning'></i> Contact <span className='text-warning'>Manager</span></Link>
            </div>
         </nav>
        </>
    );
}

export default Navbar;