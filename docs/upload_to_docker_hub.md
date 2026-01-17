$ docker ps
CONTAINER ID   IMAGE                    COMMAND                  CREATED             STATUS                       PORTS                                                                                                NAMES
d5699f804b66   nginx:1.29-alpine        "/docker-entrypoint.…"   6 minutes ago       Up 3 minutes                 0.0.0.0:8080->80/tcp, [::]:8080->80/tcp, 0.0.0.0:8443->443/tcp, [::]:8443->443/tcp                   morning_brew_nginx
b8e21efe1bee   axllent/mailpit:latest   "/mailpit"               6 minutes ago       Up 5 minutes (healthy)       0.0.0.0:1025->1025/tcp, [::]:1025->1025/tcp, 0.0.0.0:8025->8025/tcp, [::]:8025->8025/tcp, 1110/tcp   morning_brew_mailpit
548707bff4c5   cherry-app               "docker-php-entrypoi…"   About an hour ago   Up About an hour (healthy)   3000/tcp, 9000/tcp                                                                                   morning_brew_app
dd76814d6a6a   redis:7.4-alpine         "docker-entrypoint.s…"   About an hour ago   Up About an hour (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp                                                          morning_brew_redis
514e1d4d4ea8   postgres:16-alpine       "docker-entrypoint.s…"   2 hours ago         Up About an hour (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp                                                          514e1d4d4ea8_morning_brew_db

$ docker login
$ docker ps 
$ docker tag cherry-app nordeim/morning_brew_app:v1.0
$ docker tag redis:7.4-alpine nordeim/morning_brew_redis:v1.0
$ docker tag postgres:16-alpine nordeim/morning_brew_db:v1.0
$ docker tag nginx:1.29-alpine nordeim/morning_brew_nginx:v1.0
$ docker tag axllent/mailpit:latest nordeim/morning_brew_mailpit:v1.0

$ docker push nordeim/morning_brew_app:v1.0
$ docker push nordeim/morning_brew_redis:v1.0
$ docker push nordeim/morning_brew_db:v1.0
$ docker push nordeim/morning_brew_nginx:v1.0
$ docker push nordeim/morning_brew_mailpit:v1.0

$ docker images
                                                                                                                                                                                                                        i Info →   U  In Use
IMAGE                               ID             DISK USAGE   CONTENT SIZE   EXTRA
axllent/mailpit:latest              c526a1dc54a1       34.9MB             0B    U   
cherry-app:latest                   41cff95b2007       1.89GB             0B    U   
cherry_app:latest                   9dc3ddfcb28a       1.89GB             0B        
nginx:1.29-alpine                   004f022f4ef5       61.9MB             0B    U   
nordeim/morning_brew_app:v1.0       41cff95b2007       1.89GB             0B    U   
nordeim/morning_brew_db:v1.0        b97fe41a0657        276MB             0B    U   
nordeim/morning_brew_mailpit:v1.0   c526a1dc54a1       34.9MB             0B    U   
nordeim/morning_brew_nginx:v1.0     004f022f4ef5       61.9MB             0B    U   
nordeim/morning_brew_redis:v1.0     13105d2858de       41.4MB             0B    U   
postgres:16-alpine                  b97fe41a0657        276MB             0B    U   
redis:7.4-alpine                    13105d2858de       41.4MB             0B    U   

