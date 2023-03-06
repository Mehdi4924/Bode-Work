import { fontSize, appStyles, sizes } from "../../../themes";

const { StyleSheet } = require("react-native");
const { height } = require("react-native-dimension");

export const styles=StyleSheet.create({
    uploadButton:{
        height:height(22.5),
        borderRadius:25
    },
    uploadButtonText:{
        ...appStyles.textMedium,
        ...appStyles.textPrimaryColor,
        marginTop:sizes.baseMargin
    }
})