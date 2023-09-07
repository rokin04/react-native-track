import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FONT, SIZES } from '../../../constants';

const { height, width } = Dimensions.get("window");


const InputDropdown = ({data = [], width , title = '' , onChange = () => {} }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <Dropdown
        style={[styles.dropdown,{width:width}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="name"
        valueField='name'
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onChange(item, data);
        }}
      />
    </View>
  );
};

export default InputDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: height*0.02,
  },
  dropdown: {
    height: height*0.06,
    borderColor: "#d0d2d2",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: width*0.04,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: width*0.02,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: height * 0.018,
    fontFamily: FONT.regular,
    color:'#222222',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: "#54585A",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    borderRadius: 3,
    borderColor: "#d0d2d2",
  },
});

