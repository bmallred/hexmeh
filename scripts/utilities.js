var hexCharacters = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
};

function padLeft(number, length) {
    var str = '' + number;

    while (str.length < length) {
        str = '0' + str;
    }

    return str;
}

function binaryToHex(binary) {
    var character = null;

    if (binary.length < 4) {
        binary = padLeft(binary, 4);
    }

    for (var c in hexCharacters) {
        if (hexCharacters[c] === binary) {
            character = c;
        }
    }

    return character;
}

function generateBinary(length) {
    var binary = '';

    while (binary.length < length) {
        var randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber % 2 === 0) {
            binary += "0";
        }
        else {
            binary += "1";
        }
    }

    return binary;
}

function mySlice(obj, start, stop) {
    if (obj.mozSlice) {
        return obj.mozSlice(start, stop);
    }
    else if (obj.webkitSlice) {
        return obj.webkitSlice(start, stop);
    }
    else {
        return obj.slice(start, stop);
    }
}