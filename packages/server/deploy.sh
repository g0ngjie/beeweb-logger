#!/bin/sh

# 镜像
LOG_IMAGE=beeweb_logger_image
LOG_MYSQL_IMAGE=beeweb_mysql_image
# 容器
LOG_CONTAINER=beeweb_logger
LOG_MYSQL_CONTAINER=beeweb_mysql

echo '-- 清理docker镜像&容器'
docker stop $LOG_CONTAINER $LOG_MYSQL_CONTAINER
docker rm $LOG_CONTAINER $LOG_MYSQL_CONTAINER
docker rmi $LOG_IMAGE $LOG_MYSQL_IMAGE

echo '-- 部署mysql'
docker build -t $LOG_MYSQL_IMAGE -f Dockerfile.mysql .

echo '-- 启动mysql'
docker run --name $LOG_MYSQL_CONTAINER -d --restart=always -p 3366:3306 $LOG_MYSQL_IMAGE

echo '-- 部署beeweb镜像'
docker build -t $LOG_IMAGE .

echo '-- 启动beeweb服务'
docker run --name $LOG_CONTAINER -p 12345:12345 --link=$LOG_MYSQL_CONTAINER:$LOG_MYSQL_CONTAINER -d --restart=always $LOG_IMAGE
