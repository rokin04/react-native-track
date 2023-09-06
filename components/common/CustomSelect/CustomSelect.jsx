
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FONT } from '../../../constants';

const CustomSelect = ({
    data = [],
    onChange = () => {},
    initialValue = "",
    search=false,
    placeholder="Select item",
    customStyles={}
  }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Dropdown
      style={{...styles.dropdown, ...customStyles}}
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
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  dropdown: {
    padding: 10,
    borderRadius: 5,
    height: 50,
    borderWidth: 0.5,
    width: '100%'
  },
  icon: {
    marginRight: 5,
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
