import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Badge from "@mui/material/Badge";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useData } from "../Context/DataContext";
import { Link } from "react-router-dom";

export default function Navbar1() {
  const {
    searchText,
    setSearchText,
    backendCart,
    whichCategoryClicked,
    setWhichCategory,
    setExitClicked,
    setIsItLogin,
  } = useData();
  const [whichLinkClicked, setWhichLinkClicked] = useState("Home");

  return (
    <nav className="nav-container">
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          bg="light"
          style={{ width: "100%" }}
          className="bg-body-tertiary mb-3"
        >
          <Container fluid>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <h1>LOGO</h1>
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form className="d-flex align-items-center">
                  {" "}
                  {/* Center the content vertically */}
                  <Form.Control
                    type="search"
                    id="add"
                    placeholder="Search"
                    className="me-2 input-style"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      console.log(searchText);
                    }}
                    aria-label="Search"
                  />
                </Form>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link
                    onClick={() => setWhichLinkClicked("Home")}
                    className={
                      whichLinkClicked === "Home"
                        ? "make-blue nav-link"
                        : "nav-link"
                    }
                    to="/"
                  >
                    <HomeOutlinedIcon className="icon" />
                    <p>Home</p>
                  </Link>
                  <Link
                    onClick={() => setWhichLinkClicked("Basket")}
                    className={
                      whichLinkClicked === "Basket"
                        ? "make-blue nav-link"
                        : "nav-link"
                    }
                    to="/cart"
                  >
                    <Badge badgeContent={backendCart.length} color="error">
                      <LocalGroceryStoreOutlinedIcon
                        className="icon"
                        color="action"
                      />
                    </Badge>
                    <p>Basket</p>
                  </Link>
                  <Link
                    onClick={() => setWhichLinkClicked("Taxs")}
                    className={
                      whichLinkClicked === "Taxs"
                        ? "make-blue nav-link"
                        : "nav-link"
                    }
                    to="/taxs"
                  >
                    <ReceiptLongOutlinedIcon className="icon" />
                    <p>Taxs</p>
                  </Link>
                  <Link
                    onClick={() => setWhichLinkClicked("Customers")}
                    className={
                      whichLinkClicked === "Customers"
                        ? "make-blue nav-link"
                        : "nav-link"
                    }
                    to="/customers"
                  >
                    <PersonOutlineOutlinedIcon className="icon" />
                    <p>Customers</p>
                  </Link>
                  <Link
                    onClick={() => setWhichLinkClicked("Statistics")}
                    className={
                      whichLinkClicked === "Statistics"
                        ? "make-blue nav-link"
                        : "nav-link"
                    }
                    to="/statistics"
                  >
                    <AssessmentOutlinedIcon className="icon" />
                    <p>Statistics</p>
                  </Link>
                  <Link
                    onClick={() => {
                      setWhichLinkClicked("Exit");
                      setExitClicked(true);
                      setIsItLogin(false);
                    }}
                    className={
                      whichLinkClicked === "Exit"
                        ? "make-blue nav-link"
                        : "nav-link"
                    }
                    to="/login"
                  >
                    <ExitToAppOutlinedIcon className="icon" />
                    <p>Exit</p>
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </nav>
  );
}
