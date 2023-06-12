import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getContent= async (cid,sid,ctid) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/content-list?class_id=${cid}&subject_id=${sid}&category_id=${ctid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getContent...in ContentRepo ', err);
  }
};


export {  getContent };
