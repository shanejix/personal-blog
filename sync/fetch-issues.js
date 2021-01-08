const fs = require("fs")
const path = require("path")
const axios = require("axios")
const { rebuild } = require("./utils")

// https://api.github.com/repos/shanejix/shanejix.github.io/issues
const github_username = "shanejix"
const github_rep = "shanejix.github.io"

const GITHUB_BASE_URL = "https://api.github.com"
const mdDir = path.resolve(__dirname, "../posts")

module.exports = async () => {

  try {

    // 清空md文件夹
    rebuild(mdDir)

    // 请求github博客内容
    let { data: posts } = await axios.get(
      `${GITHUB_BASE_URL}/repos/${github_username}/${github_rep}/issues`
    )

    // 过滤issues
    posts = posts.filter(
      post => post.state === "open" && post.author_association === "OWNER"
    )

    // console.log(posts);

    // 按照title创建文件夹和index.md
    posts.forEach(post => {
      const body = injectHeader(post)
      const postDir = `${mdDir}/${post.title}`
      const postFilePath = path.join(postDir, `${post.title}.md`);

      fs.mkdirSync(postDir);
      fs.writeFileSync(postFilePath, body, "utf8");
    })

  } catch (e) {
    // console.log("e: ", e)
    console.error("仓库拉取失败，请检查您的用户名和仓库名")
    throw e
  }
}

function flatTags(labels) {
  return (labels || []).map(label => label.name)
}

function injectHeader(post) {
  // 为了保证输出的格式，引号内部的代码不要格式

  // console.log("post.labels", post.labels)

  const header = `---
  title: '${post.title}'
  date: '${post.created_at}'
  update: '${post.updated_at}'
  comments: ${post.comments}
  url: '${post.url}'
  tags: ${JSON.stringify(flatTags(post.labels))}
---`
  const result = `${header}

${post.body}`

  return result
}
