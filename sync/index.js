const syncPosts = require("./fetchIssues")
const { withOra } = require("./utils")

// 同步github上的blogs到md文件夹
const start = async () => {
  await withOra(syncPosts, "sync posts loading...")
}

start()
