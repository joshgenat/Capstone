import React from "react";
import { useFormikContext, useField } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";

const AppFormDateTimePicker = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <DateTimePicker
      mode="time"
      display="spinner"
      value={field.value || new Date()}
      onChange={(event, selectedDate) => {
        setFieldValue(name, selectedDate);
      }}
      {...otherProps}
    />
  );
};

export default AppFormDateTimePicker;
