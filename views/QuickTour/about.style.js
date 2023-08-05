
import { Dimensions, StyleSheet } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants'
const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  taglineContainer: {
    flex: 0
  },
  tagline: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  sliderContainer: {
    flex: 3,
    marginTop:20
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginTop: 15,
  },
  text: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
    opacity: 0.2,
  },
  activeDot: {
    backgroundColor: COLORS.secondary,
    opacity: 0.8,
  },
  tourbtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  tourBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  borderColor: 'rgba(77, 77, 77, 0.4)', 
    borderWidth: 1,
  },
  btnTourTitleStyle: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginLeft: 8,
  },
  arrowWrapper: {
    marginLeft: 8,
  },
  iconRight: {
    width: 20,
    height: 20,
    opacity:0.8
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  buttonStyle: {
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  getStartedButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  btnTitleStyleSkip: {
    fontWeight: "bold",
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  btnTitleStyle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.medium,
  },
  iconSize: {
    width: 15,
    height: 15
  }
});

export default styles;