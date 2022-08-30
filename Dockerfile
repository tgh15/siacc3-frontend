# => Build container
FROM node:14 as builder

#ENV NODE_OPTIONS="--max-old-space-size=4096 --openssl-legacy-provider"

WORKDIR /app
RUN yarn
COPY . .

#delete package json
RUN rm -rf /app/package-lock.json
RUN rm -rf /app/node_modules
RUN npm cache clear --force


RUN yarn install
RUN yarn build


# => Run container
FROM nginx:latest

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY deploy /etc/nginx

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
#COPY .env .

# Add bash
#RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
