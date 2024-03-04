import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Button from "../../components/Button";
import walletStore from "../../store/WalletStore";
import { Market } from "../../types/market.types";
import { RootStackParamList } from "../../types/navigator.types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Bitcoin({ navigation }: Props) {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [marketPrice, setmarketPrice] = useState<Market[]>([]);

  // useEffect(() => {
  //   const unsubscribe = reaction(
  //     () => walletStore.network,
  //     () => {
  //       fetchPrices();
  //     }
  //   );
  //   return () => unsubscribe();
  // }, [walletStore.network]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const bitcoinResponse = await fetch(
        walletStore.getBitcoinPriceEndpoint()
      );
      const bitcoinData = await bitcoinResponse.json();
      setBitcoinPrice(bitcoinData.bitcoin.usd);

      const marketResponse = await fetch(walletStore.getMarketPrices());
      const marketData = await marketResponse.json();
      setmarketPrice(marketData);
    } catch (error) {
      console.error("Error fetching prices:", error);
      alert("An error occurred while fetching prices.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.subtitle}>Current Bitcoin Price</Text>
        <Text style={styles.price}>${bitcoinPrice ?? "0"}</Text>
        <Text style={styles.subtitle}>+3.14%</Text>
      </View>
      <View style={styles.flexBox}>
        <Button
          style={styles.btnStyle}
          onPress={() => navigation.navigate("SendTransaction")}
        >
          <Text style={styles.buttonText}>Send</Text>
        </Button>
        <Button
          style={styles.btnStyle}
          onPress={() => navigation.navigate("TransactionHistory")}
        >
          <Text style={styles.buttonText}>History</Text>
        </Button>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={marketPrice}
        ListEmptyComponent={<Text style={styles.heading}>Nothing Found</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.content}>
              <Text style={styles.fullName}>{item.name}</Text>
              <Text style={styles.recentText}>{item.symbol}</Text>
            </View>
            <Text style={styles.timeStamp}>{item.current_price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    margin: 10,
    padding: 20,
  },
  btnStyle: {
    flex: 1,
    margin: 1,
  },
  cardTitle: {
    width: "100%",
    fontSize: "14@s",
    fontWeight: "bold",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: "12@s",
  },
  price: {
    fontSize: "28@s",
    fontWeight: "bold",
    marginVertical: "10@s",
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recentText: {
    fontSize: 16,
    color: "#888",
  },
  timeStamp: {
    fontSize: 18,
    fontWeight: "bold",
  },
  flexBox: {
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "50%",
  },
});
