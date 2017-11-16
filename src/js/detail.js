/* 
* @Author: Marte
* @Date:   2017-11-14 10:42:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 20:36:36
*/
require(['config'],function(){
    require(['jquery','common','xheader','xzoom'],function($){

                
                    $('.nav2').eq(0).click(function(){
                            location.href = '../index.html';
                            
                        })
                     var parmas = location.search.slice(1);
                     var coo=[];
                     $.ajax({
                                url:'../api/goods.php',
                                type:'GET',
                                data:{
                                    id:parmas
                                },
                                success:function(res){
                                        var re=[];
                                        res=JSON.parse(res);
                                        re.push(res);
                                        
                                        var itro;
                                        var price;
                                        var idx;
                                        var img;
                                        var ul=$('<div/>')[0];
                                        ul.innerHTML=re.map(function(item){
                                           itro=item.introduce;
                                           price=item.price;
                                           idx=item.id;
                                            img=item.imgUrl;
                                            return`<div class="top">
                                            <p><span>首页</span> &nbsp;&gt;<span>香氛</span>&nbsp;&gt;<span>${item.introduce.slice(0,-16)}</span></p>
                                            </div>
                                            <div class="del">
                                                <ul>
                                                    <li><img src="../${item.imgUrl}" alt="" /></li>
                                                    <li><img src="../img/prod_34109_M_171025133649_90589881.jpg" alt="" /></li>
                                                    <li><img src="../img/prod_34133_M_171026143530_97055335.jpg" alt="" /></li>
                                                    <li><img src="../img/prod_34093_M_171013101953_80305305.jpg" alt="" /></li>
                                                </ul>
                                                <div class="deimg">
                                                    <img src="../${item.imgUrl}" alt="" />
                                                </div>
                                            </div>
                                            <div class="der">
                                                <ul>
                                                   <li >
                                                        <h3>${item.introduce.slice(0,-16)}</h3>
                                                   </li>
                                                   <li>
                                                       英文名称：Versace Bright Crystal<br/>
                                                       商品编号：3035${item.id}<br/>
                                                       No5价：<span>￥${item.price}.00</span>
                                                       市场价： ￥${item.yuanjia}.00
                                                       折扣： ${Math.floor(item.price*100/item.yuanjia)/10}折
                                                   </li>
                                                   <li>
                                                       所属品牌：${item.introduce.slice(0,6)}<br />
                                                       所属分类：香氛 → 香氛套装 → 女士套装<br />
                                                      <img src="../img/deta1.png" alt="" />
                                                   </li>
                                                   <li>
                                                      <div>我要买:
                                                          <span class="pre">-</span>
                                                          <input type="text" value='1' id="qty"/>
                                                          <span class="add">+</span>
                                                      </div> 
                                                      <div class='addto'>加入购物车</div>
                                                   </li>
                                                </ul>
                                            </div>`
                                        }).join('');
                                      $('#detail')[0].appendChild(ul);
                                       $('.del').on('mouseover','img',function(){
                                            $('.deimg img')[0].src=$(this)[0].src;
                                             xZoom({width:460,
                                                        height:460,
                                                        position:'right',
                                                        gap:100,
                                                        ele:'.deimg'
                                                    });
                                        })
                                       var ipu=$('#detail input')[0].value;
                                       $('.pre').click(function(){
                                            ipu--;
                                           ipu=ipu<1?1:ipu;
                                            $('#detail input')[0].value=ipu;
                                           
                                       });
                                        $('.add').click(function(){
                                            ipu++;$('#detail input')[0].value=ipu;
                                       });

                                      $('.addto').click(function(){
                                            var $img = $('.deimg img');
                                           
                                            

                                            // 1>复制当前商品图片(用于实现动画效果)
                                            var $cloneImg = $img.clone();

                                                // 给复制图片设置样式
                                                $cloneImg.css({
                                                    position:'absolute',
                                                    top:$img.offset().top,
                                                    left:$img.offset().left,
                                                    width:$img.width()
                                                });

                                            // 把图片写入页面
                                            $cloneImg.appendTo('body');
                                             $cloneImg.animate({left:$('.ro').offset().left,top:$('.ro').offset().top,width:40},function(){
                                                    //删除复制的图片
                                                    $cloneImg.remove();
                                                    //购物信息添加到cookie
                                                    
                                                    
                                                })
                                             if(Cookie.get('data')){
                                                var cookies=JSON.parse(Cookie.get('data'));
                                               coo=[];
                                                cookies.map(function(item){

                                                    if(item.id == idx){
                                                       
                                                        item.qty=$('#detail input')[0].value*1+item.qty*1;
                                                       
                                                       coo.push({itro:item.itro,price:item.price,id:item.id,qty:item.qty,img:img});
                                                       
                                                    }else{
                                                         coo.push({itro:itro,price:price,id:idx,qty:$('#detail input')[0].value,img:img});
                                                         
                                                     }
                                                      
                                                })
                                             }else{
                                                 coo.push({itro:itro,price:price,id:idx,qty:$('#detail input')[0].value,img:img}); 
                                                  
                                             }
                                            var date = new Date();
                                            date.setDate(date.getDate()+ 7);
                                            console.log(coo)
                                            Cookie.set('data',JSON.stringify(coo),date,'/');
                                      })    
                                                   
                                }
                            });
                   
              
           
    })
})