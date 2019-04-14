#!/bin/sh

# copy this into a file
# (I suggest naming it some-audio.sh),
# chmod a+x some-audio.sh
# (or the filename you chose),
# and put it in your $PATH

echo 'Path to file:'
read filename

echo 'Title (optional):'
read title

echo 'Artist (optional):'
read artist

echo 'Description (optional):'
read description

curl \
  -F "title=$title" \
  -F "artist=$artist" \
  -F "description=$description" \
  -F "file=@$filename" \
  -H 'User-Agent: some-audio-shell-client' \
  https://some.audio/upload
