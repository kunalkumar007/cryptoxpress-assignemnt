import React from "react";
import { Text, StyleSheet } from "react-native";

const Heading = ({ text }: { text: string }) => {
  return <Text style={styles.heading}>{text}</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Heading;
