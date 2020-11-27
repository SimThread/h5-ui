const fs = require('fs');
const path = require('path');

export async function generateComponent () {
    console.log('hello world.....1234');
    const dirpath = path.join(__dirname, '../../../src/newcomponent');
    console.log('dirpath:', dirpath);
    // 对于window系统来说，/表示的是文件磁盘所在的根路径，比如文件在c盘，则/表示c:
    // const stat = fs.statSync(dirpath);
    // if (stat.isDirectory()) {
    //     console.log('组件已存在');
    //     return;
    // }

    fs.mkdir(dirpath, (err: Error) => {
        if (err) {
            return console.error(err);
        }
        console.log('目录创建成功。');
        const indexJs = path.join(__dirname, '../../../src/newcomponent/index.js');

        fs.writeFile(indexJs, '我是通过fs.writeFile写入文件的内容', (err: Error) => {
            if (err) {
                return console.error(err);
            }

            console.log('数据写入成功！');
            console.log('----------------我是分隔线----------------');
            console.log('读取写入的数据！');
        });
    });
}
