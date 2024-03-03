import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import Card from "../components/Card";
import Heading from "../components/Heading";
import walletStore from "../store/WalletStore";
import { RootStackParamList } from "../types/navigator.types";

type Props = NativeStackScreenProps<RootStackParamList, "WalletSelection">;

const WalletSelection = ({ navigation }: Props) => {
  const [selectedNetwork, setSelectedNetwork] = useState(walletStore.network);

  const handleNetworkChange = (network: string) => {
    setSelectedNetwork(network);
    walletStore.setNetwork(network);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.row, styles.topRow]}>
          <Heading text="Select Network" />
          <View style={styles.cardContainer}>
            <Card
              isTapped={selectedNetwork === "bitcoin"}
              onPress={() => handleNetworkChange("bitcoin")}
              title="Bitcoin"
              imageSource={require("../assets/bitcoin.png")}
            />
            <Card
              isTapped={selectedNetwork === "polygon"}
              onPress={() => handleNetworkChange("polygon")}
              title="Polygon"
              imageSource={require("../assets/dollar.png")}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Button onPress={() => navigation.navigate("ImportWallet")}>
            <Text style={styles.buttonText}>Import Wallet</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topRow: {
    justifyContent: "flex-start",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WalletSelection;
