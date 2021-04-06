#!/bin/bash
function CheckoutREf()
{
    echo [准备切换到$CI_COMMIT_REF_NAME分支]
    if [ "$CI_COMMIT_REF_NAME" == "master" ]
    then
        git checkout $CI_COMMIT_REF_NAME
    else
        git checkout origin/$CI_COMMIT_REF_NAME -b $CI_COMMIT_REF_NAME
    fi
}

function UpdateConfig()
{
    if [ ! -d "update-src/${CI_COMMIT_REF_NAME}" ]
    then
        echo [未发现update-src/${CI_COMMIT_REF_NAME}文件夹]
    else
        echo [准备同步update-src/${CI_COMMIT_REF_NAME}文件夹]
        rsync -avp update-src/${CI_COMMIT_REF_NAME}/. ./
    fi
}

if [ ! -d ${ProjectDir} ]
then
    echo [准备创建文件夹${ProjectDir}]
    cp -ap $CI_PROJECT_DIR ${ProjectDir}
    cd ${ProjectDir}
    echo [修改仓库拉取用户]
    sed "s|gitlab-ci-token:.*@|${GitUser}:${GitPasswd}@|g" -i ./.git/config
    CheckoutREf
    echo [准备获取最新的版本]
    git remote prune origin
    git fetch --all
    git reset --hard origin/$CI_COMMIT_REF_NAME
    git pull
    UpdateConfig
else
    cd ${ProjectDir}
    if [ -z "`git branch --list $CI_COMMIT_REF_NAME|grep \*`" ]
    then
        echo [检测到当前分支不是"`git branch --list $CI_COMMIT_REF_NAME`"]
        CheckoutREf
    else
        echo [检测到当前分支是"`git branch --list $CI_COMMIT_REF_NAME`"]
    fi
    echo [准备获取最新的版本]
    git remote prune origin
    git fetch --all
    git reset --hard origin/$CI_COMMIT_REF_NAME
    git pull
    UpdateConfig
fi
