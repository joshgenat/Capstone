import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, color = "primary" }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton title={title} onPress={handleSubmit} color={color}></AppButton>
  );
}

export default SubmitButton;
