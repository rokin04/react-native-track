import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SIZES, IMAGES, FONT, ICONS } from '../../constants'
import { Logo } from '../../components';
import styles from './home.style';

const Home = ({ navigation }) => {

  const handleSkipPress = () => {
    navigation.navigate('Login');
  };
  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo flex={2}/>
      <View style={styles.taglineContainer}>
        <Text style={styles.tagline}>" Own Your Growth "</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={IMAGES.HOMEHEROBANNER}
          style={styles.image}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSkipPress}>
          <Text style={styles.btnTitleStyleSkip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.getStartedButton, styles.getStartedButtonWithArrow]} onPress={handleAboutPress}>
          <View>
            <Text style={styles.btnTitleStyle}>Get Started</Text>
          </View>
          <View style={styles.arrowWrapper}>
            <Image
              source={ICONS.chevronRight}
              style={styles.iconRight}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
