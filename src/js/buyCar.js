/* 
* @Author: Marte
* @Date:   2017-11-16 20:52:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 21:41:57
*/
require(['config'],function(){
    require(['jquery','common','xheader'],function($){
        var res=Cookie.get('data');
        res=JSON.parse(res);
        console.log(res)
        var ul=$('<table/>')[0];
        ul.innerHTML=res.map(function(item){
                return`
                    <tr>
                    <td class="goods"><img src="../${item.img}" alt="" />
                    <span>${item.itro}</span>
                    <p>ID:#24234</p><br />
                    <p>Size:Default</p>
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
                        <span>120.69py6.</span><br />
                        <span>You save 69.24 py6.</span>
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
    })
})