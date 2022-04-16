// import logo from './logo.svg';
import './Navbar.css';
// import Instagram from './Instagram'
import {GiHamburgerMenu} from "react-icons/gi"
import { Fragment } from 'react/cjs/react.production.min';
import {useState} from "react"
import {ImCross} from "react-icons/im"
import {FiLogOut} from "react-icons/fi"
import {HiOutlineLogin} from "react-icons/hi"
import {BiSearchAlt} from "react-icons/bi"
import {AiOutlineShoppingCart} from "react-icons/ai"
 
function Navbar() {
  
    const [show, setShow]=useState(false);
  
  
    return (
    <Fragment>
         
         <div className='nav-button' onClick={()=> setShow(!show)}>
             {show?'':<GiHamburgerMenu className='hamburger' />}
         </div>
      {show? <div className='back-container'>
          <div className="blur-back" onClick={()=> setShow(!show)}></div>
          
        <div className="container">
            
            <div className='logo-sec'>
                <p>EcommerceStore</p>

            </div>
            <div className='profile-sec'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" 
                alt="profile"/>
                <button>edit profile</button>
            </div>
            
            <div className='option-sec'>
                <div>
                 <FiLogOut/>
                 <a href="/search" className='link'>Me</a>
                </div>
                <div>
                 <FiLogOut/>
                 <a href="/search" className='link'>Me</a>
                </div>
                <div>
                 <FiLogOut/>
                 <a href="/search" className='link'>Me</a>
                </div>
            
           
            </div>
            <div className='created-sec'>
             <div>created By</div>
            </div>
     
    
    </div>
      </div>: <span> </span>}  
    </Fragment>
  );
}

export default Navbar;
