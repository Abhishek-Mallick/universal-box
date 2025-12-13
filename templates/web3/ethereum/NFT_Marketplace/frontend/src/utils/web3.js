import { ethers } from "ethers";
import NFTContractABI from "../artifacts/NFT.json";
import MarketplaceABI from "../artifacts/Marketplace.json";

export const getNFTContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "NFT_CONTRACT_ADDRESS", // Replace with your NFT contract address
    NFTContractABI.abi,
    signer
  );
  return contract;
};

export const getMarketplaceContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    "MARKETPLACE_CONTRACT_ADDRESS", // Replace with your Marketplace contract address
    MarketplaceABI.abi,
    signer
  );
  return contract;
};
