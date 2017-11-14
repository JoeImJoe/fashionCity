<?php
    
    include 'connect.php';
    // 编写查询sql语句
    $fenlei = isset($_GET['fenlei']) ? $_GET['fenlei'] : '';

    $sql = "SELECT * FROM goods WHERE price>'".$fenlei."'";
    // "SELECT * FROM user where user_name='".$name."'";

    // 利用sql语句查询数据库
    // 查询结果集
    $result = $conn->query($sql);

        // 使用查询结果集
    // $row = $result->fetch_assoc();//单个数据
    $row = $result->fetch_all(MYSQLI_ASSOC);//多条数据

    
    //释放查询结果集
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);


    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();

?>