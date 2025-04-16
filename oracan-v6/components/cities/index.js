import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const Cities = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [allItems, setallItems] = useState([
    { value: "Mumbai", label: "Mumbai" },
    { value: "Delhi", label: "Delhi" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Chennai", label: "Chennai" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Pune", label: "Pune" },
    { value: "Surat", label: "Surat" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Lucknow", label: "Lucknow" },
    { value: "Kanpur", label: "Kanpur" },
    { value: "Nagpur", label: "Nagpur" },
    { value: "Indore", label: "Indore" },
    { value: "Thane", label: "Thane" },
    { value: "Bhopal", label: "Bhopal" },
    { value: "Visakhapatnam", label: "Visakhapatnam" },
    { value: "Patna", label: "Patna" },
    { value: "Vadodara", label: "Vadodara" },
    { value: "Ghaziabad", label: "Ghaziabad" },
    { value: "Ludhiana", label: "Ludhiana" },
    { value: "Agra", label: "Agra" },
    { value: "Nashik", label: "Nashik" },
    { value: "Faridabad", label: "Faridabad" },
    { value: "Meerut", label: "Meerut" },
    { value: "Rajkot", label: "Rajkot" },
  ]);

  const handleInputChange = (text) => {
    if (text) {
      setInputValue(text);
      const filtered = allItems.filter((item) =>
        item.value.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setInputValue("");
      setFilteredItems(allItems);
      props.selectOption(text);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setInputValue(item.name);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "70%",
        justifyContent: "center",
        alignSelf: "center",
        margin: "auto",
        // top: "15%",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <TextInput
        placeholder="Enter Your City"
        placeholderTextColor={"#000"}
        value={inputValue}
        focusable={true}
        onChangeText={handleInputChange}
        style={{ borderBottomWidth: 1, padding: 10 }}
      />
      <FlatList
        data={filteredItems.length > 0 ? filteredItems : allItems}
        keyExtractor={(item) => {
          item.value;
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleItemSelect(item);
              props.selectOption(item.value);
            }}
            key={item.value}
          >
            <>
              <View style={{ padding: 10, borderBottomWidth: 1 }}>
                <Text style={{ textAlign: "center" }}>{item.label}</Text>
              </View>
            </>
          </TouchableOpacity>
        )}
      />
      {/* {selectedItem && (
        <View>
          <Text>{selectedItem.labels}</Text>
        </View>
      )} */}
    </View>
  );
};

export default Cities;
