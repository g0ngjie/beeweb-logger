#!/bin/sh

echo '-- 清理docker镜像&容器'
docker stop beeweb_logger beeweb_mysql
docker rm beeweb_logger beeweb_mysql
docker rmi beeweb_logger_image beeweb_mysql_image

echo '-- 部署mysql'
docker build -t beeweb_mysql_image -f Dockerfile.mysql .

echo '-- 启动mysql'
docker run --name beeweb_mysql -d --restart=always -p 3366:3306 beeweb_mysql_image

echo '-- 部署beeweb镜像'
docker build -t beeweb_logger_image .

echo '-- 启动beeweb服务'
docker run --name beeweb_logger -p 12345:12345 --link=beeweb_mysql:beeweb_mysql -d --restart=always beeweb_logger_image
