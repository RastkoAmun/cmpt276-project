FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN cd backend && mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /app/backend/target/projectbackend-0.0.1-SNAPSHOT.jar projectbackend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","project-backend.jar"]