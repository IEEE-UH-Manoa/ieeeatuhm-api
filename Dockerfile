# Dockerfile for testing

FROM ubuntu:latest

# Setup node, npm
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup | sudo bash -
RUN apt-get install -y nodejs build-essential

# make the proper directories
RUN mkdir /var/test
WORKDIR /var/test
ADD src/server.js /var/test/
ADD src/models.js /var/test/
ADD package.json /var/test/
ADD run_script /var/test/

RUN npm install

# Expose and run script
EXPOSE 16906 
RUN /bin/bash run_script

