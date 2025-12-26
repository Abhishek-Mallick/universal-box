import Web3 from "web3";

let web3;

export const getWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return web3;
    } catch (error) {
      throw new Error("User denied account access");
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    return web3;
  } else {
    throw new Error("No Ethereum provider detected. Please install MetaMask.");
  }
};

export const getAccounts = async () => {
  if (!web3) {
    web3 = await getWeb3();
  }
  return await web3.eth.getAccounts();
};

export const getCurrentAccount = async () => {
  const accounts = await getAccounts();
  return accounts[0];
};

export const getNetworkId = async () => {
  if (!web3) {
    web3 = await getWeb3();
  }
  return await web3.eth.net.getId();
};

export const getBalance = async (address) => {
  if (!web3) {
    web3 = await getWeb3();
  }
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, "ether");
};

export const isMetaMaskInstalled = () => {
  return typeof window.ethereum !== "undefined";
};

export const switchNetwork = async (chainId) => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      throw new Error("Network not added to MetaMask");
    }
    throw switchError;
  }
};

export const getContract = (abi, contractAddress) => {
  if (!web3) {
    throw new Error("Web3 not initialized");
  }
  return new web3.eth.Contract(abi, contractAddress);
};

