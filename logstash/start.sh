docker container run -it --rm \
--volume="${PWD}/data:/usr/share/logstash/data" \
--volume="${PWD}/config/logstash.yml:/usr/share/logstash/config/logstash.yml" \
--volume="${PWD}/config/pipelines.yml:/usr/share/logstash/config/pipelines.yml" \
--volume="${PWD}/pipeline:/usr/share/logstash/pipeline" \
--volume="${PWD}/input:/usr/share/logstash/input" \
--volume="${PWD}/output:/usr/share/logstash/output" \
--env="config.reload.automatic=true" \
--publish="8080:8080" \
--publish="8081:8081" \
docker.elastic.co/logstash/logstash:7.14.0

#--volume="${PWD}/logstash.conf:/usr/share/logstash/pipeline/logstash.conf" \