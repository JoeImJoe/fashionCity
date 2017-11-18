/* 
* @Author: Marte
* @Date:   2017-11-10 20:13:41
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-17 15:08:39
*/

jQuery(function($){

    console.log($('header').get(0));
   $('header').load('header.html header>div',function(){
              
             $('.nav1').hover(function(){
                    $(this).stop().animate({
                        height:680
                    }).removeClass('nano');
               },function(){
                    $(this).stop().animate({
                        height:40
                    }).addClass('nano');
               });
             $('#top3').on('click','.abs',function(){

                location.href = 'goodslist.html?span='+this.innerText;   
             })
             $('.nav2 li').eq(0).click(function(){
                location.href='../index.html';
             });
             
             $('.t3r').mouseenter(function(){

                     var arr=[];
                     if(Cookie.get('data','')){
                       arr=JSON.parse(Cookie.get('data'));
                     }
                     $('.t3r p span').innerHTML=arr.length;
                    var ul=$('<ul/>')[0];
                    ul.innerHTML=arr.map(function(item){
                        return`<li>
                            <img src='../${item.img}'>
                            <span>${item.itro.slice(0,15)}&times;${item.qty}</span>
                            <span>￥${item.price*item.qty}</span>
                            <span class="remove">删除</span>
                        </li>
                        `
                    }).join('');
                    $('#car p').remove();
                     $('#car ul').remove();
                    $('#car')[0].appendChild(ul);
                    $('.remove').click(function(){
                       var img = $(this).parent().children('img')[0].src.slice(25);
                       var arr=JSON.parse( Cookie.get('data'));
                       var coo=[];
                       
                        arr.map(function(item){
                            if(item.img !=img){
                                coo.push(item);
                            }
                        });
                        var date = new Date();
                        date.setDate(date.getDate()+ 7);
                       
                        Cookie.set('data',JSON.stringify(coo),date,'/');
                        if(coo ==''){
                            Cookie.remove('data','/');
                        }
                    })
             })
            
             $('.t3r').on('click','.ro',function(){
                location.href='../html/buyCar.html';
             })
             $('.tl a').click(function(){
                location.href='login.html';
             })
    })
     $('footer').load('footer.html',function(){});
  
  
    
})