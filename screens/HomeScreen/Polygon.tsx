import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Button from "../../components/Button";
import { RootStackParamList } from "../../types/navigator.types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { reaction } from "mobx";
import walletStore from "../../store/WalletStore";

const data = {
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  fullName: "Polygon",
  timeStamp: "$1245.00",
  recentText: "USTC",
  avatarUrl:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Polygon({ navigation }: Props) {
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
      const usdtResponse = await fetch(walletStore.getUsdtPriceEndpoint());
      const usdtData = await usdtResponse.json();
      setUsdtPrice(usdtData.price);
    } catch (error) {
      console.error("Error fetching prices:", error);
      alert("An error occurred while fetching prices.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.subtitle}>Current Polygon Price</Text>
        <Text style={styles.price}>$214.50</Text>
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
        data={new Array(15).fill(data).flat()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
            <View style={styles.content}>
              <Text style={styles.fullName}>{item.fullName}</Text>
              <Text style={styles.recentText}>{item.recentText}</Text>
            </View>
            <Text style={styles.timeStamp}>{item.timeStamp}</Text>
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
    // color: "#aaa",
  },
  flexBox: {
    flexDirection: "row",
  },
  btnStyle: {
    flex: 1,
    margin: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
});
