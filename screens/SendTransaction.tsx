import { Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Button from "../components/Button";
import Input from "../components/Input";
import walletStore from "../store/WalletStore";
import { RootStackParamList } from "../types/navigator.types";
import { validate } from "bitcoin-address-validation";

type Props = NativeStackScreenProps<RootStackParamList, "SendTransaction">;

const SendTransaction = ({ navigation }: Props) => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!receiverAddress) {
      alert("Please enter a receiver address.");
      return;
    }

    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    if (validate(receiverAddress) === false) {
      alert("Invalid receiver address.");
      return;
    }

    try {
      const responseData: any = await walletStore.sendTransaction(
        receiverAddress,
        amount
      );

      const transaction = {
        id: Math.random(),
        status: "Pending",
        amount,
        receiver: receiverAddress,
        transactionLink: responseData.tx.hash,
        fee: responseData.fees || 0,
      };
      walletStore.transactionHistory.unshift(transaction);
      alert("Transaction sent successfully!");
      setReceiverAddress("");
      setAmount("");
      navigation.goBack();
    } catch (error: any) {
      console.error("Error sending transaction:");
      alert("An error occurred while sending the transaction.");
    }
  };

  const validateAddress = (address: string, network: string): boolean => {
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.row, styles.topRow]}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.headerBox}
          >
            <Entypo name="chevron-left" size={30} color="black" />
            <Text style={styles.heading}>Send Transaction</Text>
            <View />
          </Pressable>
          <Input
            label="Receiver Address:"
            placeholder="Enter"
            value={receiverAddress}
            onChangeText={setReceiverAddress}
          />
          <Input
            label="Amount:"
            placeholder="Enter"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.row}>
          <Button onPress={handleSend}>
            <Text style={styles.buttonText}>Send</Text>
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
  headerBox: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    width: "100%",
  },
  heading: {
    fontSize: "24@s",
    fontWeight: "bold",
    marginBottom: "16@s",
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topRow: {
    justifyContent: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SendTransaction;
