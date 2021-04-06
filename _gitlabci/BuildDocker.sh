#!/bin/bash
ProjectDir="${HtdocsDir}/${Project}-${CI_COMMIT_REF_NAME}"
function BuildDockerImage()
{
    docker build -t $IMAGE --build-arg CI_COMMIT_REF_NAME=${CI_COMMIT_REF_NAME} --build-arg ProjecHtdocsDir=${ProjecHtdocsDir} -f ${ProjectDir}/_gitlabci/Dockerfile ${ProjectDir}
    docker push $IMAGE
}
echo [构建镜像]
BuildDockerImage