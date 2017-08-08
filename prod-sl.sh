#!/bin/bash
npm run build
ssh -i ~/Spare.pem ec2-user@52.15.211.148  "cd dps-web; git pull; rm -rf build"
scp -i ~/Spare.pem -r build ec2-user@52.15.211.148:/home/ec2-user/dps-web
