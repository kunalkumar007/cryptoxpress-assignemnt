import { observable, action } from "mobx";
import bitcoinjs from "bitcoinjs-lib";

class WalletStore {
  @observable network = "bitcoin";

  @observable bitcoinWallet = null;
  @observable polygonWallet = null;
  @observable privateKey = null;

  @observable transactionHistory: {
    id: number;
    status: string;
    amount: any;
    receiver: any;
    transactionLink: any;
    fee: any;
  }[] = [];

  @action
  setNetwork(network: any) {
    this.network = network;
  }

  @action
  async importWallet(privateKey: any, network: any) {
    /**
     * Hard to do on the React native side, because we need to use the bitcoinjs library. It is not compatible with react native and we havent find anything that works well with it. On Backend side, we can use the bitcoinjs library to import the wallet. It can then be included here.
     */
    this.privateKey = privateKey;
    console.log(
      `Importing wallet for ${network} using private key: ${privateKey}`
    );
  }

  @action
  async sendTransaction(receiverAddress: any, amount: any) {
    try {
      if (!this.bitcoinWallet && !this.polygonWallet) {
        console.log("Wallet not imported. Please import a wallet first.");
      }
    } catch (error: any) {
      console.error("Error sending transaction:", error.message);
    }
    const transactionPayload = {
      inputs: [
        {
          addresses: [this.privateKey],
        },
      ],
      outputs: [
        {
          addresses: [receiverAddress],
          value: amount,
        },
      ],
    };
    // const apiEndpoint =
    //   this.network === "bitcoin"
    //     ? "https://api.blockcypher.com/v1/btc/test3/txs/send"
    //     : "https://api.blockcypher.com/v1/eth/main/txs/push";
    const apiEndpoint = "https://api.blockcypher.com/v1/bcy/test/txs/new";

    // Make the API request to send the transaction using fetch
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionPayload),
    });
    const responseData = await response.json();
    return responseData;
  }

  getBitcoinPriceEndpoint() {
    return "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
  }

  getUsdtPriceEndpoint() {
    return "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd";
  }
  getMarketPrices() {
    return "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
  }
}

const walletStore = new WalletStore();
export default walletStore;
