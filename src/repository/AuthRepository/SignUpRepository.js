import { SERVER_URL } from "../SERVER_URL";

const postSignUp = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/register`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formdata,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) { 
    console.log('error in postSignUp...in SignUpRepository ', err);
  }
};

const postVerifyOtp= async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/verfiy-otp`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formdata,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) { 
    console.log('error in postVerifyOtp...in SignUpRepository ', err);
  }
};

export {postSignUp,postVerifyOtp};
