
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
   input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: COLORS.primary,
    fontSize: SIZES.medium,
    flex: 1,
    width:"100%",
    borderColor: "#dddddd",
  },
});

export default styles;