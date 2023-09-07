import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: COLORS.primary,
    fontSize: SIZES.medium,
    flex: 1,
    width: "100%",
    borderColor: "#dddddd",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.02,
    columnGap: width * 0.03,
  },
  profileImg: {
    height: width * 0.3,
    width: width * 0.3,
    borderRadius: 100,
  },
  camera: {
    backgroundColor: "#00B278",
    height: width * 0.1,
    width: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: -height * 0.046,
    alignSelf: "flex-end",
  },
  profileTxt: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: "#54585A",
    marginLeft: width * 0.05,
  },
  roleTxt: {
    fontFamily: FONT.light,
    fontSize: SIZES.large,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#FBF6FF",
    marginBottom: height * 0.025,
  },
  errorTxt: {
    color: "#e73725",
  },
  btnRound: {
    height: width * 0.12,
    width: width * 0.12,
    backgroundColor: "#019FFE",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: width * 0.025,
    marginVertical: height * 0.02,
  },
  arrow: {
    backgroundColor: "#00B278",
    position: "absolute",
    height: width * 0.1,
    width: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    right: width * 0.02,
    top: height * 0.018,
  },
  headingTxt:{
    fontFamily:FONT.regular,
    fontSize:SIZES.large,
    color:"#54585A",
    alignSelf:"flex-start"
  },
  box:{
    borderWidth:1,
    borderColor:'#d0d2d2',
    height: height*0.1,
    width: width*0.9,
    alignSelf:"center",
    paddingHorizontal: width*0.02,
    borderRadius: 3,
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
  },
});

export default styles;