import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import logo from "./logo.png";
import FormUser from "./FormUser/FormUser";

class DashboardPage extends React.Component {
  render() {
    const { isConfirmed } = this.props;
    return (
      <div className="container-fluid">
        {!isConfirmed && <ConfirmEmailMessage />}
        {isConfirmed && 
        <div >
                     <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="http://digitranssolution.com" target="_blank">
              <img src={logo} width="200" height="100" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Inventory Management System</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav ml-auto">
                
                <li className="navbar-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                           
              </ul>
            </div>
          </nav>
          <br/>
          
          <Route path="/profile" exact component={FormUser} />
                   
        </div> 
          }
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(mapStateToProps)(DashboardPage);
