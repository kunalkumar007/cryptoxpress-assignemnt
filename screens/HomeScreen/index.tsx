import { Feather } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Heading from "../../components/Heading";
import { WalletStackParamList } from "../../types/navigator.types";
import Bitcoin from "./Bitcoin";
import Polygon from "./Polygon";

const Tab = createMaterialTopTabNavigator<WalletStackParamList>();

function MyTabs({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Heading text="Wallet" />
        <Tab.Navigator>
          <Tab.Screen name="Bitcoin" component={Bitcoin} />
          <Tab.Screen name="Polygon" component={Polygon} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "4%",
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconBox: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default MyTabs;
