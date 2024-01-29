import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({ name, items, placeholder, icon }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  return (
    <>
      <AppPicker
        icon={icon}
        items={items}
        placeholder={placeholder}
        selectedItem={values[name]}
        onSelectItem={(item) => setFieldValue(name, item)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
