docker rmi $(docker images -q -f dangling=true)

# init .htpasswd
nginx=$(docker ps -aqf "name=coding_nginx_1")
docker cp ~/htpasswd $nginx:/etc/nginx

# migrate db
docker-compose run railsbackadmin rake db:migrate

# populate db
backadmin=$(docker ps -aqf "name=coding_railsbackadmin_1")
# docker cp ~/db.txt $backadmin:/usr/src/app
# docker cp ~/test.rb $backadmin:/usr/src/app
# docker exec $backadmin rails runner test.rb

# Add admin user
docker cp ~/seeds.rb $backadmin:/usr/src/app/db
docker exec $backadmin rails db:seed
# AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

postgres=$(docker ps -aqf "name=coding_db_1")

docker exec $postgres pg_restore -d postgres -U postgres /backup/leet.dump

