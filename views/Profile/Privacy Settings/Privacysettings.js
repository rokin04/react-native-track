import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../../constants';
import styles from '../ProfileSetting/profile.style';
import CustomInput from '../../../components/common/Input/CustomInput';
import { Ionicons } from "@expo/vector-icons";
const Privacysettings = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} overScrollMode={Platform.OS === 'android' ? "never" : "auto"}>
        <View className="p-5">
          <View className="mb-6">
        <Text className="text-xl font-popMedium" style={{ color: "#0D2B68" }}>
        Change New Password
        </Text>
        </View>
        <View className="mb-3">
        <Text className="text-lg font-popMedium" style={{ color: "black" }}>
        Current Password
        </Text>
        <CustomInput 
        placeholder="Current Password"
        />

        </View>
        <View className="mb-3">
        <Text className="text-lg font-popMedium" style={{ color: "black" }}>
        Choose Password
        </Text>
        <CustomInput 
        placeholder="Choose Password"
        />
        <Text className="text-md font-popMedium" style={{ color: "#0D2B68" }}>
        Must be at least 8 characters
        </Text>
        </View>
        <View className="mb-5">
        <Text className="text-lg font-popMedium" style={{ color: "black" }}>
        Confirm Password
        </Text>
        <CustomInput 
        placeholder="Choose Password"
        />
        <Text className="text-md font-popMedium" style={{ color: "#0D2B68" }}>
        Both passwords must match.
        </Text>
        </View>
        <TouchableOpacity
          className="w-full p-2 mt-3 bg-blue-400 ml-auto rounded-sm">
          <Text className="text-lg text-center font-popMedium text-white font-semibold">
            Update
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacysettings;
