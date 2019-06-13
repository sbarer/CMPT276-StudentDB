var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];
// [9.03, 49.93, 50.1, 52.34, 53.11, 55.32, 55.69, 56.98, 60.0, 61.68, 65.95, 70.44, 70.54, 71.11, 72.24, 78.62, 80.01, 81.43, 86.22, 88.33, 88.88, 90.0, 90.3, 92.34, 96.1]

/* sort grades for easy parsing */
grades.sort(function(a, b){return a - b});

/* initialize array for the 11 possible letter grade outcomes and max read from screen input*/
var bounds = [100.00, 95.00, 90.00, 85.00, 80.00, 75.00, 70.00, 65.00, 60.00, 55.00, 50.00, 0.00];

/* initialize array for the 11 histogram values to be outputted to screen, set max & end value to zero for ease of computation */
var histo = [0,1,3,3,2,1,4,1,2,3,3,2,0];

function calculate_value(selectObject, i, H_curr, H_next) {
    var value = selectObject.value;
    // Verify that inputted value is within legal bounds
    var isnum = checknum(value);
    var upper = high_cut(value, i);
    var lower = low_cut(value, i);

    if (upper == false || lower == false || isnum == false) {
        selectObject.value = bounds[i];
    } else {
        bounds[i] = value;
        alert("You inputted a valid value.\n\n\tGood job!");
        update_histo(value, i, H_curr, H_next);
    }
}

function checknum(val) {
    if (isNaN(val)) {
        alert("Input was not a number.\nPlease try inputting a number only.");
        return false;
    } else {
        return true;
    }
}

function high_cut(value, i) {
    if (i == 0) {
        if (value > 100) {
            alert("Values greater than 100 are not accepted.\nPlease try a value less than or equal to 100.");
            return false;
        }
        return true;
    } else if (value >= bounds[i-1]) {
        alert("Inputted value overlaps with another grade bound.\nPlease try a value lower than " + bounds[i-1] + ".");
        return false;
    } else { return true; }
}

function low_cut(value, i) {
    if (i == 0 && value < Math.max(...grades)) {
        alert("There is at least one existing grade greater than the inputted 'Max' value.\nPlease try a value higher than " + Math.max(...grades) + ".");
        return false;
    } else if (value < 0) {
        alert("Negative values not accepted.\nPlease try a positive value.");
        return false;
    } else if (i == 11) {
        if (value > Math.min(...grades)) {
            alert("There is at least one existing grade smaller than the inputted value.\nPlease try a value lower than " + Math.min(...grades) + ".");
        return false;
        }
        return true;
    } else if (value <= bounds[i+1]) {
        alert("Inputted value overlaps with another grade bound.\nPlease try a value higher than " + bounds[i+1] + ".");
        return false;
    } else { return true; }
}

function update_histo(value, i, curr, next) {
    var loops = 2;
    var count = 0;
    // Account for corner cases
    if (i == 0) {
        // max value changed, therefore histo unaffected
        return;
    } else if (i == 1 || i == 11) {
        // first letter grade of histo (A+) or last letter grade of histo (F)
        loops = 1;
    }

    var iter = 0
    for (var j = 0; j < grades.length; j++) {
        iter++;
        // grades array is sorted, so we can reduce operations with cutoff
        if (grades[j] > bounds[i-1]) {
            break;
        }
        if (grades[j] >= bounds[i] && grades[j] < bounds[i-1]) {
            count++;
        }
    }

    // update Histo with new values
    // alert("After Loop: \ni is " + i + "\ncount is: " + count + "\nhisto[i+1] is: " + histo[i+1] + "\nhisto[i] is: " + histo[i]);
    histo[i+1] = histo[i+1] - (count - histo[i]);
    histo[i] = count;

    // alert("After _"+ iter + "_ iterations: \nhisto[i+1] is: " + histo[i+1] + "\nhisto[i] is: " + histo[i]);

    // update html histogram table
    if (curr == 'null') {} else {
    document.getElementsByName(curr)[0].value = histo[i]; }
    if (next == 'null') {} else {
    document.getElementsByName(next)[0].value = histo[i+1]; }

}