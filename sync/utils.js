const fs = require("fs")
const ora = require("ora")

function delDir(dir) {
  let files = []
  if (fs.existsSync(dir)) {
    files = fs.readdirSync(dir)
    files.forEach(file => {
      const curPath = `${dir}/${file}`
      if (fs.statSync(curPath).isDirectory()) {
        // 递归删除文件夹
        delDir(curPath)
      } else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(dir)
  }
}

function rebuild(dir) {
  // 清空md文件夹
  if (fs.existsSync(dir)) {
    delDir(dir)
  }
  // 重新创建md文件夹
  fs.mkdirSync(dir)
}

async function withOra(fn, tip = "loading...") {
  const spinner = ora(tip).start()

  try {
    const result = await fn()
    spinner.stop()
    return result
  } catch (error) {
    spinner.stop()
    throw error
  }
}

module.exports = {
  withOra,
  delDir,
  rebuild,
}
