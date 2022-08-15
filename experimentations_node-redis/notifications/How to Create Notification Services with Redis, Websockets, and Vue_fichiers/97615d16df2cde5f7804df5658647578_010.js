document.write('<link rel="stylesheet" href="https://github.githubassets.com/assets/gist-embed-549f23051d8d.css">')
document.write('<div id=\"gist104824749\" class=\"gist\">\n    <div class=\"gist-file\" translate=\"no\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-003-write-websocket-server-js\" class=\"file my-2\">\n    \n    <div itemprop=\"text\" class=\"Box-body p-0 blob-wrapper data type-javascript  \">\n\n        \n<div class=\"js-check-bidi js-blob-code-container blob-code-content\">\n\n  <template class=\"js-file-alert-template\">\n  <div data-view-component=\"true\" class=\"flash flash-warn flash-full d-flex flex-items-center\">\n  <svg aria-hidden=\"true\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" data-view-component=\"true\" class=\"octicon octicon-alert\">\n    <path fill-rule=\"evenodd\" d=\"M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z\"><\/path>\n<\/svg>\n  \n    <span>\n      This file contains bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters.\n      <a href=\"https://github.co/hiddenchars\" target=\"_blank\">Learn more about bidirectional Unicode characters<\/a>\n    <\/span>\n\n\n  <div data-view-component=\"true\" class=\"flash-action\">        <a href=\"{{ revealButtonHref }}\" data-view-component=\"true\" class=\"btn-sm btn\">    Show hidden characters\n<\/a>\n<\/div>\n<\/div><\/template>\n<template class=\"js-line-alert-template\">\n  <span aria-label=\"This line has hidden Unicode characters\" data-view-component=\"true\" class=\"line-alert tooltipped tooltipped-e\">\n    <svg aria-hidden=\"true\" height=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" data-view-component=\"true\" class=\"octicon octicon-alert\">\n    <path fill-rule=\"evenodd\" d=\"M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z\"><\/path>\n<\/svg>\n<\/span><\/template>\n\n  <table data-hpc class=\"highlight tab-size js-file-line-container js-code-nav-container js-tagsearch-file\" data-tab-size=\"8\" data-paste-markdown-skip data-tagsearch-lang=\"JavaScript\" data-tagsearch-path=\"003-write-websocket-server.js\">\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L1\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"1\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-v>WebSocket<\/span> <span class=pl-c1>=<\/span> <span class=pl-en>require<\/span><span class=pl-kos>(<\/span><span class=pl-s>&#39;ws&#39;<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L2\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"2\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC2\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-s1>redis<\/span> <span class=pl-c1>=<\/span> <span class=pl-en>require<\/span><span class=pl-kos>(<\/span><span class=pl-s>&#39;redis&#39;<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L3\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"3\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC3\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L4\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"4\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC4\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// Configuration: adapt to your environment<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L5\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"5\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC5\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-c1>REDIS_SERVER<\/span> <span class=pl-c1>=<\/span> <span class=pl-s>&quot;redis://localhost:6379&quot;<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L6\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"6\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC6\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-c1>WEB_SOCKET_PORT<\/span> <span class=pl-c1>=<\/span> <span class=pl-c1>3000<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L7\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"7\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC7\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L8\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"8\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC8\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// Connect to Redis and subscribe to &quot;app:notifications&quot; channel<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L9\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"9\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC9\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>var<\/span> <span class=pl-s1>redisClient<\/span> <span class=pl-c1>=<\/span> <span class=pl-s1>redis<\/span><span class=pl-kos>.<\/span><span class=pl-en>createClient<\/span><span class=pl-kos>(<\/span><span class=pl-c1>REDIS_SERVER<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L10\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"10\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC10\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-s1>redisClient<\/span><span class=pl-kos>.<\/span><span class=pl-en>subscribe<\/span><span class=pl-kos>(<\/span><span class=pl-s>&#39;app:notifications&#39;<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L11\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"11\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC11\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L12\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"12\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC12\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// Create &amp; Start the WebSocket server<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L13\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"13\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC13\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-k>const<\/span> <span class=pl-s1>server<\/span> <span class=pl-c1>=<\/span> <span class=pl-k>new<\/span> <span class=pl-v>WebSocket<\/span><span class=pl-kos>.<\/span><span class=pl-c1>Server<\/span><span class=pl-kos>(<\/span><span class=pl-kos>{<\/span> <span class=pl-c1>port<\/span> : <span class=pl-c1>WEB_SOCKET_PORT<\/span> <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L14\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"14\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC14\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L15\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"15\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC15\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-c>// Register event for client connection<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L16\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"16\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC16\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-s1>server<\/span><span class=pl-kos>.<\/span><span class=pl-en>on<\/span><span class=pl-kos>(<\/span><span class=pl-s>&#39;connection&#39;<\/span><span class=pl-kos>,<\/span> <span class=pl-k>function<\/span> <span class=pl-en>connection<\/span><span class=pl-kos>(<\/span><span class=pl-s1>ws<\/span><span class=pl-kos>)<\/span> <span class=pl-kos>{<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L17\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"17\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC17\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L18\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"18\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC18\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-c>// broadcast on web socket when receving a Redis PUB/SUB Event<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L19\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"19\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC19\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-s1>redisClient<\/span><span class=pl-kos>.<\/span><span class=pl-en>on<\/span><span class=pl-kos>(<\/span><span class=pl-s>&#39;message&#39;<\/span><span class=pl-kos>,<\/span> <span class=pl-k>function<\/span><span class=pl-kos>(<\/span><span class=pl-s1>channel<\/span><span class=pl-kos>,<\/span> <span class=pl-s1>message<\/span><span class=pl-kos>)<\/span><span class=pl-kos>{<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L20\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"20\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC20\" class=\"blob-code blob-code-inner js-file-line\">    <span class=pl-smi>console<\/span><span class=pl-kos>.<\/span><span class=pl-en>log<\/span><span class=pl-kos>(<\/span><span class=pl-s1>message<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L21\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"21\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC21\" class=\"blob-code blob-code-inner js-file-line\">    <span class=pl-s1>ws<\/span><span class=pl-kos>.<\/span><span class=pl-en>send<\/span><span class=pl-kos>(<\/span><span class=pl-s1>message<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L22\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"22\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC22\" class=\"blob-code blob-code-inner js-file-line\">  <span class=pl-kos>}<\/span><span class=pl-kos>)<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L23\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"23\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC23\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L24\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"24\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC24\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-kos>}<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L25\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"25\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC25\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n        <\/tr>\n        <tr>\n          <td id=\"file-003-write-websocket-server-js-L26\" class=\"blob-num js-line-number js-code-nav-line-number js-blob-rnum\" data-line-number=\"26\"><\/td>\n          <td id=\"file-003-write-websocket-server-js-LC26\" class=\"blob-code blob-code-inner js-file-line\"><span class=pl-smi>console<\/span><span class=pl-kos>.<\/span><span class=pl-en>log<\/span><span class=pl-kos>(<\/span><span class=pl-s>&quot;WebSocket server started at ws://locahost:&quot;<\/span><span class=pl-c1>+<\/span> <span class=pl-c1>WEB_SOCKET_PORT<\/span><span class=pl-kos>)<\/span><span class=pl-kos>;<\/span><\/td>\n        <\/tr>\n  <\/table>\n<\/div>\n\n\n    <\/div>\n\n  <\/div>\n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/tgrall/97615d16df2cde5f7804df5658647578/raw/e917b443da197bddd6ca4a7b9941edb47a546cb7/003-write-websocket-server.js\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/tgrall/97615d16df2cde5f7804df5658647578#file-003-write-websocket-server-js\">\n          003-write-websocket-server.js\n        <\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')