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