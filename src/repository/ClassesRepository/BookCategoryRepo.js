import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getBookCategory = async (cid,sid) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/category-list?class_id=${cid}&subject_id=${sid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${await getAppToken()}` },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getBookCategory...in CategoryRepo ', err);
  }
};


export {  getBookCategory };
