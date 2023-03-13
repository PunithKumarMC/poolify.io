FROM openjdk:11
WORKDIR usr/lib
EXPOSE 8085
ADD ./target/booked-history-0.0.1-SNAPSHOT.jar /usr/lib/booked-history-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "booked-history-0.0.1-SNAPSHOT.jar"]