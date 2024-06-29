import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/constants";

export const TransactionContext = createContext();

// to check the user's browser has an Ethereum provider (like MetaMask) installed and available
const { ethereum } = window;

// fetching ethereum contract
const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const transactionContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
  console.log({
    provider: provider,
    signer: signer,
    transactionContract: transactionContract,
  });

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // getAllTransactions();
      } else {
        console.log("No accounts found");
      }
      console.log("accounts: ", accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      }); //gonna get all the accounts, and the user choose one to connect
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const { addressTo, amount, keyword, message } = formData;

      const decAmount = ethers.parseEther(amount);
      const parsedAmount = ethers.toBeHex(decAmount);
      console.log(parsedAmount)

      const transactionsContract =  await getEthereumContract();
      if (!transactionsContract) return;
      console.log( transactionsContract)

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 21000 GWEI
            value: parsedAmount,
          },
        ],
      })
    console.log("ethereum request sent")

    const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
    console.log(transactionHash)
    setIsLoading(true)
    console.log(`Loading - ${transactionHash.hash}`)

    await transactionHash.wait();
    setIsLoading(false)
    console.log(`Success - ${transactionHash.hash}`)

    const transactionCount = await transactionsContract.getTransactionCount();
    setTransactionCount(transactionCount);

    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setformData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
