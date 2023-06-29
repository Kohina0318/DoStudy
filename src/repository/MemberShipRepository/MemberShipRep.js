import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getPackage = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/package`, {
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
    console.log('error in getPackage...in MemberShipRepository ', err);
  }
};

const getActivePackage = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/active-package`, {
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
    console.log('error in getActivePackage...in MemberShipRepository ', err);
  }
};

const postMemberShipPayment = async (formdata) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/purchase-package`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`},
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
      navigateToClearStack('SignIn');
      return result;

    } else {
      return result;
    }

  } catch (err) {
    console.log('error in postMemberShipPayment...in MemberShipRep ', err);
  }
};


const postFreePackageActive = async (formdata) => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/purchase-package`,
      {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data',
        Authorization: `${await getAppToken()}`},
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
      navigateToClearStack('SignIn');
      return result;

    } else {
      return result;
    }

  } catch (err) {
    console.log('error in postFreePackageActive...in MemberShipRep ', err);
  }
};



export {  getPackage,getActivePackage ,postMemberShipPayment,postFreePackageActive};
