
import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants'
import { Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: "white",
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'flex-start',
    width: '85%',
    justifyContent: "center"
  },
  textHeading: {
    fontWeight: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    textAlign: "left"
  },
  handEmoji: {
    fontSize: SIZES.large,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "left",
    color: COLORS.primary,
    lineHeight: 20,
  },
  roleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    overflow: 'hidden',
  },

  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: '85%',
    marginBottom: 10,
    marginTop: 20,
  },
  iconWrapper: {
    alignItems: "flex-end",
    flex: 1,
    position: "absolute",
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 8
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
    // borderColor: 'rgba(77, 77, 77, 0.4)',
    borderColor: "#dddddd",
  },
  errorText: {
    color: "red",
    marginTop: -8,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
    width: '85%',
  },
  iconRight: {
    width: 20,
    height: 20
  },
  iconPerson: {
    width: 24,
    height: 24
  },

  forgotContainer: {
    width: '85%',
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: 'row',
    marginTop: 20,
    paddingVertical:2,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    textAlign:"center"
  },
  label: {
    color: COLORS.primary,
    fontSize: SIZES.medium,    
  },
  iconcheck: {
    width: 15,
    height: 15,
  },
  loginButton: {
    width: '85%',
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  lineContainer: {
    flexDirection: 'row',
    width: "85%",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 20,
  },
  line: {
    height: 1,
    width: '30%',
    backgroundColor: COLORS.primary,
    opacity: 0.3
  },
  orText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    textAlign: "center",
    marginBottom: 5,
    paddingHorizontal: 10
  },
  lineorContainer: {
    marginTop: 10
  },
  orTextColor: {
    color: COLORS.secondary,
  },
  lineColor: {
    opacity: 0.4
  },
  appSigninContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "55%",
    alignItems: 'center',
    marginTop: 15,
  },
  appIcon: {
    width: 40,
    height: 40,
  },
  pushLink: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    paddingVertical: 30
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
});

export default styles;