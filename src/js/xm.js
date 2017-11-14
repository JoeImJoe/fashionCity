/* 
* @Author: Marte
* @Date:   2017-11-07 11:30:55
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-13 17:09:12
*/

     $.extend({
            request: function (paras) {
                var url = location.href;
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var paraObj = {}
                for (i = 0; j = paraString[i]; i++) {
                    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
                }
                var returnValue = paraObj[paras.toLowerCase()];
                if (typeof (returnValue) == "undefined") {
                    return "";
                } else {
                    return returnValue;
                }
            }
        });
     // 用法
     // $(function () {
     //        当前URL:/index.html?para=111
     //        document.write($.request("para"));
     //        结果:111
     //   })
      $.extend({
            format: function (source, params) {
                if (arguments.length == 1)
                    return function () {
                        var args = $.makeArray(arguments);
                        args.unshift(source);
                        return $.format.apply(this, args);
                    };
                if (arguments.length > 2 && params.constructor != Array) {
                    params = $.makeArray(arguments).slice(1);
                }
                if (params.constructor != Array) {
                    params = [params];
                }
                $.each(params, function (i, n) {
                    source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
                });
                return source;
            }
        });
      // 用法
      // $(function () {
      //       var tem = "{0} is {1}";
      //       document.write($.format(tem, "this", "format"));
      //       //结果this is format
      //   })
      $.extend({
            cookie: function (name, value, options) {
                if (typeof value != 'undefined') {
                    options = options || {};
                    if (value === null) {
                        value = '';
                        options = $.extend({}, options);
                        options.expires = -1;
                    }
                    var expires = '';
                    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                        var date;
                        if (typeof options.expires == 'number') {
                            date = new Date();
                            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                        } else {
                            date = options.expires;
                        }
                        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                    }
                    var path = options.path ? '; path=' + (options.path) : '';
                    var domain = options.domain ? '; domain=' + (options.domain) : '';
                    var secure = options.secure ? '; secure' : '';
                    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
                } else {
                    var cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = jQuery.trim(cookies[i]);
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
            }
        });
        // 用法
        // $(function () {
        //     //写，有效期为一天，作用域为整个网站
        //     $.cookie("user", "123456", { expires: 1, path: '/' });
        //     //读
        //     var name = $.cookie("user");
        // })
        (function ($) {
            'use strict';
            var escape = /["\\\x00-\x1f\x7f-\x9f]/g, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, hasOwn = Object.prototype.hasOwnProperty;
            $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
                if (o === null) { return 'null'; }
                var pairs, k, name, val, type = $.type(o); if (type === 'undefined') { return undefined; }
                if (type === 'number' || type === 'boolean') { return String(o); }
                if (type === 'string') { return $.quoteString(o); }
                if (typeof o.toJSON === 'function') { return $.toJSON(o.toJSON()); }
                if (type === 'date') {
                    var month = o.getUTCMonth() + 1, day = o.getUTCDate(), year = o.getUTCFullYear(), hours = o.getUTCHours(), minutes = o.getUTCMinutes(), seconds = o.getUTCSeconds(), milli = o.getUTCMilliseconds(); if (month < 10) { month = '0' + month; }
                    if (day < 10) { day = '0' + day; }
                    if (hours < 10) { hours = '0' + hours; }
                    if (minutes < 10) { minutes = '0' + minutes; }
                    if (seconds < 10) { seconds = '0' + seconds; }
                    if (milli < 100) { milli = '0' + milli; }
                    if (milli < 10) { milli = '0' + milli; }
                    return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
                }
                pairs = []; if ($.isArray(o)) {
                    for (k = 0; k < o.length; k++) { pairs.push($.toJSON(o[k]) || 'null'); }
                    return '[' + pairs.join(',') + ']';
                }
                if (typeof o === 'object') {
                    for (k in o) {
                        if (hasOwn.call(o, k)) {
                            type = typeof k; if (type === 'number') { name = '"' + k + '"'; } else if (type === 'string') { name = $.quoteString(k); } else { continue; }
                            type = typeof o[k]; if (type !== 'function' && type !== 'undefined') { val = $.toJSON(o[k]); pairs.push(name + ':' + val); }
                        }
                    }
                    return '{' + pairs.join(',') + '}';
                }
            };
            $.quoteString = function (str) {
                if (str.match(escape)) {
                    return '"' + str.replace(escape, function (a) {
                        var c = meta[a]; if (typeof c === 'string') { return c; }
                        c = a.charCodeAt(); return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                    }) + '"';
                }
                return '"' + str + '"';
            };
        }(jQuery));
        // 用法
        //  $(function () {
        //     var obj = {
        //         name: "jack",
        //         age:18
        //     }
        //     $.ajax({
        //         type: "POST",
        //         url: "/ajax.aspx/Method",
        //         data: $.toJSON(obj),
        //         contentType: "application/json; charset=utf-8",
        //         dataType: "json",
        //         success: function (result) {
        //             //success
        //         },
        //         error: function (result) {
        //             //error
        //         }
        //     });
        // })
        $.extend({
            myAjax: function (url, data, callback) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data == null ? "{}" : $.toJSON(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        callback(result.d)
                    },
                    error: function (result) {
                    }
                });
            }
        });
        // 用法
        // $(function () {
        //     var obj = {
        //         name: "jack",
        //         age:18
        //     }
        //     $.myAjax("/ajax.aspx/Method", obj, function (data) {
        //         alert(data);
        //     })
        // })
       
        // 清除两边的空格
        String.prototype.trim = function () {
            return this.replace(/(^\s*)|(\s*$)/g, '');
        };
        //str.trim();
        // 合并多个空白为一个空白
        String.prototype.ResetBlank = function () {
            var regEx = /\s+/g;
            return this.replace(regEx, ' ');
        };
        // var s2=" 1        3";
        // alert(s2.ResetBlank ());      
        // 保留数字
        String.prototype.GetNum = function () {
            var regEx = /[^\d]/g;
            return this.replace(regEx, '');
        };
         
        // 保留中文
        String.prototype.GetCN = function () {
            var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
            return this.replace(regEx, '');
        };
         
        // String转化为Number
        String.prototype.ToInt = function () {
            return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
        };  
        //验证邮箱
         function CheckEmail(email){
                 return /^[\w\.\-\+]+@([\w\-]+\.)+[a-z]{2,4}$/ig.test(email)
        }
        //验证手机号
        function CheckPhone(phone){
                 return /^1[3|4|5|8][0-9]\d{8}$/.test(phone)
        }
        //轮播图
        //返回顶部btn是jQuery对象
        function comeTop(btn){
                btn.css({'position':'fixed','right':'5px','bottom':'5px','display':'none'})
                btn=btn[0];
                window.onscroll = ()=>{
                    let scrollTop = window.scrollY;

                    if(scrollTop > 1200){
                        btn.style.display = 'block';
                    }else{
                        btn.style.display = 'none';
                    }
                }
                btn.onclick = ()=>{
                    console.log(666)
                    let speed = 10;
                    let timer = setInterval(()=>{
                        let scrollTop = window.scrollY;
                        speed = Math.ceil(scrollTop/10);
                        scrollTop -= speed;
                        if(scrollTop <= 10){
                            clearInterval(timer);
                        }
                        window.scrollTo(0,scrollTop);
                    },30);
                }
         }
        //手风琴
        function fq(content,bb){
                content.slice(0).hide();

                content.parent().on('mouseover',bb,function(){
                        $(this).next().stop().slideDown().siblings('.content').stop().slideUp();
                });
                content.parent().on('mouseout',bb,function(){
                        $(this).next().stop().slideUp();
                });

            }
          // 用法 fq(content,'h4');
          // 水平手风琴,一般用作图片baba是大容器'main',son是图片容器'li',big是放大后width,small是原来width
          function spfq(baba,son,big,small){
                    baba = $(baba);
                    baba.on('mouseenter',son,function(){
                        $(this).stop().animate({width:big}).siblings(son).stop().animate({width:small});
                        $(this).find('.des').stop().fadeOut();
                    }).on('mouseleave',son,function(){
                        $(this).stop().animate({width:small});
                        $(this).find('.des').stop().fadeIn();
                    });
                }
        //拖拽
        function drag(box){
            // 拖拽功能
            $(box).css({'position':'absolute'});
            $(box).on('mousedown',function(e){
                var ox = e.clientX-$(box).offset().left;
                var oy = e.clientY-$(box).offset().top;

                $(document).on('mousemove.drag',function(evt){
                    $(box).css({
                        top:evt.clientY - oy,
                        left:evt.clientX - ox
                    });
                });
            });

            $(document).on('mouseup',function(){
                $(document).off('mousemove.drag');
            })
        }
        //放大镜
        //飞入购物车
        //ul是图片的父级,goodlist是高位委托父级,small图片缩小后width
        function fly(ul,small){
            var $cartlist = $(ul);
            var $goodslist = $cartlist.parent();
            
           // 1）给按钮绑定点击事件
            $goodslist.on('click','button',function(){
                var $currentLi = $(this).closest('li');

                var $img = $currentLi.children('img');

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

                // 动画效果:必须写入页面才会显示动画效果
                $cloneImg.animate({left:$cartlist.offset().left,top:$cartlist.offset().top+$cartlist.height(),width:small||60},function(){
                    //删除复制的图片
                    $cloneImg.remove();

                    // 2>复制当前商品所有信息(用于往购物车添加)
                    $cloneLi = $currentLi.clone();
                    $cloneLi.children('p').first().remove();

                    // 添加删除按钮
                    $('<span/>').addClass('btn-close').html('&times;').appendTo($cloneLi);
                    $cloneLi.appendTo($cartlist);
                })
            });

            $cartlist.on('click','.btn-close',function(){
                $(this).closest('li').remove();
            });
        }
        //tab标签切换
        //tab是高位委托父级,li为选项,content就是内容
        function tab(tab,li,content){
            var $tab = $(tab);
            var $tabItem = $tab.find(li);
            var $content = $tab.children(content);
            // 1)隐藏除第一个以外的所有.content
            $content.slice(1).hide();
            // 2)高亮显示第一个tab标签
            $tabItem.first().addClass('active');
            // 3）点击标签，切换相应的内容
            $tab.on('mouseenter','.header li',function(){
                // 如何获取当前索引值
                // index():获取当前元素在同辈元素中的索引值
                var idx = $(this).index();
                // 高亮
                $(this).addClass('active').siblings('li').removeClass();
                // 内容的显示隐藏
                $content.eq(idx).show().siblings('.content').hide();
            });
        }
