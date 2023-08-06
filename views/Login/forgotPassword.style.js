import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants'
import { color } from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      backgroundColor: COLORS.white,
      justifyContent: 'space-between',
    },
    pushLink: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingVertical: 30,
    },
    centerText: {
      color: COLORS.primary,
      fontSize: SIZES.medium,
    },
    registerText: {
      fontSize: SIZES.medium,
      fontWeight: "bold",
      color: COLORS.secondary,
    },
    para:{
        fontFamily:FONT.medium,
        fontSize:SIZES.medium
    },
    heading:{
        fontFamily:FONT.medium,
        fontSize:SIZES.xLarge,
        fontWeight:'bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
        color: COLORS.primary,
        fontSize: SIZES.medium,
        borderColor: "#dddddd",
        width:'100%',
        padding:10,
      },
      mainContainer:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        gap:35,
      },
      subContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        width:380,
        gap:10
      },
      submitBtn:{
        height: 50,
        backgroundColor:COLORS.secondary,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        width:'100%',
      },
      sunmitBtnText:{
        fontWeight:'bold',
        fontSize:SIZES.medium,
        color:COLORS.white
      },
      forgotPasswordImage:{
        height:250,
        width:'100%',
        resizeMode:'contain',
        transform: [{ scale: 1.2 }]
      },
      resendOTP:{
        textAlign:'right',
        color:COLORS.secondary,
        fontSize:SIZES.medium,
        textDecorationLine:'underline',
        fontWeight:'bold'
      },
      resetPasswordImage:{
        height:250,
        width:'100%',
        resizeMode:'contain',
      },
      resetHint:{
        margin:10
      }
  });

  export default styles