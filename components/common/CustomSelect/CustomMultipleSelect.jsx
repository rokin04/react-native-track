import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FONT } from '../../../constants';

const CustomMultipleSelect = ({data = [], placeholder = "Select item", initialvalue, onChange}) => {
    const [selected, setSelected] = useState(initialvalue);

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <AntDesign style={styles.icon} color={selected.includes(item.value) ? 'green' : 'black'} name="Safety" size={20} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                searchPlaceholder="Search..."
                value={selected}
                onChange={item => {
                    setSelected(item);
                    onChange(item);
                }}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text className='font-popMedium' style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color="black" name="delete" size={17} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 30,
        flex: 1
    },
    dropdown: {
        height: 50,
        padding: 12,
        borderWidth: 0.2,
        elevation: 2,
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
        fontFamily: FONT.medium
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
        fontFamily: FONT.medium
    },
});

export default CustomMultipleSelect;