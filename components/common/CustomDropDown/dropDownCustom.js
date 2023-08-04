import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { COLORS } from '../../../constants';

const DropDownCustom = ({ selectedValue, onValueChange, data, disabled,width,backgroundColor }) => {
  return (
    <View style={styles.container(width)}>
      <View style={styles.dropdownContainer(backgroundColor)}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.dropdown}
          mode={'dropdown'}
          enabled={!disabled}
          dropdownIconColor="white"
        >
          <Picker.Item label="Select" value="" />
          {data.map((item) => (
            <Picker.Item key={item.id}
              label={item.name}
              style={styles.PickerItem}
              contentDescription={item.description}
              value={item.id}
              />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:(width)=>( {
    width: width,
    
  }),
  dropdownContainer:(backgroundColor)=> ({
    width: '100%',
    borderRadius: 3,
    height: 50,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: backgroundColor,
  }),
  dropdown: {
    color: 'white',
    borderRadius: 3,
    width: '100%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  PickerItem: {
  }
});

export default DropDownCustom;
