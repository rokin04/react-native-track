
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
    width: '100%',
    justifyContent: "center"
  },
  textHeading: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    textAlign: "left"
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "left",
    color: COLORS.primary,
    lineHeight: 20,
  }
});

export default styles;