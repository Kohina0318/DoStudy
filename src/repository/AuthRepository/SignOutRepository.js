import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const postSignOut = async () => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `${await getAppToken()}`
        }
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postSignOut...in SignOutRepository ', err);
  }
};


export { postSignOut };
