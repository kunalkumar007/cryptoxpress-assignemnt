import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { reaction } from "mobx";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import walletStore from "../../store/WalletStore";
import { RootStackParamList } from "../../types/navigator.types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [usdtPrice, setUsdtPrice] = useState(null);

  useEffect(() => {
    const unsubscribe = reaction(
      () => walletStore.network,
      () => {
        fetchPrices();
      }
    );
    return () => unsubscribe();
  }, [walletStore.network]);

  const fetchPrices = async () => {
    try {
      const bitcoinResponse = await fetch(
        walletStore.getBitcoinPriceEndpoint()
      );
      const bitcoinData = await bitcoinResponse.json();
      setBitcoinPrice(bitcoinData.price);

      const usdtResponse = await fetch(walletStore.getUsdtPriceEndpoint());
      const usdtData = await usdtResponse.json();
      setUsdtPrice(usdtData.price);
    } catch (error) {
      console.error("Error fetching prices:", error);
      alert("An error occurred while fetching prices.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Network: {walletStore.network}</Text>
        {walletStore.network === "bitcoin" && (
          <Text>Bitcoin Price: ${bitcoinPrice}</Text>
        )}
        {walletStore.network === "polygon" && (
          <Text>USDT Price: ${usdtPrice}</Text>
        )}
        <Button
          title="Send Transaction"
          onPress={() => navigation.navigate("SendTransaction")}
        />
        <Button
          title="Transaction History"
          onPress={() => navigation.navigate("TransactionHistory")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
};

export default HomeScreen;
