// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Imports
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Registry.
 * @notice This contract is used to store the data for the platform.
 */
contract Registry is
    AccessControl
{
    using Counters for Counters.Counter;

    // TYPES
    /**
     * Image publishers data.
     * @param signer The address of the creator.
     * @param reputation The reputation of the creator.
     */
    struct Creator {
        address signer;
        uint256 reputation;
    }

    /**
     * Image data for modified Originals.
     * @param id The id of the image.
     * @param ipfs The IPFS url of the image.
     * @param signature The signature of the image.
     * @param proof The proof of the image.
     * @param isVerified The verification status of the image.
     * @param timestamp The timestamp of the image update.
     */
    struct Image {
        uint256 id;
        string ipfs;
        bytes signature;
        bytes proof;
        bool isVerified;
        uint256 timestamp;
    }

    /**
     * Originals image data.
     * @param id The id of the image.
     * @param creator The creator of the image.
     */
    struct Originals {
        uint256 id;
        Creator creator;
    }

    // STORAGE
    Counters.Counter public imageId;                // Image id counter.

    // Allows for the addition of new images in the registry.
    bytes32 public constant UPLOADER_ROLE = keccak256("UPLOADER_ROLE");

    mapping(uint256 => Image) public images;        // Image data for modified Originals.
    mapping(uint256 => Originals) public originals; // Originals image data.
    mapping(address => Creator) public creators;    // Image publishers data.

    // EVENTS
    /**
     * @notice Emitted when a new Original is added.
     * @param id_ The id of the image.
     * @param creator_ The creator of the image.
     */
    event AddOriginal (
        uint256 indexed id_,
        address indexed creator_
    );

    // ERORS

    // CONSTRUCTOR
    constructor ()
    {
        // Set contract deployer as admin.
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // Set roles
        _setupRole(UPLOADER_ROLE, msg.sender);
    }

    // VIEWS
    /**
     * @notice Get the reputation of a given creator.
     * @dev If reputation is 0 then the creator does not exist.
     * @param _creator The address of the creator.
     */
    function getCreatorReputation (
        address _creator
    ) public view returns (
        uint256 reputation_
    ) {
        return creators[_creator].reputation;
    }
    
    // CORE
    /**
     * @notice Add a new Original.
     * @param _creator The address of the creator.
     */
    function addOriginal (
        address _creator
    ) public onlyRole(UPLOADER_ROLE) returns (
        uint256 id_
    ) {
        // Increment image id.
        imageId.increment();

        // Get image id.
        id_ = imageId.current();

        // Add Original.
        originals[id_] = Originals(
            id_,
            Creator(
                _creator,
                0
            )
        );

        // Emit event.
        emit AddOriginal(
            id_,
            _creator
        );
    }
}
