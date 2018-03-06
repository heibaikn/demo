var socket;
var lockReconnect = false;
var wsUrl = "ws://172.16.4.10:4576/HrUVuIhFPu";

function createWebSocket(obj) {
    if (!window.WebSocket) {
        window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
        socket = new WebSocket(wsUrl);
        initEventHandler(obj);
    } else {
        obj.val("抱歉，您的浏览器不支持WebSocket协议!");
    }
}

function initEventHandler(obj) {
    socket.onopen = function () {
        obj.val("WebSocket 建立连接成功!");
    };
    socket.onmessage = function (event) {
        obtainMessage(event);
    };
    socket.onclose = function () {
        obj.val("WebSocket 关闭!");
        reconnect(obj);
    };
    socket.onerror = function () {
        obj.val("WebSocket 错误!");
        reconnect(obj);
    };
}

function reconnect(obj) {
    if (lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () {
        createWebSocket(obj);
        lockReconnect = false;
    }, 20000);
}

function closeWebSocket() {
    if (socket.readyState == socket.OPEN) {
        socket.close();
    }
}

