import { showMessage } from "react-native-flash-message";

const ToastMessage = (message) => {
    showMessage({
        message: message,
        backgroundColor: "#383d41",
        duration: 3000,
        floating: true,
        position: "bottom", 
    });
};

export default ToastMessage;
