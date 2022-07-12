# Creation Of The Hammurabi Game Part 2 - Run The App In A Docker On The RaspberryPi

Hello,

In this documentation I want to show, how I have set up a Java Springboot Application in a docker container, that runs on a Raspberry Pi.

In the long run I want to create a simple game with the name "Hammurabi", which uses hive content to influence the run of play.

![](https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/achimmertens/23vhpzAunKDXtohLemRj1DKQegshSGYBNPfMAtKrE3VyW8MDJXQk7wxpvUasbdGV6aqb9.png)


# Precondition:

Java Springboot is a base (Hello world) package, that can be easily created via https://start.spring.io/.

Here is a description, how I have set up a Java Spring Boot Server: https://peakd.com/hive-169321/@achimmertens/creation-of-the-hammurabi-game-part-1-spring-boot-server-from-scratch
It runs in my IntelliJ IDE, but can also run just with "java -jar xxx.jar"


# Create A New Jar File
Now, that I have some Java code, I want to export my app into a jar file. For this I click in the right upper corner on "Maven/Hammurabi/Lifecycle/package/run Maven Build"

![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo8LWWr8GRvyzKfWfVQQmVyEdQKW8aqzDhKqjhjpgLaDHaZN48rkKuimVB61ybJjXhA.png)

This creates a jar file in the target folder:


![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/23vsr8HS7iVJ7rAvR2rJgWpMUfYGHSxHUgJ95GaZCedMrECXymSJDsMA8MaimBpossEcs.png)

I have copied it to my RaspberryPi:
```
scp C:\Users\User\git\Hammurabi\backend\target\hammurabi-0.0.1-SNAPSHOT.jar pi@raspi:~/git/Hammurabi/backend/Docker
```

![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGVuuBbt5R1v8QhUUjEEFk6zgBxsKzN6opDDij5JZ1hJsN94ipJB8ZXtmGvPzH2jaDj.png)

There I have created a file called "Dockerfile" with the following content:

```
pi@raspberrypi:~/git/Hammurabi/backend/Docker $ cat Dockerfile
# Build time
FROM arm32v7/openjdk
WORKDIR /
ADD hammurabi-0.0.1-SNAPSHOT.jar app.jar

#Run-Time
EXPOSE 8080
CMD java -jar app.jar
```
The trick is, to find the right base image, that contains a minimal Operation System. In my case for my Raspberry Pi I had to take "arm32v7/openjdk". For other images watch out [here](https://hub.docker.com/_/openjdk/).

# Building The Docker Image
Now, with these both files in a folder, I have build my docker image:
``` 
docker build --tag hamm01.img .
```

![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t76y4fwZNyLu5PBuvonUtt31JrbRoCNoKoKspuaypv4iYBbqPPW6EbSFv3x6mo5btvs.png)

An image is like the content of an CD (Compact Disk, for the elder public ;-)). It is just dumb code and cannot be written.
A docker container is a runtime environment (kind of tiny virtual machine), that launches the code. I can start it with:

```
docker run -p8080:8080 --name hammurabi hamm01.img
```

(Or if we want to run it in the background:
docker run -d -p8080:8080 --name hammurabi hamm01.img
)

![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t77B9E7qBgDLFKAWjzLxuu1S5W3RQ7gFTp49R142QdUrYg7oj9PQvPAFX1V1ENcm3Me.png)
Now I can connect with the browser to the RaspberryPi http://raspi:8080

![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tcNzkBEiWtzc2ES1WtytY1uy9utjJqwKVaawWS6yPyGZRRaf7xAPT4LhkrfFavyDE3i.png)

It works!


# How to stop and redeploy a container and image
This shows how we can stop the container:

![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t7572xfmBgy9XQShkHSCMgTX8fTGZzquSDB1yttfrVP1P98DMhUJFsz8pWJMX6XsZsH.png)

And with these commands we remove the image. This is necessary to build (deploy) a newer image of the container. First we stop and delete the container:

- docker ps -a   -> shows all containers (including the not running containers)
- docker stop <containername>  -> stops the running container
- docker rm <containername>   -> removes the container

Now we delete the image:
- docker images  -> shows which images are installed
- docker rmi <image name>   -> removes that image

![image.png](https://files.peakd.com/file/peakd-hive/achimmertens/23t797uH8cFEbziVrQQsicjtb62G9HN4gKuN2iHPv74rqg3qyRCBndrKGFLuH1tfTrWVo.png)

If we want to redeploy an image, now we can go back to "Create A New Jar File"


----------------
In my next documentation I show how I have created some Java code to enable web-requests via RestAPI, so stay tuned.

Regards, Achim Mertens








