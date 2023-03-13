FROM openjdk:11
WORKDIR usr/lib
EXPOSE 8998
ADD ./target/ride-finished-notification-0.0.1-SNAPSHOT.jar /usr/lib/ride-finished-notification-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "ride-finished-notification-0.0.1-SNAPSHOT.jar"]