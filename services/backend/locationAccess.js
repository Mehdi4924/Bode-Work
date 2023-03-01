import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";
import AndroidOpenSettings from 'react-native-android-open-settings';
import { ToastMessage } from "../../themes";
import { useDispatch } from "react-redux";
import { setUserCordinates } from "../stores/actions/user";

export const getOneTimeLocation = () => {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
            //getting the Latitude from the location json
            const latitude = position.coords.latitude;
    
            //getting the Longitude from the location json
            const longitude = position.coords.longitude;
            
            //Setting Longitude state
            console.log("latitude =====> ", latitude);
            AsyncStorage.setItem("currentLatitude", JSON.stringify(latitude));

            //Setting Longitude state
            console.log("longitude =====> ", longitude);
            AsyncStorage.setItem("currentLongitude", JSON.stringify(longitude));

            const data = {
                latitude: latitude,
                longitude: longitude,
                address: null,
            }
            dispatch(setUserCordinates(data));
        },
        (error) => {
            Alert.alert(
                "Location Service Permission",
                "Turn On Location Services to Allow Bode Work to Determine Your Location!",
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                            ToastMessage("User Cancelled Location Service Permission")
                        },
                        style: "cancel"
                    },
                    { 
                        text: "Settings", 
                        onPress: () =>  AndroidOpenSettings.locationSourceSettings(),
                        style: "default"
                    }
                ]
            );
        },
        {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000,
        },
    );
};