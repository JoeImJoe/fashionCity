/* 
* @Author: Marte
* @Date:   2017-11-17 14:31:47
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-18 16:11:30
*/

require(['config'],function(){
    require(['jquery','common','xheader'],function($){
        $('#yzm').html(Math.floor(Math.random()*10000)).css({color:"#58bc58"});
        
        $('#num4').blur(function(){
                var email=$(this).val();
                 
                if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
                    $('#c_2').html('请输入正确格式邮箱').css({color:'red'});
                }else{
                    $('#c_2').html('邮箱可用').css({color:'#58bc58'});
                }
            })
        $('#num5').blur(function(){
            var username=$(this).val();
             $.ajax({
                url:"../api/reg.php",
                type:"get",
                data:{
                    username:username
                },
                success:function(res){
                    if(res == 'no'){
                        $('.neor').html('此用户名已被注册!!!').css({color:'red'});
                    }else{
                        $('.neor').html('用户名可用').css({color:'#58BC58'})
                    }
                }
            });
        })
        $('#btn2').click(function(){
            var $email = $('#num4').val();
            var $name = $('#num5').val();
            var $password = $('#num6').val();
            


            $.ajax({
                url:"../api/reg.php",
                type:"get",
                data:{
                    name:$name,
                    password:$password,
                    email:$email
                },
                success:function(res){

                    if(res.slice(0,2)=='ok'){
                        alert('注册成功');
                        location.href='../index.html';
                    }
                }
            });
            
        });
        $('#btn1').click(function(){
            var username =$('#num1').val();
            var password =$('#num2').val();
            var yzm = $('#num3').val();
            $.ajax({
                url:"../api/login.php",
                type:"get",
                data:{
                    username:username,
                    password:password
                },
                success:function(res){
                    var a = $('#yzm').html();
                    if(yzm ==a){
                        if(res =="fail"){
                            alert('用户名或密码错误');
                        }else if(res == 'ok'){
                            alert('登录成功');
                            location.href='../index.html';
                        }
                    }else{
                        alert('验证码错误');
                    }
                    
                }
            });
        })
    })
})