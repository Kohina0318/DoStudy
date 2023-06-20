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

const postMemberShipPayment = async (formdata) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/purchase-package`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`},
        body: formdata,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in postMemberShipPayment...in MemberShipRep ', err);
  }
};



export {  getPackage ,postMemberShipPayment};
