#!/bin/bash
npm run build
ssh spare  "cd dps-web; git pull; rm -rf build"
scp -r build spare:/home/ec2-user/dps-web
