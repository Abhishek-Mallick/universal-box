// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace {
    struct Listing {
        uint256 price;
        address seller;
        bool sold;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;  // Contract address => tokenId => Listing

    function listItem(address nftContract, uint256 tokenId, uint256 price) public {
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        listings[nftContract][tokenId] = Listing(price, msg.sender, false);
    }

    function buyItem(address nftContract, uint256 tokenId) public payable {
        Listing memory item = listings[nftContract][tokenId];
        require(!item.sold, "Item already sold");
        require(msg.value >= item.price, "Not enough ETH");

        item.seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        listings[nftContract][tokenId].sold = true;
    }
}
