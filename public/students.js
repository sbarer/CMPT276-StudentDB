function editRowNum(selectObject) {
    alert("value inputted");
    var value = selectObject.value;
    var isnum = checknum(value);

    if (isnum == false) {
        alert("replacing value");
        selectObject.value = r.name;
    }
}

