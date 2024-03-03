import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Button from "../components/Button";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Input from "../components/Input";
import walletStore from "../store/WalletStore";
import { RootStackParamList } from "../types/navigator.types";

type Props = NativeStackScreenProps<RootStackParamList, "ImportWallet">;

const ImportWalletPrivateKey = ({ navigation }: Props) => {
  const [privateKey, setPrivateKey] = useState("");
  const [network, setNetwork] = useState(walletStore.network);

  const handleNetworkChange = (network: string) => {
    setNetwork(network);
  };

  const handleImport = async () => {
    if (!privateKey) {
      alert("Please enter a private key.");
      return;
    }

    try {
      await walletStore.importWallet(privateKey, network);
      alert("Wallet imported successfully!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error importing wallet:", error);
      alert("An error occurred while importing the wallet.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.row, styles.topRow]}>
          <Heading text="Hi, Let's Import Wallet" />
          <Input
            label="Enter Private Key:"
            placeholder="Enter ..."
            secureTextEntry={true}
            value={privateKey}
            onChangeText={setPrivateKey}
          />
          <Text style={styles.cardTitle}>Network:</Text>
          <View style={styles.cardContainer}>
            <Card
              isTapped={network === "bitcoin"}
              onPress={() => handleNetworkChange("bitcoin")}
              title="Bitcoin"
              imageSource={require("../assets/bitcoin.png")}
            />
            <Card
              isTapped={network === "polygon"}
              onPress={() => handleNetworkChange("polygon")}
              title="Polygon"
              imageSource={require("../assets/dollar.png")}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Button onPress={handleImport}>
            <Text style={styles.buttonText}>Import</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: "4%",
    backgroundColor: "#fff",
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topRow: {
    justifyContent: "flex-start",
  },
  cardTitle: {
    width: "100%",
    fontSize: "14@s",
    fontWeight: "bold",
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

export default ImportWalletPrivateKey;
