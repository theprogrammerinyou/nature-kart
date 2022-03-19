import axios from "axios";

export const signupUser = (userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/signup", userData)
      .then((response) => {
        console.log("response", response);
        resolve(response?.data?.data);
      })
      .catch((error) => {
        reject(error?.response?.data);
        console.error("Error signing up user", error?.response?.data);
      });
  });
};

export const loginuser = (userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/login", userData)
      .then((response) => {
        console.log("user logged in");
        resolve(response?.data?.data);
      })
      .catch((error) => {
        reject(error?.response?.data);
        console.error("Error loggin in user", error?.response?.data);
      });
  });
};
