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

  const getAppLogoAsync = async () => {
    try {
      var getData =  await getDatafromAsync('@AppLogo');
      return getData;
    } catch (e) {
      console.log('erro in getAppLogoAsync', e);
    }
  };

  const getADsDatabyAsync = async () => {
    try {
      var getData =  await getDatafromAsync('@AdsData');
      return getData;
    } catch (e) {
      console.log('erro in getADsDatabyAsync', e);
    }
  };


export {getAppToken,getUserData,getAppLogoAsync ,getADsDatabyAsync};
