const fs = require('fs');
const path = require('path');

const originPath =  path.join(__dirname, '../build');
const targetPath = path.join(__dirname, '..');


function createDir(dist, callback) {
    fs.access(dist, err => {
        if (err) {
            fs.mkdirSync(dist)
        }
        // 如果原来文件夹内有东西，则删光。但是现在出现了删除权限的问题，暂时移除
        //  else {
        //     const files = fs.readdirSync(dist)

        //     files.forEach(fileName => {
        //         const __path = path.join(dist, fileName);
        //         console
        //         fs.unlinkSync(__path)
        //     })
        // }
        callback()
    })
}

function readDirectory(currentPath = '') {
    const _originPath = path.join(originPath, currentPath)

    fs.readdir(_originPath, function(err, files) {
        if (err) {
            console.error(err);
            return;
        }
    
        files.forEach(fileName => {
            const filePath = path.join(_originPath, fileName);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const destPath = path.join(targetPath, currentPath, fileName);

                if (stats.isDirectory()) {
                    createDir(destPath, () => {
                        readDirectory(path.join(currentPath, fileName));
                    })
                    return;
                }

                fs.copyFile(filePath, destPath, fs.constants.COPYFILE_FICLONE_FORC, () => {})
            })
        })
    })
}

readDirectory('')

