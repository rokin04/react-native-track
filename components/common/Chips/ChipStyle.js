import { Dimensions, StyleSheet } from "react-native";
import { FONT, SIZES } from "../../../constants";

const {height, width} = Dimensions.get("window");

export const Styles = StyleSheet.create({
    view:{
        height: height*0.03,
        width: '22%',
        alignItems:"center",
        justifyContent:"space-between",
        // paddingVertical:width*0.012,
        paddingHorizontal:width*0.02,
        flexDirection:"row",
        borderRadius: 30,
        marginHorizontal: width*0.02,
        marginVertical: width*0.02,
        backgroundColor: "#E4E9EB"
    },
    chipTxt:{
        fontFamily:FONT.regular,
        fontSize: height*0.016,
        color: "#54585A"
    },
    image:{
        height:width*0.04,
        width: width*0.04,
        tintColor:  "#54585A"
    },
    box:{
        borderWidth:1,
        borderColor:'#d0d2d2',
        height: height*0.1,
        width: width*0.9,
        alignSelf:"center",
        padding: width*0.02,
        borderRadius: 3
      },
      btnPrimary:{
        height:height*0.06,
        width: width*0.26,
        backgroundColor:"#019FFE",
        borderRadius:3,
        alignItems:"center",
        justifyContent:"space-evenly",
      },
      btnTxt:{
        color:"#fff",
        fontSize: SIZES.large,
        marginLeft:-width*0.04,
        fontFamily:FONT.medium,
        marginTop: height*0.005
      }
})