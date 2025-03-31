import React from "react";
import CreateNFT from "./components/CreateNFT";
import Marketplace from "./components/Marketplace";

const nftAddress = "NFT_CONTRACT_ADDRESS";  // Replace with your NFT contract address
const marketplaceAddress = "MARKETPLACE_CONTRACT_ADDRESS";  // Replace with your marketplace contract address

function App() {
  return (
    <div className="App">
      <h1>NFT Marketplace</h1>
      <CreateNFT nftAddress={nftAddress} />
      <Marketplace marketplaceAddress={marketplaceAddress} />
    </div>
  );
}

export default App;
