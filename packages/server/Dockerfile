FROM node

WORKDIR /app

COPY . /app

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ >/etc/timezone

RUN npm install --registry=https://registry.npm.taobao.org

EXPOSE 12345

CMD ["npm", "start"]
