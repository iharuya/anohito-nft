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

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external onlyOwner {
        _mint(account, id, amount, data);
    }

    function roll() external payable {
        require(msg.value == rollPrice, "Wrong value");
        require(block.timestamp < deadline, "Roll period ended");
        uint256 pseudorandomness = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), _nonce))
        );
        _nonce++;
        uint256 tokenId_ = uint8(pseudorandomness) % 10; // 0~9
        _mint(msg.sender, tokenId_, 1, "");
        emit Rolled(msg.sender, tokenId_);
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
