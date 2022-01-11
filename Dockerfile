FROM node:latest

ENV SCRIPT=start

WORKDIR /app

COPY . /app

# this prevents the node-flywayjs from needing to perform the download at runtime
RUN wget https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/8.3.0/flyway-commandline-8.3.0-linux-x64.tar.gz -P /tmp

RUN npm install

ENTRYPOINT npm run $SCRIPT