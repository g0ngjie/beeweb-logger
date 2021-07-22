#!/bin/sh

# 镜像
LOG_IMAGE=beeweb_logger_image
# 容器
LOG_CONTAINER=beeweb_logger

echo '-- 清理docker镜像&容器'
docker stop ${LOG_CONTAINER} beeweb_mysql
docker rm ${LOG_CONTAINER} beeweb_mysql
docker rmi ${LOG_IMAGE} beeweb_mysql_image

echo '-- 部署mysql'
docker build -t beeweb_mysql_image -f Dockerfile.mysql .

echo '-- 启动mysql'
docker run --name beeweb_mysql -d --restart=always -p 3366:3306 beeweb_mysql_image

echo '-- 部署beeweb镜像'
docker build -t ${LOG_IMAGE} .

echo '-- 启动beeweb服务'
docker run --name ${LOG_CONTAINER} -p 12345:12345 --link=beeweb_mysql:beeweb_mysql -d --restart=always ${LOG_IMAGE}
