import React, { Component } from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { notify } from "react-notify-toast";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      user {
        email
        name
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        name
      }
    }
  }
`;
class Profile extends Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

  render() {
    const { email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">Profile</h4>
        <div className="flex flex-column">
          <input
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Your name"
            readOnly
          />

          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
            readOnly
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
            readOnly
          />
        </div>
        <div className="flex mt3"></div>
      </div>
    );
  }
}

export default Profile;
