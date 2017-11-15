/* 
* @Author: Marte
* @Date:   2017-10-09 16:21:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-06 17:51:18
*/

//随机数
function randomNumber(min,max){
    return parseInt(Math.random()*(max-min+1))+min;
}
//随机颜色
function randomColor(){
    var r= parseInt(Math.random()*256);
    var g= parseInt(Math.random()*256);
    var b= parseInt(Math.random()*256);
    return 'rgb('+r+','+g+','+b+')';
}

//获取元素样式
function getStyle(ele,attr){
    var res='';
    //标准浏览器
    if(window.getComputedStyle){
        res=getComputedStyle(ele)[attr];
    }
    //ie678
    else if(ele.currentStyle){
        res= ele.currentStyle[attr];
    }
    //或则直接返回内联样式
    else{
        res=ele.style[attr];
    }
   return res;
}
//监听器
function listen(ele,type,fn,capture){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,capture);
    }else if(ele.attachEvent){
        ele.attachEvent(type,fn);
    }else{
        ele['on'+type]=fn;
    }
}

//cookie
var Cookie={
/**
 * [add description]
 * @param {String} 'username' [cookieName]
 * @param {String} 'value'    [cookieValue]
 * @param {[Date]} 'date'     [cookieDate]
 * @param {[String]} 'path'     [cookiePath]
 */
    set:function(name,val,expires,path){
        var str=name+'='+val;
        if(expires){
            str+=';expires='+expires.toUTCString();
        }
        if(path){
            str+=';path='+path;
        }
        //写入cookie
        document.cookie=str;
    },
    /**
     * [remove description]
     * @param  {[String]} name [cookieName]
     * @param  {[String]} path [/]
     */
    remove:function(name,path){
        var now=new Date();
        now.setDate(now.getDate()-7);
        this.set(name,'null',now,path);
    },
    /**
     * [get description]
     * @param  {[String]} name [cookieNamen]
     * @return {[string]} res     [description]
     */
    get:function(name){
        var res='';
        var cookies=document.cookie;
        if(!cookies.length){
            return res;
        }
        // cookie字符串拆成数组
        cookies = cookies.split('; ');
        for(var i=0;i<cookies.length;i++){
            var arr=cookies[i].split('=');
            if(arr[0]===name){
                return res=arr[1];
                break;
            }
            return res;
        }
    }             
                
}
//Cookie.add('username','value','date','path')
function animate(ele,opt,callback){
    // 记录动画数量
    let timerLen = 0;

    // 遍历opt
    for(var attr in opt){
        // 如何把attr限定到局部作用域中
        // ES6解决方案：用let声明attr
        // 传统解决方案：利用函数传参

        createTimer(attr);

        timerLen++;
    }

    function createTimer(attr){
        // 为每个属性设置不同的定时器(关键1)
        let timerName = attr + 'timer';
        let target = opt[attr];

        clearInterval(ele[timerName]);

        // 把定时器与Dom关联（关键2）
        ele[timerName] = setInterval(()=>{
            // 先获取当前值
            let current = getComputedStyle(ele)[attr];//String:100px,50rem,0.5,60deg

            // 提取数值：单位
            // 根据当前值提取单位(单位在current最后面)
            let unit = current.match(/[a-z]+$/);
            if(unit){
                current = current.substring(0,unit.index)*1;
                unit = unit[0]
            }else{
                unit = '';
                current *= 1;
            }

            // 计算速度
            let speed = (target - current)/10;

            // 处理speed值，防止speed为小数而造成定时器无法完成的情况
            // 0.3=>1,-0.3=>-1
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);


            if(attr === 'opacity'){
                speed = speed>0 ? 0.05 : -0.05;
            }

            // 动画完成
            if(current === target){
                clearInterval(ele[timerName]);
                current = target - speed;

                timerLen--;

                if(typeof callback === 'function' && timerLen === 0){
                    callback();
                }
            }

            ele.style[attr] = current + speed + unit;
        },30)
    }
    
}
/**
 * [waterfall description]
 * @param  {所有图片的parentNode}wrap     [description]

 * @return {[type]}           [description]
 */
function waterfall(wrap){
    //计算列数和间距
    let items = wrap.children;
    let itemWidth = items[0].offsetWidth;
    let col=Math.floor((window.innerWidth-17)/itemWidth);
            let gap=(window.innerWidth-17)%itemWidth/(col+1);
            render();
             window.onresize = function (){
                col = Math.floor((window.innerWidth-17)/itemWidth);
                gap = (window.innerWidth-17)%itemWidth/(col+1);
                render();
            }
            function render(){
                //创建一个数组保存第一列每个图片左上角坐标
            let pos=[];
            for(let i=0;i<col;i++){
                pos.push({
                    left:gap*(i+1)+itemWidth*i,
                    top:gap
                })
            }
            //遍历所有图片,往容器添加图片
            for(let i=0;i<items.length;i++){
                //获取当前items下的图片
                let img = items[i].querySelector('img') ||items.querySelector('img');
                console.log(img)
                let minIdx =0;
                //图片加载完成执行
                //如果图片被浏览器缓存,则不执行
                //img.complete
                if(img.complete){
                    imgPos();
                }
                img.onload=imgPos;
                function imgPos(){
                    //遍历数组pos，查找最小top值，然后更新当前top值
                    
                    let min = pos[minIdx].top;
                    for(let j=1;j<pos.length;j++){
                        if(pos[j].top<min){
                            minIdx = j;
                            min = pos[j].top;
                        }
                    }
               
                animate(items[i],{top:parseInt(pos[minIdx].top),left:parseInt(pos[minIdx].left)
                })
                //然后更新当前top值(关键)
                pos[minIdx].top +=items[i].offsetHeight+gap;
            }
             }
            }
}

/**
 * [ajax异步请求的封装]
 * @param  {Object} options [请求参数]
 * 支持jsonp请求
 */
function ajax(options){
    // 默认值
    var defaults = {
        type:'get',//post,put,delete,jsonp...
        async:true,
        callbackName:'callback'
    }

    // 扩展默认参数
    // var opt = Object.assign(defaults,options);
    for(var attr in options){
        defaults[attr] = options[attr];
    }
    var opt = defaults;
    opt.type = opt.type.toLowerCase();


    // 处理参数
    // data:{pageNo:1,qty:10} => 'pageNo=1&qty=10'
    if(opt.data){
        var params = '';
        for(var attr in opt.data){
            params += attr + '=' + opt.data[attr] + '&'
        }

        // 去除多余的&
        params = params.slice(0,-1);
    }

    // 根据请求类型定义url
    if(opt.type === 'get' || opt.type === 'jsonp'){
        var fuhao = opt.url.indexOf('?')>=0 ? '&' : '?';

        opt.url += fuhao + params;


        // opt.url += '?' + params;//../api/football.php?name=laoxie?pageNo=1&qty=10
        params = null;
    }


    // /api/jsonp.php?name=laoxie&pageNo=1&qty=10&callback
    // 当同时发起多个jsonp请求时
    if(opt.type === 'jsonp'){
        // var fnName = 'getData' + parseInt(Math.random()*10000000);
        var fnName = 'getData' + new Date().getTime();

        // 1.预设全局函数
        window[fnName] = function(data){
            // 处理数据
            if(typeof opt.success === 'function'){
                opt.success(data);
            }

            // 删除script节点
            script.parentNode.removeChild(script);

            // 删除全局函数
            delete window[fnName];
        }

        // 2.生成script标签,并写入页面
        var script = document.createElement('script');
        script.src = opt.url + '&'+opt.callbackName + '='+fnName;
        document.head.appendChild(script);


        return;
    }



    // ajax请求
    var xhr;

    // 兼容xhr异步请求对象
    try{
        xhr = new XMLHttpRequest();
    }catch(error){
        try{
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(err){
            try{
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e){
                alert('你的浏览器太Low了，赶紧升级谷歌浏览器');
            }
            
        }
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)){
            var res;
            try{
                res = JSON.parse(xhr.responseText);
            }catch(err){
                res = xhr.responseText;
            }

            if(typeof opt.success === 'function'){

                opt.success(res);
            }
        }
    }


    xhr.open(opt.type,opt.url,opt.async);

    // 如果post请求，必须设定请求头
    if(opt.type != 'get'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    }

    xhr.send(params);
}
// ajax({
//  type:'jsonp',
//  url:'../api/football.php?name=laoxie',
//  data:{pageNo:1,qty:10},
//  callbackName:'cb',
//  success:function(data){
        //处理数据代码
//  }
// })


//判断数据类型的方法
function type(data){
    // [object Object]
    // [object Number]
    // [object Null]

    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}

// type(123);//number
// type('abc');//string
// type([1,2,3]);//array