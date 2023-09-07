import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { Styles } from "./ChipStyle";
import icons from "../../../constants/icons";
import styles from "../../../views/Profile/ProfileSetting/profile.style";

const { height, width } = Dimensions.get("window");

const Chips = () => {
  const [label, setLabel] = useState("");
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const inputRef = useRef();

  const addChip = () => {
    let tempData = data;
    tempData.push(label);
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setData(temp);
    inputRef.current.clear();
  };

  const deleteChip = (index) => {
    setSelectedId(index);
    setTimeout(()=>{
    let tempData = data;
    let temp = tempData.filter((item, ind) => {
      return index != ind;
    });
    setData(temp);
    setSelectedId(null);
  },500);
  };

  return (
    <View>
      <View style={Styles.box}>
        <Image source={icons.chevronDown} style={{ alignSelf: "flex-end" }} />
        <View style={{width:'100%'}}>

        <FlatList
          data={data}
          numColumns={3}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  Styles.view,
                  index === selectedId &&
                  { backgroundColor: '#019FFE' }
                ]}
                >
                <Text
                  style={[
                    Styles.chipTxt,
                    index === selectedId &&
                    { color:"#fff" }
                  ]}>
                  {item}
                </Text>
                <TouchableOpacity onPress={() => deleteChip(index)}>
                <Image
                  source={icons.cross}
                  style={[
                    Styles.image,
                    index === selectedId &&
                    { tintColor:"#fff" },
                  ]}
                />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        </View>
      </View>

      <View style={styles.rowView}>
        <TextInput
          placeholder="Enter Any other interest"
          ref={inputRef}
          onChangeText={(txt) => setLabel(txt)}
          onSubmitEditing={() => addChip()}
          style={[styles.input, { width: width * 0.6 }]}
        />
        <TouchableOpacity
          style={[styles.rowView, Styles.btnPrimary]}
          onPress={() => addChip()}>
          <Image source={icons.add} />
          <Text style={Styles.btnTxt}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chips;
