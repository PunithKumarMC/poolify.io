FROM openjdk
WORKDIR usr/lib
EXPOSE 8089
ADD ./target/user-authentication-service-0.0.1-SNAPSHOT.jar /usr/lib/user-authentication-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","user-authentication-service-0.0.1-SNAPSHOT.jar"]