import React, { useState } from 'react';
import { UserAuth } from '../context/AuthProvider'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

function NavBar() {
  const [showNavRight, setShowNavRight] = useState(false);
  const { user, setUser } = UserAuth()

  function handleLogout() {
    setUser(null)
    sessionStorage.clear()
  }

  return (
    <MDBNavbar expand="lg" sticky dark bgColor='primary' className='py-3'>
      {console.log(user)}
      <MDBContainer fluid>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarRightAlignExample'
          aria-controls='navbarRightAlignExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavRight(!showNavRight)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarBrand>Mama's Recipe Box</MDBNavbarBrand>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              {user? null:<MDBNavbarLink active aria-current='page' href='/'> Home </MDBNavbarLink>}
            </MDBNavbarItem>
            <MDBNavbarItem>
              {user ? <MDBNavbarLink active href={`/users/${user.id}`}>{`Logged in as: ${user.name}`}</MDBNavbarLink> : null}
            </MDBNavbarItem>
            {user ? <MDBNavbarLink onClick={handleLogout}>Logout</MDBNavbarLink> : null}
            <MDBNavbarItem>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default NavBar