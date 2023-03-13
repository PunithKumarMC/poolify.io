FROM openjdk:11
WORKDIR usr/src
#EXPOSE 8761
ADD ./target/eureka-server-0.0.1-SNAPSHOT.jar /usr/src/eureka-server-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "eureka-server-0.0.1-SNAPSHOT.jar"]
