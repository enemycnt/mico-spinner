#!/usr/bin/env bash
echo "node samples/succeed.js"
sleep 1
node samples/succeed.js
sleep 3
echo "node samples/fail.js"
sleep 1
node samples/fail.js
sleep 3
echo "node samples/ci.js"
sleep 1
node samples/ci.js
sleep 3
