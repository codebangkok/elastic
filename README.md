# Elastic Stack

#### Website
* Elastic https://www.elastic.co
* Elastic Docker https://docker.elastic.co
* Elastic GitHub https://github.com/elastic
* OpenSearch https://opensearch.org
* OpenSearch Docker https://hub.docker.com/u/opensearchproject
* Logstash Plugin - Patterns Core https://github.com/logstash-plugins/logstash-patterns-core

#### VS Code Extensions
* [Elasticsearch for VSCode](https://marketplace.visualstudio.com/items?itemName=ria.elastic)
* [VsCode NDJson](https://marketplace.visualstudio.com/items?itemName=adrieankhisbe.vscode-ndjson)
* [Logstash Configuration Syntax / Language Support](https://marketplace.visualstudio.com/items?itemName=RandomChance.logstash)


#### Java Setup
show all java version
```sh
/usr/libexec/java_home -V
```

config JAVA_HOME
```sh
export JAVA_HOME=$(/usr/libexec/java_home -v 16)
```

### Importing test data

## Importing data into local cluster
```sh
curl localhost:9200/products/_bulk -H "content-type:application/x-ndjson" --data-binary "@products.ndjson"
```

```sh
curl localhost:9200/recipes/_bulk -H "content-type:application/x-ndjson" --data-binary "@recipes.ndjson"
```

```sh
curl localhost:9200/orders/_bulk -H "content-type:application/x-ndjson" --data-binary "@orders.ndjson"
```