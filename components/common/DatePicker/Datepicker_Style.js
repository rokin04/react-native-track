import { Dimensions, StyleSheet } from "react-native";
import { FONT, SIZES } from "../../../constants";

const {height, width} = Dimensions.get("window");

export const Styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:"#d0d2d2",
        width: width*0.43,
        height:height*0.06,
        alignSelf:"center",
        borderRadius:3,
        zIndex:-1,
        marginVertical:height*0.012,
        paddingHorizontal: width*0.03,
        fontFamily:FONT.regular,
        fontSize:SIZES.medium
    },
    inputLabel:{
        fontFamily:FONT.regular,
        position:"absolute",
        zIndex:1,
        alignSelf:"flex-start",
        backgroundColor:"#fff",
        marginHorizontal:width*0.02,
        fontSize:height*0.018,
        paddingHorizontal: width*0.01
    },
    icon:{
        tintColor:"#CCCCCC",
        position:"absolute",
        marginTop: -height*0.055,
        right:width*0.03
    }
})