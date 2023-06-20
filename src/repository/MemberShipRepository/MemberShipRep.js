import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getPackage = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/package`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${await getAppToken()}` },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in MemberShipRep...in MemberShipRepository ', err);
  }
};


export {  getPackage };
