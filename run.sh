#!/bin/bash

cd client
PORT=8000 npm start &
NPM_PID=$!

cd ../server
flask run --port=9000 &
FLASK_PID=$!


# Define a cleanup function to kill background processes
cleanup() {
  echo "Caught signal, stopping servers..."
  kill -TERM $FLASK_PID $NPM_PID 2>/dev/null
  wait $FLASK_PID $NPM_PID
  echo "ALL PROCESSES ENDED"
  exit 0
}


# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT SIGTSTP

# Wait indefinitely until a signal is received
wait