import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";


const postChangePswd = async formdata => {
    try {
      const response = await fetch(
        `${await SERVER_URL()}/api/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${await getAppToken()}`
          },
          body: formdata,
        },
      );
  
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
        navigateToClearStack('Dashboard');
        return result;
        
      } else {
        return result;
      }
  
    } catch (err) {
      console.log('error in postChangePswd...in ProfileRepository ', err);
    }
  };

  export {
    postChangePswd
  };
  