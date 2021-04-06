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
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${ProjectName}
  labels:
    name: ${ProjectName}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      name: ${ProjectName}
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
---
apiVersion: v1
kind: Service
metadata:
  name: ${ProjectName}
spec:
  selector:
    name: ${ProjectName}
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
    name: http
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${ProjectName}
  annotations:
    kubernetes.io/ingress.class: "traefik"
spec:
  rules:
  - host: "h5ui.debug.591.com.hk"
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ${ProjectName}
            port:
              number: 80
SUB
}
PrintPOD
function RollUpdate()
{
    PrintPOD | kubectl  apply -f -
}

echo [准备滚动更新]
RollUpdate