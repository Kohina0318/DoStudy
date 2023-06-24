import { ToastAndroid } from "react-native";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";

const getSettingDetails = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/setting`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8',
      Authorization: `${await getAppToken()}` },
    });
    const result = await response.json();

      return result;
    
  } catch (err) {
    console.log('error in getSettingDetails...in SettingRep ', err);
  }
};


export {  getSettingDetails };
