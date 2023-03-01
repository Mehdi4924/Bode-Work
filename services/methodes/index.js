import { AsyncStorage } from "react-native"
import { stores } from "../stores"

const methodes = {
    getUserType: async () => {
        //const userType = await AsyncStorage.getItem('USER_TYPE')
        // console.log(userType)
        // await AsyncStorage.getItem('USER_TYPE')
        //     .then(res => {
        //         if (res === 'client') {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     })
       return stores.USER_TYPE
    }
}

export { methodes }