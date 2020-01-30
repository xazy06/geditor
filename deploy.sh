#!/bin/bash

npm install pm2 -g && pm2 update

git clone https://github.com/xazy06/geditor.git && git checkout test && git pull

npm install

sudo rm -R .git

