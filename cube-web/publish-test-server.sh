#!/bin/bash
# 遇到问题则中断
set -e

echo "准备发布到测试服务器：25.30.15.85:/root/cube/dist"
VERSION=`npx select-version-cli`

read -p "确定发布版本为 $VERSION ? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build
  echo "正在打包 $VERSION ..."
  yarn build

  # 修改package.json中的版本号
  npm  --no-git-tag-version version $VERSION

  echo "正在上传到测试服务器..."
  # 通过scp上传到测试服
  server_pwd=chengxun
  expect -c "
  spawn scp -r dist root@25.30.15.85:/root/cube
  
  expect \"password:\"
  send \"${server_pwd}\r\"
  expect eof
  "
fi
