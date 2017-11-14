/* 
* @Author: Marte
* @Date:   2017-11-14 10:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-14 10:50:27
*/

jQuery(function($){
    $('header').load('../html/header.html',function(){
         $('.nav1').hover(function(){
                $(this).stop().animate({
                            height:680
                        }).removeClass('nano');
                   },function(){
                        $(this).stop().animate({
                            height:40
                        }).addClass('nano');
                   })
            })
   // $('footer').load('../html/footer.html',function(){});
})