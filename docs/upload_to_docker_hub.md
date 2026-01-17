https://hub.docker.com/repositories/nordeim

$ docker ps 
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS                    PORTS                                         NAMES
548707bff4c5   cherry-app           "docker-php-entrypoi…"   25 minutes ago   Up 19 minutes (healthy)   3000/tcp, 9000/tcp                            morning_brew_app
dd76814d6a6a   redis:7.4-alpine     "docker-entrypoint.s…"   25 minutes ago   Up 25 minutes (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp   morning_brew_redis
514e1d4d4ea8   postgres:16-alpine   "docker-entrypoint.s…"   2 hours ago      Up 26 minutes (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   514e1d4d4ea8_morning_brew_db

$ docker login
$ docker ps 
$ docker tag cherry-app nordeim/morning_brew_app:v1.0
$ docker tag redis:7.4-alpine nordeim/morning_brew_redis:v1.0
$ docker tag postgres:16-alpine nordeim/morning_brew_db:v1.0
$ docker push nordeim/morning_brew_app:v1.0
$ docker push nordeim/morning_brew_redis:v1.0
$ docker push nordeim/morning_brew_db:v1.0

$ docker images
                                                                                                                                                                                                                        i Info →   U  In Use
IMAGE                             ID             DISK USAGE   CONTENT SIZE   EXTRA
cherry-app:latest                 41cff95b2007       1.89GB             0B    U   
cherry_app:latest                 9dc3ddfcb28a       1.89GB             0B        
nordeim/morning_brew_app:v1.0     41cff95b2007       1.89GB             0B    U   
nordeim/morning_brew_db:v1.0      b97fe41a0657        276MB             0B    U   
nordeim/morning_brew_redis:v1.0   13105d2858de       41.4MB             0B    U   
postgres:16-alpine                b97fe41a0657        276MB             0B    U   
redis:7.4-alpine                  13105d2858de       41.4MB             0B    U  
