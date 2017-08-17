
var http=require("http");
var url=require("url");
var fs=require("fs");
//引入formidable对象
var formidable=require("formidable");
var server=http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/json","Access-Control-Allow-Origin":"*"});
    if(req.method=="GET"){//图片链接的的请求是GET请求
        //图片请求
        var obj=url.parse(req.url,true);
        console.log(obj);
        var path="."+obj.path;
        var readStream=fs.createReadStream(path);
        readStream.pipe(res);
    }else{
        //文件请求
        startParse(req,res);//开始解析
    }

});
server.listen(8080);
//创建函数完成前端form表单数据的解析
function startParse(req,res){
    //创建一个formidable对象解析文件数据
    var form=new formidable.IncomingForm();
    form.encoding="utf-8";//设置form表单中的文本数据编码格式
    form.uploadDir="./img";//设置文件存储的路径
    form.keepExtensions=true;//设置文件上传时保持文件的后缀
    //开始解析form表单数据
    form.parse(req,function(err,fields,files){
        console.log(files);
        if(files.file){
            //获取上传文件的完整路径
            var path="http://localhost:8080/"+files.file.path;
        // 将路径返回给前端页面
            res.write(JSON.stringify({err:0,path:path}));
            res.end();
        }
    })
}
