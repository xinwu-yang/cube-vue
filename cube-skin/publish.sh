#!/usr/bin/env sh
# 遇到问题则中断
set -e

echo "准备发布 @tievd/cube-skin"
VERSION=`npx select-version-cli`

read -p "确定发布版本为 $VERSION ? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # commit
  # echo "正在提交代码..."
  # git add .
  # git commit -m "[build] $VERSION"

  # # 修改package.json中的版本号
  # npm version $VERSION --message "[release] $VERSION"

  # # publish
  # git push

  # 修改package.json中的版本号
  npm  --no-git-tag-version version $VERSION

  echo "正在发布 $VERSION ..."
  if [[ $VERSION =~ "beta" ]]
  then
    npm publish --tag beta
  else
    npm publish --access public
  fi
fi
