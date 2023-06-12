import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getCarousel = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/carousel`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('error in getCarousel...in DashboardRep ', err);
  }
};


export {  getCarousel };
