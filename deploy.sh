#!/bin/bash

ssh HOST '/home/ieeeuhm/webapps/ieee_api/bin/stop'
rsync -avz --exclude node_modules * HOST:/home/ieeeuhm/webapps/ieee_api/
ssh HOST 'bash /home/ieeeuhm/webapps/ieee_api/update_npm'
ssh HOST '/home/ieeeuhm/webapps/ieee_api/bin/start'


