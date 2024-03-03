import React from "react";
import { Text, TextInput, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const Input = ({
  label,
  placeholder,
  ...restProps
}: {
  label: string;
  placeholder: string;
  [key: string]: any;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
        {...restProps}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: "14@s",
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
});

export default Input;
