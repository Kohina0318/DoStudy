import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getEnglishBooks = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/english-books-list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' ,
      Authorization: `${await getAppToken()}`},
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
    console.log('error in getEnglishBooks...in EnglishandHindiBooksRep ', err);
  }
};

const getHindiBooks = async () => {
    try {
      const response = await fetch(`${await SERVER_URL()}/api/hindi-books-list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=utf-8' ,
        Authorization: `${await getAppToken()}`},
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
      console.log('error in getHindiBooks...in EnglishandHindiBooksRep ', err);
    }
  };
  


export {  getEnglishBooks,getHindiBooks };
