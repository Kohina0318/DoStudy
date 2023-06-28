import { ToastAndroid } from "react-native";
import { navigateToClearStack } from "../../navigations/NavigationDrw/NavigationService";
import { removeDatafromAsync } from "../AsyncStorageServices";
import { getAppToken } from "../CommonRepository";
import { SERVER_URL } from "../SERVER_URL";

const getDiscussionTopic = async () => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/discussion-topic-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`,
      },
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
    console.log('error in getDiscussionTopic...in DiscussionRepo ', err);
  }
};

const postCreateDiscussionTopic = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/create-discussion-topic`,
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
      navigateToClearStack('SignIn');
      return result;

    } else {
      return result;
    }
  } catch (err) {
    console.log('error in postCreateDiscussionTopic...in DiscussionRepo ', err);
  }
};



const getDiscussion = async (did) => {
  try {
    const response = await fetch(`${await SERVER_URL()}/api/discussion-user-list?topic_id=${did}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${await getAppToken()}`,
      },
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
    console.log('error in getDiscussion...in DiscussionRepo ', err);
  }
};


const postSendDiscussion = async formdata => {
  try {
    const response = await fetch(
      `${await SERVER_URL()}/api/user-send-discussion`,
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
      navigateToClearStack('SignIn');
      return result;

    } else {
      return result;
    }
  } catch (err) {
    console.log('error in postSendDiscussion...in DiscussionRepo ', err);
  }
};

export {getDiscussionTopic, getDiscussion,postSendDiscussion,postCreateDiscussionTopic };
