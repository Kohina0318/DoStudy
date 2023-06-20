import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getSubjects = async (id) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/subject-list?class_id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' ,
      Authorization: `${await getAppToken()}`},
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getSubjects...in SubjectRepo ', err);
  }
};


export {  getSubjects };
