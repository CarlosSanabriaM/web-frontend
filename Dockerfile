###################################################################################################################
# Docker file based on the following post https://mherman.org/blog/dockerizing-an-angular-app/ of Michael Herman. #
###################################################################################################################

# This Dockerfile uses Multistage build (https://docs.docker.com/develop/develop-images/multistage-build/)
# to create a temporary image used for building the artifact that is then copied over to the production image.


# To build the image execute:
#  $ docker build . -t web_frontend:latest

# To create a container that directly runs the frontend execute:
#  $ docker run --name web_frontend -p <host-port>:8080 -e PORT=8080 -i -t web_frontend:latest
# where <host-port> is the port where the frontend will be mapped in the host.

# To create a container and enter inside it execute:
#  $ docker run --name web_frontend -p <host-port>:8080 -e PORT=8080 -i -t web_frontend:latest /bin/bash
# <host-port> is the port where the frontend will be mapped in the host.

#############
### BUILD ###
#############

# Base image
FROM node:10.15.1 as build

# Install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# Set working directory
WORKDIR /app
# WORKDIR sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.
# If the WORKDIR doesn’t exist, it will be created even if it’s not used in any subsequent Dockerfile instruction.

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# Add app
COPY . /app

# TODO: Uncomment if the tests are fixed/implemented
# Run tests
# Unit tests
#RUN ng test --watch=false
# End to end tests
#RUN ng e2e --port 4202

# Generate build
RUN ng build --output-path=dist

##################
### PRODUCTION ###
##################

# Base image
FROM nginx:1.16.0-alpine

# Copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port $PORT of the container.
# Expose is NOT supported by Heroku and will be ignored there.
EXPOSE $PORT
# The EXPOSE instruction does not actually publish the port.
# It functions as a type of documentation between the person who builds the image
# and the person who runs the container, about which ports are intended to be published.

# Run the image as a non-root user. Heroku uses a non-root user to run the image, but doesn't
# use the user created here. This is only done for testing if the build is done correctly locally.
# Create the user myuser and his home directory with permissions over it
RUN adduser -S myuser -D
# In Alpine, the command useradd doesn't exist. Here adduser is used instead.

# In Heroku, all files/directories in the file system are owned by a non-root user,
# except /dev, /proc and /sys, that are owned by root.
# To simulate the same, we will change the owner of the following directories to be myuser.
RUN chown -R myuser /usr/share/nginx/html /var/cache/nginx/ /etc/nginx

# Copy the nginx.conf with the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Modify /etc/nginx/nginx.conf
    # Remove the user line because nginx will be executed by an unprivilaged user
RUN sed -i -e '/user/!b' -e '/nginx/!b' -e '/nginx/d' /etc/nginx/nginx.conf && \
    # Change the nginx.pid path
    sed -i 's!/var/run/nginx.pid!/tmp/nginx.pid!g' /etc/nginx/nginx.conf

# Login as non-root user to execute the app
USER myuser

# The CMD command can be overwritten when using 'docker run ...'
# If no command is specified when running the container, the container will
# start the frontend server and it will be accesible via the <host-port> port of the host specified in docker run.

# TODO: Modify to use the environment.prod.ts file
# run nginx
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
# Replace the string $PORT in the nginx.conf file with the environmental variable PORT
# For Docker containers, the daemon off; directive tells Nginx to stay in the foreground.
# For containers this is useful as best practice is for one container = one process. One server (container) has only one service.

# To specify a different command that will be executed when the container runs, execute:
# $ docker run --name web_frontend -p <host-port>:8080 -e PORT=8080 -i -t web_frontend:latest <command-to-be-executed>
# where <command-to-be-executed> is the command to be executed.
