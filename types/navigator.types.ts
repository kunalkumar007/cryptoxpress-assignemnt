import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export type RootStackParamList = {
  WalletSelection: undefined;
  ImportWallet: undefined;
  SendTransaction: undefined;
  TransactionHistory: undefined;
  Home: undefined;
};

export type WalletStackParamList = {
  History: undefined;
  Home: undefined;
};
