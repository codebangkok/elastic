GET _analyze
{
  "text": ["มาม่าหมูสับบิ๊กแพค95G"],
  "analyzer": "thai"
}

GET _analyze
{
  "text": ["มาม่าหมูสับบิ๊กแพค95G"],
  "analyzer": "icu_analyzer"
}



PUT products1
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "thai"
      }
    }
  }
}

POST products1/_doc/1
{
  "name": "มาม่า"
}

POST products1/_doc/2
{
  "name": "มาม่าหมูสับ"
}

POST products1/_doc/3
{
  "name": "มาม่าหมูสับบิ๊กแพค95G"
}

GET products1/_search?q=name:มาม่า



PUT products2
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "icu_analyzer"
      }
    }
  }
}


POST products2/_doc/1
{
  "name": "มาม่า"
}

POST products2/_doc/2
{
  "name": "มาม่าหมูสับ"
}

POST products2/_doc/3
{
  "name": "มาม่าหมูสับบิ๊กแพค95G"
}

GET products2/_search?q=name:มาม่า



















