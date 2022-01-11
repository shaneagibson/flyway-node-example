# flyway-node-example

An example of using Flyway in a NodeJS application.

This creates a docker image that can be run in one of two modes:

- `migrate` - to execute the flyway migration; or
- `start` - to start the application

The `migrate` mode will be used from a Kubernetes [init-container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) using elevated privileges (DDL permissions such as CREATE, DROP, RENAME, TRUNCATE).

The `start` mode will be used by the app container using restricted privileges (DML permissions such as SELECT, INSERT, DELETE, UPDATE).

## Usage

1. Install dependencies

    ```
    npm install
    ```

2. Create a network to use:

    ```
    docker network create mynetwork
    ```

3. Start the postgres database:

    ```
    docker run \
        --name mydatabase \
        --env POSTGRES_PASSWORD=s3cr3t \
        --publish 5432:5432 \
        --network mynetwork \
        --rm \
        -d \
        postgres
    ```

4. Build the image for this service:

    ```
    docker build . -t myservice
    ```

5. Run the container in `migrate` mode to run the flyway migration:

    ```
    docker run \
        --name myservice-init \
        --env SCRIPT=migrate \
        --env DB_HOST=mydatabase \
        --env DB_PORT=5432 \
        --env DB_NAME=postgres \
        --env DB_USER=postgres \
        --env DB_PASSWORD=s3cr3t \
        --env DB_SCHEMA=myservice \
        --network mynetwork \
        --rm \
        myservice
    ```

6. Run the container in `start` mode to run the application:

    ```
    docker run \
        --name myservice-app \
        --env SCRIPT=start \
        --env DB_HOST=mydatabase \
        --env DB_PORT=5432 \
        --env DB_NAME=postgres \
        --env DB_USER=postgres \
        --env DB_PASSWORD=s3cr3t \
        --env DB_SCHEMA=myservice \
        --publish 3000:3000 \
        --network mynetwork \
        --rm \
        myservice
    ```
   
7. Browse to http://localhost:3000/users

NOTE: in this example, both the init-container and app-container use the same DB credentials. Obviously this isn't 
suitable for production, and actually defeats the process of having two separate modes of execution.