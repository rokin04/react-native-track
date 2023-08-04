import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES, IMAGES, ICONS } from '../../constants';
import { Logo } from '../../components';

const { width } = Dimensions.get('window');

const imageSet = [
  IMAGES.HOMEHEROBANNER,
  IMAGES.Slider1,
  IMAGES.Slider2,
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

export default About;
