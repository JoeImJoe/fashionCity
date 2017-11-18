<?php
	include 'connect.php';
	
	$username = isset($_GET['name']) ? $_GET['name'] : '';
	// $email = isset($_GET['email']) ? $_GET['email'] : '';
	// $grade = isset($_GET['grade']) ? $_GET['grade'] : '';
	// $gender = isset($_GET['gender']) ? $_GET['gender'] : '';
	// $birthday = isset($_GET['birthday']) ? $_GET['birthday'] : '';
	$email = isset($_GET['email']) ? $_GET['email'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';

	//查看用户名是否已经存在
	$sql = 'select name from user where name="'.$username.'"';
	$result = $conn->query($sql);
	if($result->num_rows>0){
		echo "no";
	}else if($password){
		// 密码md5加密
		$password = md5($password);

		/*
			password_hash()     //对密码加密.
				* PASSWORD_DEFAULT：Bcrypt加密算法，字段超过60个字符长度，
				* PASSWORD_BCRYPT：字符串长度总为60。
			password_verify()    //验证已经加密的密码，检验其hash字串是否一致.
		 */
		// $password = password_hash($password,PASSWORD_DEFAULT);

		$sql = "insert into user (name,passwprd,email) values('".$username."','".$password."','".$email."')";


		// 获取查询结果
		$result = $conn->query($sql);

		if ($result) {
		    echo "ok";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}

	
	

	//释放查询内存(销毁)
	$result->free();

	//关闭连接
	$conn->close();
?>