#!/bin/bash
function NpmInstall()
{
    find ${ProjectDir}/package-lock.json -type f -print | xargs md5sum > /tmp/${ProjectName}_NpmInstall_new.md5
    
    if [ ! -e "/tmp/${ProjectName}_NpmInstall_old.md5" ]
    then
        echo [检测到初次生成MD5文件，准备执行Npm Install]
        npm run bootstrap
    else
        if [ -z "`diff /tmp/${ProjectName}_NpmInstall_new.md5 /tmp/${ProjectName}_NpmInstall_old.md5`" ]
        then
            echo [检测到文件无变化，不安装npm插件]
        else
            echo [检测到文件有变化，准备执行准备执行Npm Install]
            npm run bootstrap
        fi
    fi
    cp -f /tmp/${ProjectName}_NpmInstall_new.md5 /tmp/${ProjectName}_NpmInstall_old.md5
}

function NpmRun()
{
    if [ -n "`npm version`" ]
    then
	    echo [准备执行构建脚本]
        npm run build:site
    else
        echo [检测到没有npm命令，请安装npm]
        exit 1
    fi
}

if [ ! -d ${ProjectDir} ]
then
    echo [未准备创建文件夹${ProjectDir}]
else
    cd ${ProjectDir}
    NpmInstall
    NpmRun
fi