import Toast from "react-native-toast-message";

export const useToast = () => {
    return ({
        successToast: (result) => Toast.show({
            type: "successToast",
            props: { text: result.responseMessage }
        }),
        errorToast: (result) => {
            Toast.show({
                type: "tomatoToast",
                props: { text: result.responseMessage }
            });
        }
    });
}