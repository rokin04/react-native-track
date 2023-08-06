import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants';
import styles from '../Profile/profile.style';
const AvatarScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container} alignItems={"center"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} overScrollMode={Platform.OS === 'android' ? "never" : "auto"}>
        <View style={styles.textContainer}>
          <Text style={styles.textHeading}>Hey, Hello I am Avatars Screen </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AvatarScreen;
