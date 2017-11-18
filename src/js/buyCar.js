/* 
* @Author: Marte
* @Date:   2017-11-16 20:52:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-17 10:11:47
*/
require(['config'],function(){
    require(['jquery','common','xheader'],function($){
       render();
         var res=Cookie.get('data');
         res=JSON.parse(res);
        $('.count').on('click','.add',function(){
            $('.count-input')[0].value++;
           
           res.map(function(item){
                if(item.id=id){}
           })
            
        }).on('click','.reduce',function(){
            $('.count-input')[0].value--;
            if($('.count-input')[0].value<1){
                $('.count-input')[0].value=1;
            }
        })
           
        function render(){
                     var res=Cookie.get('data');
                    res=JSON.parse(res);
                    console.log(res)
                    var ul=$('<table/>')[0];
                    ul.innerHTML=res.map(function(item){
                            return`
                                <tr class="${item.id}">
                                <td class="goods"><img src="../${item.img}" alt="" />
                                <span>${item.itro}</span>
                                <p>ID:#326${item.id}</p><br />
                                <p>Size:${item.itro.slice(-5)}</p>
                                </td>
                                <!-- 加减数量 -->
                                <td class="count">
                                    <span class="reduce">-</span>
                                    <input type="text" class="count-input" value="${item.qty}" />
                                    <span class="add">+</span>
                                </td>

                                <td class="price">
                                    <span>${item.price}py6.</span><br />
                                </td>
                                <!-- Total price -->
                                <td class="subtotal">
                                    <span>${item.price*item.qty}py6.</span><br />
                                    <span>You save${16*item.qty}py6.</span>
                                </td>
                                <!-- remove删除 -->
                                <td class="operation">
                                    <span class="delete">
                                        <button>&times;</button>
                                    </span>
                                </td>
                            </tr>
                            `
                    }).join('');
                    $('.carTb')[0].appendChild(ul); 
                    return res;
        }
    })
})