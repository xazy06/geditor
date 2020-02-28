#!/usr/bin/env bash

# sudo rm -R *

# npm install pm2 -g && pm2 update

# git clone https://github.com/xazy06/geditor.git && cd geditor

# git checkout staging && git pull && npm install

# chmod +x ./deploy.sh

# sudo rm -R .git

sudo rm -R * && git clone https://github.com/xazy06/geditor.git && cd geditor && git checkout staging && git pull && npm install && sudo rm -R .git
