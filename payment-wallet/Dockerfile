FROM openjdk:11
WORKDIR usr/lib
EXPOSE 7632
ADD ./target/payment-wallet-0.0.1-SNAPSHOT.jar /usr/lib/payment-wallet-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "payment-wallet-0.0.1-SNAPSHOT.jar"]