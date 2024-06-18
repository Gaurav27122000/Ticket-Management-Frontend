import React from "react";
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
  const decodeToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
  
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };
  const user = decodeToken();
  return (
    <>
      <div class="row justify-content-around mt-5 user-info">
        <div class="col-12 col-md-3">
          <figure class="avatar avatar-profile">
            <img
              class="rounded-circle img-fluid"
              src="../../../default_avatar.jpg"
            />
          </figure>
        </div>

        <div class="col-12 col-md-5">
          <h4>Username</h4>
          <p>{user.sub}</p>

          <h4>Full Name</h4>
          <p>{user.first_name} {user.last_name}</p>

          <h4>Email Address</h4>
          <p>{user.email}</p>

          <h4>Role</h4>
          <p>{user.role.toUpperCase()}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;