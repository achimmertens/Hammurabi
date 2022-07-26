# Creation Of The Hammurabi Game Part 4 - How To Create A Hello World Node.js Frontend In A Docker File

Hello freaks,

I want to create a game, called "Hammurabi", that bases on Hive content. At the moment this game is just a [small bunch of java code](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-1-spring-boot-server-from-scratch), that runs in a [docker container](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-2-run-the-app-in-a-docker-on-the-raspberrypi). It is already [connected to an elasticsearch database](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-3-how-to-connect-java-hello-world-via-rest-api-to-an-elasticsearch-database)

![](https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/achimmertens/23vhpzAunKDXtohLemRj1DKQegshSGYBNPfMAtKrE3VyW8MDJXQk7wxpvUasbdGV6aqb9.png)

In this documentation I want to show, how I have set up a "Hello World" node.js frontend server for this game. It enables us to see a webpage. 


# Preparation
In my case I want to install node.js on my raspberry pi. There I allready have installed npm (node package manager) (sudo apt install nodejs).  For details see [here](https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/).
I have created a new folder structure and pushed it (with force) to github: 
("frontend" is at the beginning empty)

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGR5HMzQtGRM3Xmfd4iJkqUFzjkohhGYxWmcjEpQQeqMcVGUphCGLkbWGS28FvdNBwS.png)

# Install node.js
 Go into the frontend folder.
Install node.js with the following commands:
> npm init -y
npm install express

(This may take some minutes when you do it for the first time)

Create the file apps.js and fill it with:
```
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World! Achim was here!!! This is node.js. Nice to see you!'))
app.listen(3000, () => console.log('Server ready'))
```

You can test now, if it works. For this type in:

> node app.js

You should see the following content in your browser. The URL is from your npm-location (in my case the raspberry server), followed by port 3000:
![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tHbYKtq39g96xpXQTpCx3vZt8UzpJHbXWePdGKtB1G4w4DJhBozMNzkZPwvsaYKDdGZ.png)

# Create A Docker Image

Create a file named .dockerignore and fill it with "node_modules" (because this is a huge directory and we don't want to put it into the dockerfile. It will be created there automatecally):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGXZkQP9oaWhuK5FSwMFNdq4h1j38o1H5FDZnjMagFa8EuQ87hXEqPyNFAH8USwfS7Z.png)

We also don't want to have this directory in github. So we add "/frontend/node_modules" into .gitignore in the Hammurabi root directory:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tbFAbk2tUZV6Bgqp5a5rURFdJYRChGAcYgdfjqFxfVr5GervVZKAKSyjGXJVYeis7PW.png)

Now let's create a Dockerfile with the following content:
```
FROM node:14
WORKDIR /usr/src/app
COPY package*.json app.js ./
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
```

This file tells docker to:
- create an image, based on an basic linux, including node with version 14.
- the working directory in the image is /usr/src/app
- there the content is copied from the directory, in which the docker-creation-command is executed
- after that, npm install is executed
- Port 3000 is reached out as an interface to this docker container
- "node app.js" is started in this container



Let us create the docker image "hammurabinode" with the following command in the frontend folder:

> docker build -t hammurabinode .


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tkfFNM9DctxHKYGFFqi1XgyDffn8HK1ednCtiPJpKJW9yYqyzvdpQyYTLqg9LTYeZd2.png)

Now, let us run the image in a container:
> docker run -d -p 3000:3000 --name node-app hammurabinode

And again, we should see a result like this:
![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tHbYKtq39g96xpXQTpCx3vZt8UzpJHbXWePdGKtB1G4w4DJhBozMNzkZPwvsaYKDdGZ.png)

See also: https://flaviocopes.com/docker-node-container-example/

# Conclusion
Now we have two docker containers running: The one that contains the java code and logic (backend) and the frontend.
If your backend doesn't run, refer to my [former post](https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-2-run-the-app-in-a-docker-on-the-raspberrypi) and/or start it like this:

> C:\Users\User\git\Hammurabi\backend\target>scp *.jar pi@raspi:~/git/Hammurabi/backend/Docker
docker build --tag ham01.img .
docker run -d -p8080:8080 --name hamback ham01.img


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tRqtUAxFb4wD6jjgU8fyZXyrFcxjB864gGFxcGkgY5xSPfe67jPhvUgdmqRBnV5Kqov.png)

The backend is listening for api requests:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tHbYKtqEH92R9B1ybcxzuCf1BT1meV8hri3fExx1jffo5oauKEYJkyxaHpd1UqNfDS8.png)


In the next step we want to connect our frontend with the backend. So stay tuned.

Achim Mertens



