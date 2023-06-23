import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const postforgotByNumber = async formdata => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/forgot-pswd`, {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data',
      Authorization: `${await getAppToken()}`},
      body: formdata,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postforgotByNumber...in ForgotRepository ', err);
  }
};

const postVerifyOtpForgot = async formdata => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/forgot-verify-otp`, {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data',
      Authorization: `${await getAppToken()}`},
      body: formdata,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postVerifyOtpForgot...in ForgotRepository ', err);
  }
};

const postforgotPassword = async formdata => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/forgot-change-pswd`, {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data',
      Authorization: `${await getAppToken()}`},
      body: formdata,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postforgotPassword...in ForgotRepository ', err);
  }
};

export {postforgotByNumber,postforgotPassword,postVerifyOtpForgot};
