#!/bin/bash
function CleanDocker()
{
    if [ -n "$(docker ps -f status=exited -q)" ];then docker rm $(docker ps -f status=exited -q) 2>/dev/null;fi
    if [ -n "$(docker images -f dangling=true -q)" ];then docker rmi $(docker images -f dangling=true -q) 2>/dev/null;fi
}
echo [清理Docker]
CleanDocker