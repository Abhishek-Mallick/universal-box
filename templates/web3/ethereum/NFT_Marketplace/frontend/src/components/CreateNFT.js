import { useState } from "react";
import { ethers } from "ethers";
import NFT from "../contracts/NFT.json";

const CreateNFT = ({ nftAddress }) => {
  const [tokenURI, setTokenURI] = useState("");

  const mintNFT = async () => {
    if (!tokenURI) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer);

    const tx = await nftContract.mintNFT(signer.getAddress(), tokenURI);
    await tx.wait();
    alert("NFT Minted!");
  };

  return (
    <div>
      <h2>Create NFT</h2>
      <input
        type="text"
        placeholder="Token URI"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
      />
      <button onClick={mintNFT}>Mint NFT</button>
    </div>
  );
};

export default CreateNFT;
