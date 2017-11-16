/* 
* @Author: Marte
* @Date:   2017-11-11 15:19:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 10:49:25
*/
require(['config'],function(){
    require(['jquery','common','xcarousel','header'],function($){
       
            
         $('#banner').xCarousel({
                imgs:['img/g1.png','img/g2.png','img/g3.png','img/g4.png','img/g5.png'],
                width:1200,
                height:500,
                index:2,
                type:'fade'
            });
         var ul =$('<ul/>')[0];
         var ul1 =$('<ul/>')[0];
         $.ajax({
                url:'api/goodslist.php',
                type:'GET',
                success:function(res){
                    res=JSON.parse(res);
                    ul.innerHTML=res.map(function(item){
                        //console.log(item);
                        for(var i=0;i<4;i++){
                             $('.lt img')[i].src=res[i+1].imgUrl;
                             $('.lt p')[i].innerHTML=res[i+1].introduce;
                             $('.lb .yuanjia span')[i].innerHTML=res[i+1].yuanjia;
                             $('.lb .miaosha span')[i].innerHTML=res[i+1].price;
                        }
                        return `<li>
                                <div class='lt'>
                                        <img src="${item.imgUrl}" alt="" />
                                        <p>${item.introduce}</p>
                                </div>
                                <div class="lb">
                                     
                                     <div class="miaosha">
                                         ￥<span>${item.price}</span>
                                     </div> 
                                     <div class="yuanjia">
                                         原价 :<del>￥<span>${item.yuanjia}</span></del>
                                     </div>
                                     <div class="button">立即抢购</div>               
                                 </div>
                            </li>`
                    }).join('');
                    ul1.innerHTML=res.map(function(item){
                        
                        for(var i=0;i<4;i++){
                             $('.lt img')[i].src=res[i+1].imgUrl;
                             $('.lt p')[i].innerHTML=res[i+1].introduce;
                             $('.lb .yuanjia span')[i].innerHTML=res[i+1].yuanjia;
                             $('.lb .miaosha span')[i].innerHTML=res[i+1].price;
                        }
                        return `<li>
                                <div class='lt'>
                                        <img src="${item.imgUrl}" alt="" />
                                        <p class="pinpai">${item.pinpai}品牌旗舰店<br/><span>低至${Math.ceil(Math.random()*10)}折</span></p>
                                </div>
                                <div class="lb">
                                     <div class="button">点击进入>></div>               
                                 </div>
                            </li>`
                    }).join('');
                    $('.blist')[0].appendChild(ul);
                    $('.bblist')[0].appendChild(ul1);
                }
             });
         $.ajax({
                    url:'api/goodskind.php',
                    type:'GET',
                    data:{fenlei:100},
                    success:function(res){ 
                        res=JSON.parse(res);
                      var timer= setInterval(function(){
                            var mydate = new Date();
                            var h=27-mydate.getHours();
                            var m=59-mydate.getUTCMinutes();
                            var s=59-mydate.getSeconds();
                            
                       $('#xianlist')[0].innerHTML=res.map(function(item){

                            return`<li> 
                            <div id="xiand"><i class="icon-tv iconfont"></i>剩余<span>${h}</span>小时<span>${m}</span>分<span>${s}</span>秒</div>
                                        <img src="${item.imgUrl}" alt="" />
                                        <p>${item.introduce}</p>
                                        <div class="xb">
                                            <span class="pr">￥${item.price}.00</span>
                                            <div class="btn">去抢购</div>
                                        </div> 
                                   </li>`
                        }).join('');
                       }, 1000)
                        
                        
                    }  
                })
        $('.tab li').hover(function(){
            var idx=$(this).index()+1;
            $('.tab .content img')[0].src='img/tab'+idx+'.png';
        })
        $.ajax({
                    url:'api/fq.php',
                    type:'GET',
                    data:{fenlei:240},
                    success:function(res){
                        res=JSON.parse(res);
                       
                       $('.fq ul')[0].innerHTML=res.map(function(item,idx){
                        idx=idx+1;
                        return`
                        <div class="fqd"><span>${idx}</span><p>${item.introduce.slice(0,15)}</p></div>
                        <li><img src='${item.imgUrl}'/><div><p class="itr">${item.introduce.slice(0,15)}</p></div><div><span>￥${item.price}</span></div></li>
                        
                        `
                       }).join('');
                     }
                })
        $('.fq').on('mouseenter','.fqd',function(){
                        $(this).css({display:'none'}).next().css({display:'block'});
                    }).on('mouseleave','li',function(){
                        $(this).css({display:'none'}).prev().css({display:'block'});
                    });

      
})
})