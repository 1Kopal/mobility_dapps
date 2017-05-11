pragma solidity ^0.4.8;

contract CarTypes {
    enum Color { WHITE, BLACK, BLUE, RED}
    enum Transmission {MANUAL, AUTOMATIC}
    enum CarStatus {AVAILABLE, UNAVAILABLE}

    struct Car {
        bytes17 vin;
        address owner;
        uint16 year;
        bytes32 make;
        bytes32 model;
        Color color;
        Transmission transmission;
        uint8 seats;
        CarStatus status;
        bool exists;
        uint currentRsvt;

    }

    uint constant CAR_ACCESS_UNLOCK = 1;
    uint constant CAR_ACCESS_LOCK = 2;
    uint constant CAR_ACCESS_REMOTE_START = 4;
    uint constant CAR_ACCESS_ALL = CAR_ACCESS_UNLOCK | CAR_ACCESS_LOCK | CAR_ACCESS_REMOTE_START;
}