import { Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { reaction } from "mobx";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import walletStore from "../store/WalletStore";
import { RootStackParamList } from "../types/navigator.types";

const data = {
  id: "bd7acbea",
  fullName: "Bitcoin",
  amount: "$1245.00",
  status: "BTC",
  timestamp: "12 PM",
  avatarUrl:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
};
type Props = NativeStackScreenProps<RootStackParamList, "SendTransaction">;

const TransactionHistory = ({ navigation }: Props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const unsubscribe = reaction(
      () => walletStore.transactionHistory,
      () => fetchTransactions()
    );
    return () => unsubscribe();
  }, [walletStore.transactionHistory]);

  const fetchTransactions = () => {
    setTransactions(walletStore.transactionHistory);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.id}</Text>
      <Text style={styles.itemText}>{item.amount}</Text>
      <Text style={styles.itemText}>{item.status}</Text>
      <Text style={styles.itemText}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerBox}>
          <Entypo name="chevron-left" size={30} color="black" />
          <Text style={styles.heading}>Transaction History</Text>
          <View />
        </Pressable>
        <View style={styles.item}>
          <Text style={styles.itemText}>Transaction ID</Text>
          <Text style={styles.itemText}>Amount</Text>
          <Text style={styles.itemText}>Status</Text>
          <Text style={styles.itemText}>Time</Text>
        </View>
        {/* {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>No transactions found.</Text>
        )} */}
        <FlatList
          data={new Array(10).fill(data)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          bounces={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    flex: 1,
    textAlign: "center",
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
});

export default TransactionHistory;
