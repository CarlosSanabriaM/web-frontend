# Execution and Deployment

## Launch in development mode

This section explains how to launch the frontend server in development mode.

Execute the following commands:

```bash
cd <project-root-folder>

# Run the development server and open the frontend in a browser
ng serve --open
```



## Generate and run a docker image

The Dockerfile included in the web-frontend root directory can be used to generate a docker image.

To generate it, execute the following commands:

```bash
cd <project-root-folder>

# Build the docker image (executes the Dockerfile)
# The PROD variable specifies if the image will use the environment variables
# of development mode (src/environments/environment.ts) with PROD=false,
# or production mode (src/environments/environment.prod.ts) with PROD=true.
docker build . -t web_frontend:latest --build-arg PROD=<true/false>
```

To create a docker container using the previously created image and run it, execute:

```bash
# Create a container that executes the web frontend at startup and lets it be accessible via the <host-port> port of the host
# --name web_frontend specifies the name of the container
# -p <host-port>:8080 specifies that the host port specified by the user will be mapped to the port 8080 of the container
# -e PORT=8080 sets the value of the $PORT environment variable used inside the Dockerfile.
# This value must be the same as the one specified in the second value of the -p argument, and must be > than 1024. Recommended is 8080
# -i and -t are used for interactive mode
# web_frontend:latest specifies name:tag of the image that will be used to create the container
docker run --name web_frontend -p <host-port>:8080 -e PORT=8080 -i -t web_frontend:latest

### ALTERNATIVE WAY OF CREATING THE CONTAINER TO ENTER INSIDE IT ###
# Create a container and enter inside it, using a bash shell
# The command is the same, except the last instruction: '/bin/bash'
# This overrides the default CMD command executed by the docker container at startup, executing a bash shell
# The default command is: sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
# This command starts the frontend in the port specified by the environment variable PORT
docker run --name web_frontend -p <host-port>:8080 -e PORT=8080 -i -t web_frontend:latest /bin/bash
```



# Deploy to Heroku

The web frontend is deployed in Heroku in the following url: https://topics-and-summary-web-front.herokuapp.com/.

This was done creating an Heroku app called **topics-and-summary-web-front**.

The docker image created in the previous section (with PROD=true) is used to deploy the frontend to Heroku. 
This is done using the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). The commands are:

```bash
# Login in Heroku
heroku login
# Enter credentials

# Log in to Container Registry
heroku container:login
# 'Login Succeeded' message must appear

# Create a tag registry.heroku.com/topics-and-summary-web-front/web that refers to web_frontend image
docker tag web_frontend registry.heroku.com/topics-and-summary-web-front/web

# Push the image to the heroku docker registry
docker push registry.heroku.com/topics-and-summary-web-front/web

# Release the web frontend application
heroku container:release web --app topics-and-summary-web-front
```
