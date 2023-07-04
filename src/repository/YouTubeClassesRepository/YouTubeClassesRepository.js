import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getYouTubeClasses = async (cid,sid) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/youtube-class-list?subject_id=${sid}&category_id=${cid}`, {
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
    console.log('error in getYouTubeClassesRepo...in YouTubeClassesRepository ', err);
  }
};

const getYouTubeClassesByID= async (yid) => {
    try {
      const response = await fetch(`${await SERVER_URL()}/api/youtube-class-data-list?yt_class_id=${yid}`, {
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
      console.log('error in getYouTubeClassesByID...in YouTubeClassesRepository ', err);
    }
  };
  

export {  getYouTubeClasses,getYouTubeClassesByID };
