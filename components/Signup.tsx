import React from "react";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <div className="grid grid-cols-4 gap-0 md:grid-cols-4 lg:grid-cols-12 ">
      <div className="col-span-4  lg:col-span-6 bg-login-bg-1  bg-cover bg-no-repeat py-16 lg:pl-8 xl:pl-40 px-4 md:px-10 lg:px-0">
        <div className="">
          <SignupForm />
        </div>
      </div>
      <div className="col-span-4 lg:col-span-6 bg-login-bg-2 bg-scroll bg-cover bg-no-repeat py-20 hidden lg:block"></div>
    </div>
  );
};

export default Signup;
