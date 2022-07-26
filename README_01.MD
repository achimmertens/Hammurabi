# Creation Of The Hammurabi Game - Part 1: Spring Boot Server From Scratch

Hello world,

I want to set up a server, that has a webfrontend, access to a database and some logic. In my case it is a simple "Hammurabi"-game, which everyone can play. Maybe in the future it gets some features, where the player get some advantages, when he does something in the "[hive](https://peakd.com)" world, i.e. some advertising. And in the long run I maybe want to benefit the player with some token. But that is far in the future.

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23vhpzAunKDXtohLemRj1DKQegshSGYBNPfMAtKrE3VyW8MDJXQk7wxpvUasbdGV6aqb9.png)
*[origin](https://de.wikipedia.org/wiki/Hammurapi_I._(Babylon)#/media/Datei:Codice_di_hammurabi_03.JPG)*


In this post I explain how to set up a simple web server, that runs on java spring boot:

# Preparing git
I have created a folder, which I want to synch with github. So I created in Github a new branch from my existing Hammurabi repository. (There I have created some simple game logic in the past. I want to merge it later with the springboot-server we install now).
On my local folder I checked out this new branch.
The I deleted the content via the file explorer.
(The "ll" was done after I have unpacked the content from start.spring.io in this folder):

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23xyGPV54TAJBN2ygMsjhZTJYTnuGuZE7QHjA8SRc2fhAhu7gLXZ6DNiJ9vaw1bqDezrC.png)

# Creating Spring Boot Server from scratch
Go to https://start.spring.io/ and fill out the content like this:

It is very important to write the right package name. By default the artifact-name is added. This leads to very strange errors. The package name has to be the same as the group name!

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo4Js77Wqk17w1yZEfiRJHVVcJDdxcCWd3yVjjCKkp5n3xCkHxBTy98h5FPzGSkYtu8.png)

I unpacked the downloaded jar file into the prepared git folder:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/Eo8ZVfHV1VcfLD21Bg3zsVKRUeGV7spYUt54VDTq3FqtjrexaMyL4s95Sx7g8zGZTyE.png)

I started the folder with IntelliJI:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGXuUVrz6Q95hGipD2LEDUo6sTQs4hZuLiAfxRRvZzLWUDKWLVb2y24jqLDiY26Whq2.png)

I created a new package named org.chary.controller and created a new java file there:

![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23tGY55swYFvm9o8XxTPwzxBkUQw8H8EcC88yrMk3CVBqsP2eUSLen7fg4Rvk8pqpEHDt.png)

After that I started the HammurabiApplication and checked with the browser, if I can reach it: It works!


![grafik.png](https://files.peakd.com/file/peakd-hive/achimmertens/23xAiMjKnGh1Fs1c5rMCxyeDD1przgMkhSGfNne1oBupWHoA4E5CmhhUZupoLdrAkkekj.png)


Don't forget to:
git add .
git commit -m "springboot from scratch"
git push

You can find my code on Github: https://github.com/achimmertens/Hammurabi. (Be aware, that it is not finished at the moment).

In my next post, I explain how to push this server to a docker container in a raspberry pi.

Regards, Achim