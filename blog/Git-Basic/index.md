---
title: Git Basic
date: "2018-12-15T23:23:30.284Z"
tags: ["git"]
---

## git commands

### basic

- repository
- branch
- commit
- checkout
- master
- merge
- fork
- head

### basic git commands

```bash

    git init | git init [folder]

```

```bash

    git clone [repo url]

```

```bash

    git add [directory | file]

```

```bash

    git commit -m "[message]"

```

```bash

    git push

```

```bash

    git status

```

```bash

    git log

```

```bash

    git diff

```

```bash

    git pull

```

```bash

    git fetch

```

```bash

    git config -global user.email [user_email]

```

```bash

    git config -global user.name [user_name]

```

```bash

    git config --global --edit

```

### git log

```bash

git log

# more succinct output
git log --oneline
# with a visual graph of branches
git log --graph

```

### git diff

```bash

# for staged changes
git diff --staged
# for unstaged changes
git diff
#See the differences between two branches
git diff branch1..branch2

```

### git stash

### git rebase

### navigation

```bash

# new syntax (as of Git 2.23)
git switch branch-name
# old syntax
git checkout branch-name

```

### Modifications

```bash

# uncommit and unstage those changes but leave those files in the working directory.
git reset <commit-sha>
# reset your local directory to match the latest commit and discard unstaged changes
git reset --hard HEAD
# undo the last commit and rewrite history
git reset --hard HEAD~1
# n is the last n commits
git reset --hard HEAD~n
# or to a specific commit
git reset --hard <commit-sha>
# or to a specific commit
git reset --soft <commit-sha>
# or to a specific commit
git reset --mixed <commit-sha>

# --soft: Uncommit changes but leave those changes staged
# --mixed (the default): Uncommit and unstage changes, but changes are left in the working directory
# --hard: Uncommit, unstage, and delete changes

# new syntax (as of Git 2.23)
git checkout -- <filename>
# old syntax
git restore <filename>

```

### reference

- [https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc](https://dev.to/unseenwizzard/learn-git-concepts-not-commands-4gjc)
- [https://backlog.com/git-tutorial/](https://backlog.com/git-tutorial/)
- [https://backlog.com/git-tutorial/cn/contents/](https://backlog.com/git-tutorial/cn/contents/)
- [https://github.com/pcottle/learnGitBranching](https://github.com/pcottle/learnGitBranching)
