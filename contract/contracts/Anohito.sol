// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Anohito is ERC1155, Ownable, Pausable, ERC1155Supply {
    uint256 public immutable drawPrice;
    uint256 public immutable deadline; // in sec
    uint256 private _nonce = 1;

    constructor(
        string memory uri_,
        uint256 drawPrice_,
        uint256 drawPeriod_
    ) ERC1155(uri_) {
        drawPrice = drawPrice_;
        deadline = block.timestamp + drawPeriod_;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function draw(address account_) public payable {
        require(msg.value == drawPrice, "Wrong value");
        require(block.timestamp < deadline, "Draw period ended");
        // random id
        uint256 pseudorandomness = uint256(
            keccak256(abi.encodePacked(blockhash(block.number - 1), _nonce))
        );
        _nonce++;
        uint256 factor_ = uint8(pseudorandomness) % 100; // 0~99
        uint256 tokenId_;
        if (factor_ < 10) {
            tokenId_ = 0; // 10%
        } else if (factor_ < 30) {
            tokenId_ = 1; // 20%
        } else if (factor_ < 60) {
            tokenId_ = 2; // 30%
        } else {
            tokenId_ = 3; // 40%
        }
        _mint(account_, tokenId_, 1, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
