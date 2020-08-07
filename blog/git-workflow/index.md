---
title: Git Workflow
date: "2020-07-15T23:23:30.284Z"
tags: ["TODO"]
---

## git commands

### Logging

```bash
    git log
    git log --oneline # more succinct output
    git log --graph # with a visual graph of branches

    git status

    git diff --staged # for staged changes
    git diff # for unstaged changes
    git diff branch1..branch2 #See the differences between two branches


```

### Navigation

```bash

    git switch branch-name # new syntax (as of Git 2.23)
    git checkout branch-name # old syntax

```

### Modifications

```bash
    git reset <commit-sha> #uncommit and unstage those changes but leave those files in the working directory.
    git reset --hard HEAD #reset your local directory to match the latest commit and discard unstaged changes
    git reset --hard HEAD~1 #undo the last commit and rewrite history
    git reset --hard HEAD~n # n is the last n commits
    git reset --hard <commit-sha>  # or to a specific commit
    git reset --soft <commit-sha>  # or to a specific commit
    git reset --mixed <commit-sha>  # or to a specific commit
    # --soft: Uncommit changes but leave those changes staged
    # --mixed (the default): Uncommit and unstage changes, but changes are left in the working directory
    # --hard: Uncommit, unstage, and delete changes

    git restore <filename>     # new syntax (as of Git 2.23)
    git checkout -- <filename> # old syntax
```