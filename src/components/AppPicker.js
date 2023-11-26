import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";
import AppButton from "./AppButton";
import Screen from "./Screen";
import AppPickerItem from "./AppPickerItem";

function AppPicker({ icon, placeholder, items, onSelectItem, selectedItem }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={30}
              style={styles.icon}
            ></MaterialCommunityIcons>
          )}
          <AppText style={styles.text}>
            {selectedItem ? selectedItem.title : placeholder}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen style={styles.modal}>
          <FlatList
            data={items}
            keyExtractor={(device) => device.id.toString()}
            renderItem={({ item }) => (
              <AppPickerItem
                label={item.title}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              ></AppPickerItem>
            )}
          ></FlatList>
          <AppButton
            title="Close"
            onPress={() => setModalVisible(false)}
          ></AppButton>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  text: {
    fontWeight: 500,
  },
  icon: {
    marginRight: 20,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
});

export default AppPicker;
