import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const Card = ({
  title,
  imageSource,
  isTapped,
  onPress,
}: {
  title: string;
  imageSource: ImageSourcePropType;
  isTapped: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, isTapped && styles.tappedCard]}>
        <Text style={styles.title}>{title}</Text>
        <Image source={imageSource} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  tappedCard: {
    backgroundColor: "#ddd",
    borderColor: "#555",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100@s",
    height: "100@s",
    borderRadius: 8,
    marginTop: 10,
    resizeMode: "contain",
  },
});

export default Card;
