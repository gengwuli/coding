# backup
db=$(docker ps -aqf "name=coding_db_1")
docker exec -it $db sh -c "pg_dump -U postgres -Fc postgres > /backup/$(date +%Y%m%d).dump"

# restore 
docker exec -it $db sh -c "pg_restore -d postgres -U postgres /backup/leet.dump"
