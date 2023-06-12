
import AsyncStorage from '@react-native-community/async-storage';


const StoreDatatoAsync = async (key,value) => {
    try {
      await AsyncStorage.setItem(key,value)
    } catch (err) {
        console.log("Error from setAsyncData in Catch", err)
    }
}
const getDatafromAsync = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        const final_Data = JSON.parse(data)
        return final_Data
    } catch (err) {
        console.log("Error from getAsyncData in Catch", err)
    }
}

const removeDatafromAsync = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(e)
    }
}
export { StoreDatatoAsync, getDatafromAsync,removeDatafromAsync }

