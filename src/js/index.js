/* 
* @Author: Marte
* @Date:   2017-11-11 15:19:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-11 18:54:16
*/

jQuery(function($){
    $('header').load('html/header.html',function(){
         $('.nav1').hover(function(){
                $(this).stop().animate({
                    height:680
                }).removeClass('nano');
           },function(){
                $(this).stop().animate({
                    height:40
                }).addClass('nano');
           })
         $('#banner').xCarousel({
                imgs:['img/g1.png','img/g2.png','img/g3.png','img/g4.png','img/g5.png'],
                width:1200,
                height:500,
                index:2,
                type:'fade'
            });
         $.ajax({
            url:'api/goodslist.php',
            type:'GET',
            success:function(res){
                console.log(res);
            }
         });
       $('footer').load('html/footer.html',function(){});
    })
})