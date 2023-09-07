import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  Pressable,
} from "react-native";
import React,{ useState }from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Styles } from "./Datepicker_Style";
import icons from "../../../constants/icons";

const DatePicker = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        togglePicker();
        setSelectedDate(currentDate.toLocaleDateString());
      }
    } else {
      togglePicker();
    }
  };

  return (
    <View>
      <Pressable onPress={togglePicker}>
        <View>
          <Text style={Styles.inputLabel}>{props.label}</Text>
        </View>
        <TextInput
          style={Styles.input}
          value={selectedDate}
          onChangeText={setSelectedDate}
          editable={false}
        />

        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}

        <View>
          <Image source={icons.calendar} style={Styles.icon} />
        </View>
      </Pressable>
    </View>
  );
};

export default DatePicker;
