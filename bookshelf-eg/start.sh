#!/bin/bash

CONTAINER_NAME=mysql-dev

mysql_command() {
  mysql -h 127.0.0.1 -u root -e "$@" &> /dev/null
}

# check for existing container; if none found, run one
existing_container=$(docker ps -qf name=${CONTAINER_NAME})
if [ -z "$existing_container" ]; then
  docker run -e MYSQL_ALLOW_EMPTY_PASSWORD=true --name=${CONTAINER_NAME} -p 3306:3306 -d mysql:latest &> /dev/null

fi

echo "✅ Container started."
echo "   To stop running container, type"
echo "       docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME}"

# Test for connection to mysql
attempt=0
connected=0
while [ $attempt -le 10 ]; do
  mysql_command 'select 1'
  if [ $? -ne 0 ]; then
    sleep 2
  else
    connected=1
    break
  fi

  attempt=$(( attempt + 1 ))
done

if [ $connected -ne 1 ]; then
  echo "❌ Failed to connect to MySQL container"
  exit 1
fi

echo "✅ Connection successful to MySQL container"

# Check if the dev user is available; if none, create one
mysql_command "CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password by 'bar'"
if [ $? -eq 0 ]; then
  echo "✅ Created user 'foo' with password 'bar'"
  mysql_command "GRANT PRIVILEGES ON *.* TO 'foo'@'%'"
  mysql_command "FLUSH PRIVILEGES"
fi

mysql_command "CREATE DATABASE test"

../node_modules/.bin/nodemon index.js