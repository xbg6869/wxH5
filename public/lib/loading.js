(function () {
    //在页面未加载完毕之前显示的loading Html自定义内容
    var _LoadingHtml = '<img src="../img/loading.gif" id="loadingDiv" >';
   //呈现loading效果
    document.write(_LoadingHtml);

//监听加载状态改变
    document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
    function completeLoading() {
        if (document.readyState == "complete") {
            setTimeout(function () {
                var loadingMask = document.getElementById('loadingDiv');
                loadingMask.parentNode.removeChild(loadingMask);
            }, 1000)
        }
    }
})();