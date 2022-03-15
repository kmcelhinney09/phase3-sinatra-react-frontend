import React, { useState } from "react";
import { UserAuth } from "../context/AuthProvider";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useHistory } from 'react-router-dom'

function NavBar() {
  const [showNavRight, setShowNavRight] = useState(false);
  const { user, setUser } = UserAuth();

  const history = useHistory()

  function handleLogout() {
    setUser(null);
    sessionStorage.clear();
  }

  function handleAddRecipe(){
    const pushed_address = `/recipes/new`;
    history.push(pushed_address);
  }

  return (
    <MDBNavbar expand="lg" sticky dark bgColor="primary" className="py-3">
      <MDBContainer fluid>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarRightAlignExample"
          aria-controls="navbarRightAlignExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavRight(!showNavRight)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarBrand>Mama's Recipe Box</MDBNavbarBrand>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              {user ? null : (
                <MDBNavbarLink active aria-current="page" href="/">
                  {" "}
                  Home{" "}
                </MDBNavbarLink>
              )}
            </MDBNavbarItem>
            <MDBNavbarItem>
              {user ? (
                <MDBNavbarLink
                  active
                  href={`/users/${user.id}`}
                >{`Logged in as: ${user.name}`}</MDBNavbarLink>
              ) : null}
            </MDBNavbarItem>
            <MDBNavbarItem>
              {user ? (
                <MDBNavbarLink active onClick={handleAddRecipe}>Add Recipe</MDBNavbarLink>
              ) : null}
            </MDBNavbarItem>
            <MDBNavbarItem>
              {user ? (
                <MDBNavbarLink active onClick={handleLogout}>Logout</MDBNavbarLink>
              ) : null}
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default NavBar;
