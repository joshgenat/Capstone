// CustomActionPicker.js
import React from "react";
import { useFormikContext } from "formik";
import AppFormPicker from "../components/forms/AppFormPicker";

const CustomActionPicker = ({ name, icon }) => {
  const { values } = useFormikContext();

  const getActionsForDeviceType = (deviceType) => {
    switch (deviceType) {
      case "Lights":
        return [
          { id: 1, title: "Turn On" },
          { id: 2, title: "Turn Off" },
        ];
      case "Thermometer":
        return [{ id: 3, title: "Turn Off" }];
      default:
        return [];
    }
  };

  const actions = values.selectedDevice
    ? getActionsForDeviceType(values.selectedDevice.deviceType)
    : [];

  return (
    <AppFormPicker
      name={name}
      items={actions}
      icon={icon}
      placeholder="Select an action"
    />
  );
};

export default CustomActionPicker;
