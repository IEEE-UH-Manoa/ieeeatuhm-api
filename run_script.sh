# run_script.sh
# A small example run script; remember to populate these environment variables!
# 
# You *should* copy run_script.sh to run_script (it's set to ignore in the
# .gitignore file), and then do a `source run_script` to run it.
#
IEEE_MONGO_URL="mongodb://ieee:password@something.mongolab.com:49171/database" \
IEEE_TRELLO_KEY=WHOOO_TRELLO_KEY \
node server.js
