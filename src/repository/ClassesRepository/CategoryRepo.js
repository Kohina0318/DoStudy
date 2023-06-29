import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";
import { removeDatafromAsync } from "../AsyncStorageServices";

const getAllCategory = async (type) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/category-list?type=${type}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${await getAppToken()}` },
    });
    const result = await response.json();
    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('SignIn');
      return result;

    } else {
      return result;
    }
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
    if (result.token_status == 'false') {
      await removeDatafromAsync('@UserData');
      await removeDatafromAsync('@Token');

      ToastAndroid.showWithGravityAndOffset(
        `${'Token Expired'}`,
        ToastAndroid.TOP,
        ToastAndroid.LONG,
        10,
        10,
      )
      navigateToClearStack('SignIn');
      return result;

    } else {
      return result;
    }
  } catch (err) {
    console.log('error in getCategoryTopics...in CategoryRepo ', err);
  }
};

export {  getAllCategory,getCategoryTopics };
