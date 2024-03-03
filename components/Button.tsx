import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from "react-native";

const Button = ({
  onPress,
  colorScheme = "primary",
  variant = "solid",
  isLoading = false,
  isDisabled = false,
  isLoadingText = "Loading",
  children,
  style,
}: {
  onPress: () => void;
  colorScheme?: string;
  variant?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isLoadingText?: string;
  children: React.ReactNode;
  style?: any;
}) => {
  const buttonStyles = [
    styles.button,
    style,
    colorScheme === "primary" && styles.primary,
    variant === "solid" && styles.solid,
    isDisabled && styles.disabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={styles.loadingText}>{isLoadingText}</Text>
        </View>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    width: "100%",
  },
  primary: {
    backgroundColor: "#007bff",
  },
  solid: {
    backgroundColor: "#007bff",
  },
  disabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: 10,
    color: "#ffffff",
  },
});

export default Button;
