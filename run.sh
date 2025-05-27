#!/bin/bash

cd server
flask run --port=9000 &
FLASK_PID=$!

cd ../client
PORT=8000 npm start &
NPM_PID=$!

# Define a cleanup function to kill background processes
cleanup() {
  echo "Caught SIGINT, stopping servers..."
  kill $FLASK_PID
  kill $NPM_PID
  exit 0
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT SIGTSTP

# Wait indefinitely until a signal is received
wait
