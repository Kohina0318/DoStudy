import { SERVER_URL } from "../SERVER_URL";

const postSignIn = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/login`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formdata,
      },
    );
    const result = await response.json();
   
    return result;
  } catch (err) {
    console.log('error in postLogin...in SignInRepository ', err);
  }
};

export {postSignIn};
