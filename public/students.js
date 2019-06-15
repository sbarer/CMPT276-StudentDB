function checknum(val) {
    if (isNaN(val)) {
        alert("Input was not a number.\nPlease try inputting a number only.");
        return false;
    } else {
        return true;
    }
}