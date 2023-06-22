import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getAllCategory = async (cid,sid) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/category-list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${await getAppToken()}` },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getAllCategory...in CategoryRepo ', err);
  }
};


const getCategoryTopics = async (cid,sid) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/topic-list?category_id=${cid}&subject_id=${sid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${await getAppToken()}` },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getCategoryTopics...in CategoryRepo ', err);
  }
};

export {  getAllCategory,getCategoryTopics };
