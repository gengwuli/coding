# init .htpasswd
nginx=$(docker ps -aqf "name=coding_nginx_1")
docker cp ~/htpasswd $nginx:/etc/nginx

# migrate db
docker-compose run railsbackadmin rake db:migrate

# populate db
backadmin=$(docker ps -aqf "name=coding_railsbackadmin_1")
docker cp ~/db.txt $backadmin:/usr/src/app
docker cp ~/test.rb $backadmin:/usr/src/app
docker exec $backadmin rails runner test.rb

