// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Anohito is ERC1155, Ownable, ERC1155Supply {
    uint256 public immutable rollPrice;
    uint256 public immutable deadline; // in sec
    uint256 internal _nonce = 1;

    event Rolled(address indexed roller, uint256 indexed tokenId);

    constructor(
        string memory uri_,
        uint256 rollPrice_,
        uint256 rollPeriod_
    ) ERC1155(uri_) {
        rollPrice = rollPrice_;
        deadline = block.timestamp + rollPeriod_;
    }

    function setURI(string memory newuri) external onlyOwner {
        _setURI(newuri);
    }

    function roll() external payable {
        require(msg.value == rollPrice, "Wrong value");
        require(block.timestamp < deadline, "Roll period ended");
        uint256 pseudorandomness = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), _nonce))
        );
        _nonce++;
        uint256 tokenId_ = uint8(pseudorandomness) % 15; // 0~14
        _mint(msg.sender, tokenId_, 1, "");
        emit Rolled(msg.sender, tokenId_);
    }

    function totalSupplyAll() external view returns (uint256[15] memory) {
        uint256[15] memory supplies;
        for (uint256 i = 0; i < 15; i++) {
            supplies[i] = totalSupply(i);
        }
        return supplies;
    }

    function balanceOfAll(address account_) external view returns (uint256[15] memory) {
        uint256[15] memory balances;
        for (uint256 i = 0; i < 15; i++) {
            balances[i] = balanceOf(account_, i);
        }
        return balances;
    }

    function withdraw(uint256 amount_) public onlyOwner {
        (bool sent, ) = msg.sender.call{value: amount_}("");
        require(sent, "Failed to send value");
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
