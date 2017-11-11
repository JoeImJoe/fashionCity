/* 
* @Author: Marte
* @Date:   2017-11-10 20:13:41
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-10 22:18:08
*/

jQuery(function($){
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