// function viewdata() {
//     $.ajax({
//         url: 'data.php',
//         type: 'GET',
//         success: function(data){
//             $('tbody').html(data)
//         }
//     })
// }

// $('#checkall').change(function(){
//     $('.checkitem').prop("checked", $(this).prop("checked"))
// })

// $('#delsel').click(function(){
//     var id = $('.checkitem:checled').map(function(){
//         return $(this).val()
//     }).get().join('')
//     $.post('data.php?p=del', {id: id}, function(data){
//         viewdata()
//     })
// })


function deleteRow(selectObject) {

}

function newRow(selectObject) {

}

function editRowNum(selectObject) {
    var value = selectObject.value;
    var isnum = checknum(value);
}

function checknum(val) {
    if (isNaN(val)) {
        alert("Input was not a number.\nPlease try inputting a number only.");
        return false;
    } else {
        return true;
    }
}