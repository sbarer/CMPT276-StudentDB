<?php
// $mysqli = new mysqli('localhost', 'root', '', 'ajaxdata');


$conn = pg_connect("postgresql://localhost");
$result = pg_query($conn, "SELECT datname FROM Assignment2");
while ($row = pg_fetch_row($result)) {
    echo "<p>" . htmlspecialchars($row[0]) . "</p>\n";
}

$page = isset($_GET['p'])? $_GET['p'] : '';
if($page == 'del'){
    $myid = $_POST['id'];
    $id = str_replace(' ', ',', $myid);
    $result = $mysqli->query("delete from tabledata where id in($id)");
    if($result){
        echo "Success";
    } else {
        echo "Error";
    }
} else {
    $hasil = $mysqli->query("select * from tabledata");
    while($row = $hasil->fetch_assoc()){
        <tr>
            <td><input type="checkbox" class="checkitem" value="<?php echo $row['id'] ?>"/></td>
            <td><?php echo $row['name'] ?></td>
            <td><?php echo $row['weight'] ?></td> 
            <td><?php echo $row['height'] ?></td>
            <td><?php echo $row['hair color'] ?></td>
            <td><?php echo $row['gpa'] ?></td>
            <td><?php echo $row['major'] ?></td>
            <td><?php echo $row['age'] ?></td>
        </tr>

    }
}
?>