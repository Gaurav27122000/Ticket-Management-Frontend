import React from "react";
import MetaData from "../layout/MetaData";

const Profile = () => {
  return (
    <>
      <MetaData http-equiv="Content-Security-Policy"  title={"My Profile"} />
      <div class="row justify-content-around mt-5 user-info">
        <div class="col-12 col-md-3">
          <figure class="avatar avatar-profile">
            <img
              class="rounded-circle img-fluid"
              src="../images/default_avatar.jpg"
              alt=""
            />
          </figure>
        </div>

        <div class="col-12 col-md-5">
          <h4>Full Name</h4>
          <p>John Doe</p>

          <h4>Email Address</h4>
          <p>johndoe@example.com</p>

          <h4>Joined On</h4>
          <p>2023-09-19</p>
        </div>
      </div>
    </>
  );
};

export default Profile;