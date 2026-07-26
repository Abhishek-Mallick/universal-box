import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Marketplace from "../contracts/Marketplace.json";

const MarketplacePage = ({ marketplaceAddress }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const marketplaceContract = new ethers.Contract(marketplaceAddress, Marketplace.abi, provider);
    
    // Fetch all NFTs listed on the marketplace (mock function)
    const listedNFTs = [];  // Replace with logic to fetch listings
    setNfts(listedNFTs);
  };

  return (
    <div>
      <h2>Marketplace</h2>
      <div>
        {nfts.length > 0 ? nfts.map((nft, idx) => (
          <div key={idx}>
            <h3>{nft.name}</h3>
            <p>Price: {nft.price}</p>
          </div>
        )) : <p>No NFTs listed</p>}
      </div>
    </div>
  );
};

export default MarketplacePage;
