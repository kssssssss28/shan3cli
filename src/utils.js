const axios = require('axios');
const fs = require('fs')
axios.interceptors.response.use(res => {
    return res.data;
})


async function getRepoList() {
    return axios.get('https://api.github.com/orgs/vuejs/repos')
}

async function getTagList(repo) {
    return axios.get(`https://api.github.com/repos/vuejs/${repo}/tags`)
}

async function fwrite(path, data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(path, data, {
            flag:'w',
            encoding:"utf-8"
        },
        (err)=>{
            console.log(err);
        })
    })
}

async function fwrite(path, data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(path, data, {
            flag:'w',
            encoding:"utf-8"
        },
        (err)=>{
            console.log(err);
        })
    })
}
module.exports = {
    getRepoList,
    getTagList,
    fwrite,
}