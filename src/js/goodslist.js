/* 
* @Author: Marte
* @Date:   2017-11-14 10:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-17 11:42:14
*/
require(['config'],function(){
    require(['jquery','common','xheader'],function($){
   
         $('.nav2 li').eq(0).click(function(){
                location.href = '../index.html';
                
            })
         $.ajax({
                    url:'../api/goodslist.php',
                    type:'GET',
                    success:function(res){
                        res=JSON.parse(res);
                        var ul=$('<ul/>')[0];
                        ul.innerHTML=res.map(function(item){
                            return`<li>
                                <div class='lt'>
                                        <img src="../${item.imgUrl}" alt="" />
                                        <p>${item.introduce}</p>
                                </div>
                                <div class="lb">
                                     <div class="miaosha">
                                         ￥<span>${item.price}</span>
                                     </div> 
                                     <div class="button" data-id="${item.id}">加入购物车</div> 
                                 </div>
                            </li>`
                        }).join('');
                        $('#goodslist')[0].appendChild(ul);
                    }
                })
        $('#goodslist').on('click','img',function(){
            location.href='../html/detail.html?'+this.src.slice(25);
        }).on('click','.button',function(){
            //location.href='../html/buyCar.html';
                     if(!Cookie.get('data')){
                        var coo=[];
                    }else{
                        var coo=JSON.parse(Cookie.get('data'));
                    }
                     var ab=this;
                     var idx=$(this).attr('data-id');
                     if(Cookie.get('data')){
                        var cookies=JSON.parse(Cookie.get('data'));
                       var cook=[];
                       
                       
                        cookies.map(function(item,i){

                            if(item.id == idx){
                                coo.splice(i,1);

                                item.qty++;
                               
                               cook.push({itro:$(ab).parent().parent().find('p').html(),price:item.price,id:idx,qty:item.qty,img:item.img});
                               
                            }else{
                                 cook.push({itro:$(ab).parent().parent().find('p').html(),price:$(ab).prev('.miaosha').find('span').html(),id:idx,qty:1,img:$(ab).parent().prev().find('img')[0].src.slice(25)});
                                 
                             }

                              
                        }) 
                        if(cook.length>1){
                            var a=cook[cook.length-1];
                            cook=[];
                            cook.push(a);   
                        }
                        coo=coo.concat(cook);
                     }else{
                         coo.push({itro:$(ab).parent().parent().find('p').html(),price:$(ab).prev('.miaosha').find('span').html(),id:idx,qty:1,img:$(ab).parent().parent().find('img')[0].src.slice(25)}); 
                          
                     }
                    
                    var date = new Date();
                    date.setDate(date.getDate()+ 7);
                    
                    Cookie.set('data',JSON.stringify(coo),date,'/');
        })
})
})