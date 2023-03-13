FROM openjdk:11
WORKDIR usr/lib
EXPOSE 8081
ADD ./target/user-booking-service-0.0.1-SNAPSHOT.jar /usr/lib/user-booking-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "user-booking-service-0.0.1-SNAPSHOT.jar"]