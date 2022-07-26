# Build time
# FROM balenalib/armv7hf-debian-openjdk:10-jdk-sid-run
FROM arm32v7/openjdk
WORKDIR / 
ADD hammurabi-0.0.1-SNAPSHOT.jar app.jar

#Run-Time
EXPOSE 8080
CMD java -jar app.jar
