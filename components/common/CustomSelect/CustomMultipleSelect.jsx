import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FONT } from '../../../constants';
import { HOST } from "../../../utils/Host-URL";

const DATA = [
    { label: 'React Naive', value: '1' },
    { label: 'Javascript', value: '2' },
    { label: 'Laravel', value: '3' },
    { label: 'PHP', value: '4' },
    { label: 'jQuery', value: '5' },
    { label: 'Bootstrap', value: '6' },
    { label: 'HTML', value: '7' },
    { label: 'CSS', value: '8' },
];

const CustomMultipleSelect = () => {
    const [selected, setSelected] = useState([]);
    const [providersData, setProvidersData] = useState();
    const [customObj, setCustomObj] = useState([])

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
            </View>
        );
    };

    useEffect(() => {
        fetch(`${HOST}:8080/api/ndis/providers`)
          .then((res) => res.json())
          .then((data) => {
            setProvidersData(data.providerNames || []);
            let obj = {}
            providersData?.length && providersData.map((data)=>{
                obj['value'] = data.providerId
                obj['label'] = data.providerName
                setCustomObj([obj]);
            })
          });
      }, []);


    return (
       providersData?.length && <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={DATA}
                placeholder="Select Providers"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={item => {
                    setSelected(item);
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
        fontFamily:FONT.medium
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily:FONT.medium
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily:FONT.medium
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
        fontFamily:FONT.medium
    },
});

export default CustomMultipleSelect;