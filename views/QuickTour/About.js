import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES, IMAGES, ICONS } from '../../constants';
import { Logo } from '../../components';
import styles from './about.style.js';
const { width } = Dimensions.get('window');

const imageSet = [
  IMAGES.Slider1,
  IMAGES.Slider2,
  IMAGES.Slider3,

];

const About = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const sliding = () => {
    setIndex((prev) => (prev + 1) % imageSet.length);
  }

  const handleSkipPress = () => {
    navigation.navigate('Login');
  };

  const handleAboutPress = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const images = setInterval(() => {
      sliding()
    }, 2000);

    return () => {
      clearInterval(images);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Logo flex={1} marginTop={0}/>
      <View style={styles.taglineContainer}>
        <Text style={styles.tagline}>" Own Your Growth "</Text>
      </View>
      <View style={styles.sliderContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={imageSet[index]}
            style={styles.image}
            resizeMode="cover" 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Trackability refers to the ability to monitor and progress</Text>
        </View>
        <View style={styles.dotContainer}>
          {imageSet.map((img, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                index === i ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
        <View style={styles.tourbtnContainer}>
          <TouchableOpacity style={styles.tourBtn} onPress={sliding}>
            <Text style={styles.btnTourTitleStyle}>Quick Tour</Text>
            <View style={styles.arrowWrapper}>
              <Image
                source={ICONS.playButtonCircled}
                style={styles.iconRight}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleSkipPress}>
          <Text style={styles.btnTitleStyleSkip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleAboutPress}>
          <View>
            <Image
              source={ICONS.chevronRightWhiteColor}
              style={styles.iconSize}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default About;
