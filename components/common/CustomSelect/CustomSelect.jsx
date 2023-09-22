
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FONT, SIZES } from '../../../constants';
import { useSelector } from 'react-redux';

const { height, width } = Dimensions.get("window");

const CustomSelect = ({
  title = "",
  data = [],
  onChange = () => { },
  initialValue = "",
  search = false,
  placeholder = "Select item",
  customStyles = {}
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <View style={styles.container}>
      {title && <Text style={{...styles.label, ...customStyles.label}}>{title}</Text>}
      <Dropdown
        style={{ ...styles.dropdown, ...customStyles }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          onChange(item, data);
          setValue(item.value);
        }}
      />
    </View>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  dropdown: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#d0d2d2",
    height: 50,
    borderWidth: 0.5,
    width: '100%'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: width*0.02,
    top: -10,
    backgroundColor: 'white',
    zIndex: 999,
    paddingHorizontal: 6,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color:'#222222',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: FONT.medium
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: FONT.medium
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
