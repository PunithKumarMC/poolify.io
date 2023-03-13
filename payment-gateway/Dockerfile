FROM openjdk:11
WORKDIR usr/lib
EXPOSE 8857
ADD ./target/payment-gateway-0.0.1-SNAPSHOT.jar /usr/lib/payment-gateway-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "payment-gateway-0.0.1-SNAPSHOT.jar"]