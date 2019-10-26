

var fs = require('fs');
var path = require('path');

var filePath = path.resolve('./root');

console.log(filePath);

var treeData  = [];
var treeItem = {
    id:'./root',
	text:'root',
	parent:'#'
}
treeData.push(treeItem);

//调用文件遍历方法
fileDisplay(filePath,"./root");


console.log(treeData)

const conent = "const globelTreeData = " + JSON.stringify(treeData) + ";";

fs.writeFileSync("./bookdata.js",conent,err=>{
    if(err){

    }
    else{

    }
})

function fileDisplay(filePath,relvePath){
	const files = fs.readdirSync(filePath);
	
	//遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
				let fileType = fs.statSync(filedir);
                var treeItem = {};
				treeItem.text = filename;
                treeItem.parent = relvePath;
                treeItem.id = relvePath +"/" + filename;
						
                var isFile = fileType.isFile();//是文件
                var isDir = fileType.isDirectory();//是文件夹
                if(isFile){
                    console.log(filedir);
		
                }
				console.log("@@:" + filePath);
				treeData.push(treeItem);
                if(isDir){
                    fileDisplay(filedir,treeItem.id);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
            });
}
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay1(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
						var treeItem = {};
						treeItem.name = filename;
						treeItem.parentPath = filePath;
						
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
							console.log(treeData);
                        }
						treeData.push(treeItem);
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
