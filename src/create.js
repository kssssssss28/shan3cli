
const fs = require('fs-extra')
const generator = require('./generate')
//module.expotrs 对应 require  export 对应import
const path = require('path');
const inquirer = require('inquirer');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const {
fwrite,
fwriteS
} = require('./utils')
const open = util.promisify(fs.open)
const write = util.promisify(fs.write)
async function writeTextToFile(filePath, newText, callback) {
  let modifiedData = JSON.stringify(newText);
  try{
    let f = await fs.open(filePath,'r', 0o6666)
    await write(f, modifiedData)
  }catch(err){
    console.log(err);
  }finally{
    f.close()
  }

  
}
async function searchAndReadFile(folderPath, fileName) {
    const files = await util.promisify(fs.readdir)(folderPath);
  
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = await util.promisify(fs.stat)(filePath);
  
      if (stat.isFile() && file === fileName) {
        console.log('FOUND:', filePath);
        const data = await readFile(filePath, 'utf8');
        return data;
      } else if (stat.isDirectory()) {
        const data = await searchAndReadFile(filePath, fileName);
        if (data) {
          return data;
        }
      }
    }
  }
  
const fileReplaceParam = [{
    type:"list",
    name:"repalce",
    choices:[
        {name:"replace the dir", value:"replace"},
        {name:"delete the dir", value:"delete"},
        {name:"cancle the creation", value:"cancle"},
    ]
}]



module.exports = async (name, options)=>{
    const cwd = process.cwd();
    const targetAir = path.join(cwd, name); 

    if (fs.existsSync(targetAir)) {
        if (options.force) {
          await fs.remove(targetAir)
        } else {
            let feedback = await inquirer.prompt(fileReplaceParam);
            let res = feedback[Object.keys(feedback)[0]] 
            if(res === "delete"){
                fs.remove(targetAir)
            }
            else if(res === "cancle"){
                return
            }

        }
    }

    let detail = {
        name:name,
        version:"0.0.1",
        ngrx:false,
        router:false,
        alloy:15,
        mock:false
    }

    const detailParam = [
        
        {
            name:'alloy',
            type:"list",
            choices:[
                {name:"13", value:13},
                {name:"15", value:'15.1.1'},
            ]
        },
        {
            name:'version',
            type:'input',
            message:"input your project version"
        },
        {
            name:'ngrx',
            type:"list",
            choices:[
                {name:"yes", value:true},
                {name:"no", value:false},
            ]
        },
        {
            name:'router',
            type:"list",
            choices:[
                {name:"yes", value:true},
                {name:"no", value:false},
            ]
        },{
            name:"mock",
            type:"list",
            choices:[
                {name:"yes", value:true},
                {name:"no", value:false},
            ]
        }
    ]



    let feedback = await inquirer.prompt(detailParam)
    detail = {mock:feedback.mock,name:name, version:feedback.version, ngrx:feedback.ngrx, router:feedback.router, alloy:feedback.alloy}
    

    console.log("pulling template....");
    const p = new generator(name,targetAir)

    p.create()


    console.log("overwrite the files....please wait...")
    const fileDes = process.cwd() + "/" + detail.name

    // if (fs.existsSync(fileDes)) {
    //     const folderPath = fileDes; // 替换为实际的文件夹路径
    //     const fileName = 'package.json'; // 替换为目标文件名
    //     let d = await searchAndReadFile(folderPath, fileName)
    //     d = JSON.parse(JSON.parse(JSON.stringify(d)))
    //     d.version = detail.version
    //     d.name = detail.name
    //     d.dependencies['@keysight/alloy'] = '^' + detail.alloyd
    //     if(detail.mock)
    //     d.devDependencies['mockjs'] = "^1"
    //     let q = (d)=>{
    //     }
    //     console.log(folderPath)
    //     await writeTextToFile(folderPath + "/" + fileName,d,q)

    // }

    if(detail.mock){
      fs.mkdir(fileDes + "/"  +'/src/mock')
    }

}


