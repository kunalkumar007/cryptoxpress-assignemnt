import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import WalletSelection from "./screens/WalletSelection";
import ImportWalletPrivateKey from "./screens/ImportWalletPrivateKey";
import SendTransaction from "./screens/SendTransaction";
import TransactionHistory from "./screens/TransactionHistory";
import { RootStackParamList, navigationRef } from "./types/navigator.types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName="SendTransaction"
      >
        <Stack.Screen
          name="WalletSelection"
          component={WalletSelection}
          options={{ title: "Select Network" }}
        />
        <Stack.Screen
          name="ImportWallet"
          component={ImportWalletPrivateKey}
          options={{ title: "Import Wallet" }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="SendTransaction"
          component={SendTransaction}
          options={{ title: "Send Transaction" }}
        />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
          options={{ title: "Transaction History" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
