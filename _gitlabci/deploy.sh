#!/bin/bash
if [ ${CI_BUILD_REF_NAME} == "develop" ]
then
    echo [检测到开发环境,POD数量变更为1个]
    replicas=1
    echo [检测到开发环境,KUBE服务端为${KUBE_DEV}:${KUBE_DEV_PORT}]
    KUBE_MASTER=${KUBE_DEV}
    KUBE_MASTER_PORT=${KUBE_DEV_PORT}
fi

containersName=${ProjectName}-${CI_JOB_ID}
function PrintPOD()
{

cat<<SUB
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: ${ProjectName}
spec:
  replicas: ${replicas}
  template:
    metadata:
      labels:
        name: ${ProjectName}
    spec:
      containers:
      - name: ${containersName}
        image: ${IMAGE}
        imagePullPolicy: Always
        volumeMounts:
        - name: localtime
          mountPath: /etc/localtime
      volumes:
      - name: localtime
        hostPath:
            path: /etc/localtime
      restartPolicy: Always
SUB
}
PrintPOD
function RollUpdate()
{
    PrintPOD | kubectl -s ${KUBE_MASTER}:${KUBE_MASTER_PORT} apply -f -
}

echo [准备滚动更新]
RollUpdate