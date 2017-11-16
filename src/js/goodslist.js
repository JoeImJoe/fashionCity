/* 
* @Author: Marte
* @Date:   2017-11-14 10:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 10:57:08
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
                                     <div class="button">加入购物车</div> 
                                 </div>
                            </li>`
                        }).join('');
                        $('#goodslist')[0].appendChild(ul);
                    }
                })
        $('#goodslist').on('click','img',function(){
            location.href='../html/detail.html?'+this.src.slice(25);
        })
   
})
})