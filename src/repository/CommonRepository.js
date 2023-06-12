import { getDatafromAsync } from './AsyncStorageServices';

const getAppToken = async () => {
    try {
      var Token =await  getDatafromAsync('@Token') ;
      return Token;
    } catch (e) {
      console.log('error in getAppToken');
    }
  };
  
  const getUserData = async () => {
    try {
      var getData =  await getDatafromAsync('@UserData');
      return getData;
    } catch (e) {
      console.log('erro in getUserData', e);
    }
  };

export {getAppToken,getUserData};
