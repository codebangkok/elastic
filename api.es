#Source filtering
GET recipes/_search
{
  "query": {
    "match": {
      "title": "pasta"      
    }
  },
  "_source": ["title", "created", "ingredients.*"]
}

GET recipes/_search
{
  "query": {
    "match": {
      "title": "pasta"
    }
  },
  "_source": {
    "excludes": ["description", "steps"]
  }
}

#result size, offset, pagination
#totalPages = ceil(total_hits / page_size)
#from = page_size * (page_number - 1)
GET products/_search
{
  "from": 2,
  "size": 2,
  "_source": false
}

#sorting
GET recipes/_search
{
  "_source": ["preparation_time_minutes", "created"],
  "sort": [
    { "preparation_time_minutes": "desc" },
    { "created": "asc" }
  ]
}

GET recipes/_search
{
  "_source": ["ratings"],
  "sort": [
    {
      "ratings": {
        "order": "desc",
        "mode": "avg"
      }
    }
  ]
}


#Query String
GET products/_search?q=name:Pasta

GET products/_search
{
  "query": {
    "match": {
      "name": "Pasta"
    }
  }
}

GET products/_search
{
  "query": {
    "query_string": {
      "default_field": "name",
      "query": "Pasta"
    }
  }
}

GET products/_search
{
  "query": {
    "query_string": {
      "query": "name:Pasta"
    }
  }
}

GET products/_search?q=*

GET products/_search?q=name:Lobster

GET products/_search?q=tags:Meat AND name:Tuna

#Understand relevance scores
GET products/_search
{
  "query": {
    "term": {
      "name": {
        "value": "lobster",
        "boost": 1
      }
    }
  },
  "explain": true
}

POST bond/_bulk
{"index":{}}
{"name": "Bond"}
{"index":{}}
{"name": "Bond Bond"}
{"index":{}}
{"name": "Hello Bond"}
{"index":{}}
{"name": "Hello Hello Bond"}
{"index":{}}
{"name": "Yod"}
{"index":{}}
{"name": "Hello Yod"}
{"index":{}}
{"name": "Hello Hello Hello Yod"}
{"index":{}}
{"name": "Joke"}
{"index":{}}
{"name": "Ham"}

GET bond/_search
{
  "query": {
    "match": {
      "name": "hello"
    }
  },
  "explain": true
}

#Term Level Quries
GET products/_search
{
  "query": {
    "term": {
      "is_active": {
        "value": true
      }
    }
  }
}

#Keyword
GET products/_search
{
  "query": {
    "term": {
      "name.keyword": {
        "value": "Pasta - Canelloni"
      }
    }
  }
}

#Searching for multiple terms
GET products/_search
{
  "query": {
    "terms": {
      "tags.keyword": [
        "Soup",
        "Cake"
      ]
    }
  }
}

#Seraching based on IDs
GET products/_search
{
  "query": {
    "ids": {
      "values": [1,2,3]
    }
  }
}

#Searching range values
GET products/_search
{
  "query": {
    "range": {
      "in_stock": {
        "gte": 1,
        "lte": 5
      }
    }
  }
}

#Searchiung with dates
GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2010/01/01",
        "lte": "2010/12/31"
      }
    }
  }
}

GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "1/1/2010",
        "lte": "31/12/2010",
        "format": "d/M/yyyy"
      }
    }
  }
}

GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "2017/01/01||-1M/d"
      }
    }
  },
  "size": 20
}

GET products/_search
{
  "query": {
    "range": {
      "created": {
        "gte": "now/M-4y"
      }
    }
  },
  "size": 20
}

#Searching with non-null 
GET products/_search

GET products/_search
{
  "query": {
    "exists": {
      "field": "tags"
    }
  }
}

GET products/_search
{
  "query": {
    "bool": {
      "must_not": {
        "exists": {
          "field": "tags"
        }
      }
    }
  }
}

POST bondanalyze/_doc
{
  "eng": "Hello World"
}

GET bondanalyze/_search
{
  "query": {
    "exists": {
      "field": "thai"
    }
  }
}

GET bondanalyze/_search
{
  "query": {
    "bool": {
      "must_not": [
        {
          "exists": {
            "field": "thai"
          }
        }
      ]
    }
  }
}

#Searching with prefix
GET products/_search
{
  "query": {
    "prefix": {
      "tags.keyword": "Vege"
    }
  }
}

#Searching with wildcard
GET products/_search
{
  "query": {
    "wildcard": {
      "tags.keyword": "*table"
    }
  }
}

GET products/_search
{
  "query": {
    "wildcard": {
      "tags.keyword": "Veg?table"
    }
  }
}

#Search with regular expression
GET products/_search
{
  "query": {
    "regexp": {
      "tags.keyword": "Veg[a-zA-Z]+table"
    }
  }
}

#Full text query
GET recipes/_search
{
  "query": {
    "match": {
      "title": "Recipes with pasta or spaghetti"
    }
  }
}

GET recipes/_search
{
  "query": {
    "match": {
      "title": {
        "query": "pasta or spaghetti",
        "operator": "and"
      }
    }
  }
}

#Matching phrases
GET recipes/_search
{
  "query": {
    "match_phrase": {
      "title": "spaghetti puttanesca pasta or spaghetti"
    }
  }
}

#Multi-match query
GET recipes/_search
{
  "query": {
    "multi_match": {
      "query": "pasta",
      "fields": ["title", "description"]
    }
  }
}

#Bool query
#https://www.elastic.co/guide/en/elasticsearch/reference/2.3/query-dsl-bool-query.html

GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "Dry pasta"
          }
        }
      ]
    }
  }
}

GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "Dry pasta"
          }
        },
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 20
            }
          }
        }
      ]
    }
  }
}

GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "pasta"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 20
            }
          }
        }
      ]
    }
  }
}

GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "pasta"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "ingredients.name": "cheese"
          }
        }
      ], 
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 20
            }
          }
        }
      ]
    }
  }
}

GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": "pasta"
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "ingredients.name": "cheese"
          }
        }
      ], 
      "should": [
        {
          "match": {
            "ingredients.name": "shallot"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 20
            }
          }
        }
      ]
    }
  }
}

GET recipes/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "ingredients.name": "shallot"
          }
        }
      ]
    }
  }
}

#name query
GET recipes/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "ingredients.name": {
              "query": "pasta",
              "_name": "pasta_must"
            }
          }
        }
      ],
      "must_not": [
        {
          "match": {
            "ingredients.name": {
              "query": "cheese",
              "_name": "cheese_must_not"
            }
          }
        }
      ], 
      "should": [
        {
          "match": {
            "ingredients.name": {
              "query": "shallot",
              "_name": "shallot_should"
            }
          }
        }
      ],
      "filter": [
        {
          "range": {
            "preparation_time_minutes": {
              "lte": 20
            }
          }
        }
      ]
    }
  }
}

#Metrics aggregations
#https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics.html
GET orders/_mapping

GET orders/_search

GET orders/_search
{
  "size": 0,
  "aggs": {
    "total_sales": {
      "sum": {
        "field": "total_amount"
      }
    },
    "avg_sale": {
      "avg": {
        "field": "total_amount"
      }
    },
    "min_sale": {
      "min": {
        "field": "total_amount"
      }
    },
    "max_sale": {
      "max": {
        "field": "total_amount"
      }
    },
    "value_count": {
      "value_count": {
        "field": "salesman.id"
      }
    },
    "total_salesman": {
      "cardinality": {
        "field": "salesman.id"
      }
    },
    "amount_stats": {
      "stats": {
        "field": "total_amount"
      }
    }
  }
}

GET orders/_search
{
  "_source": ["salesman.id"]
}

#Bucket aggregations //Group by
#https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket.html

GET orders/_search

GET orders/_search
{
  "size": 0,
  "aggs": {
    "status_terms": {
      "terms": {
        "field": "status.keyword",
        "size": 10
      }
    }
  }
}

GET orders/_search
{
  "size": 0,
  "aggs": {
    "status_terms": {
      "terms": {
        "field": "status.keyword",
        "missing": "N/A",
        "min_doc_count": 0,
        "order": {
          "_key": "asc"
        }
      }
    }
  }
}

#Nested aggregations
GET orders/_search
{
  "size": 0,
  "query": {
    "range": {
      "total_amount": {
        "gte": 100
      }
    }
  }, 
  "aggs": {
    "status_terms": {
      "terms": {
        "field": "status.keyword",
        "size": 10
      },
      "aggs": {
        "status_stats": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    },
    "all_orders": {
      "global": {},
      "aggs": {
        "stats_amount": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

#Filtering out documents
GET orders/_search
{
  "size": 0,
  "aggs": {
    "low_value": {
      "filter": {
        "range": {
          "total_amount": {
            "lte": 50
          }
        }
      },
      "aggs": {
        "avg_amount": {
          "avg": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

#Defining bucket rules with filters
GET recipes/_search

GET recipes/_search
{
  "size": 0,
  "aggs": {
    "my_filter": {
      "filters": {
        "filters": {
          "pasta": {
            "match": {
              "title": "pasta"
            }
          },
          "spaghetti": {
            "match": {
              "title": "spaghetti"
            }
          }
        }
      },
      "aggs": {
        "avg_rating": {
          "avg": {
            "field": "ratings"
          }
        }
      }
    }
  }
}

#Range aggregations
GET orders/_search
{
  "_source": ["total_amount"],
  "sort": [
    {
      "total_amount": {
        "order": "asc"
      }
    }
  ]
}

GET orders/_search
{
  "size": 0,
  "aggs": {
    "amount_distribution": {
      "range": {
        "field": "total_amount",
        "ranges": [
          {
            "to": 50
          },
          {
            "from": 50,
            "to": 100
          },
          {
            "from": 11.01
          }
        ]
      },
      "aggs": {
        "stats": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

GET orders/_search
{
  "size": 0,
  "aggs": {
    "purchase_ranges": {
      "date_range": {
        "field": "purchased_at",
        "format": "yyyy-MM-dd", 
        "keyed": true, 
        "ranges": [
          {
            "from": "2016-01-01",
            "to": "2016-01-01||+6M",
            "key": "first_half"
          },
          {
            "from": "2016-01-01||+6M",
            "to": "2016-01-01||+1y",
            "key": "second_half"
          }
        ]
      },
      "aggs": {
        "stats": {
          "stats": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

#Histograms
GET orders/_search

GET orders/_search
{
  "size": 0,
  "aggs": {
    "amount_distribution": {
      "histogram": {
        "field": "total_amount",
        "interval": 25,
        "min_doc_count": 1
      }
    }
  }
}

GET orders/_search
{
  "size": 0,
  "query": {
    "range": {
      "total_amount": {
        "gte": 100
      }
    }
  }, 
  "aggs": {
    "amount_distribution": {
      "histogram": {
        "field": "total_amount",
        "interval": 25,
        "min_doc_count": 0,
        "extended_bounds": {
          "min": 0,
          "max": 500
        }
      }
    }
  }
}

GET orders/_search
{
  "size": 0,
  "aggs": {
    "order_over_time": {
      "date_histogram": {
        "field": "purchased_at",
        "calendar_interval": "month"
      }
    }
  }
}

#missing field value
GET orders/_search

POST orders/_doc/1001
{
  "total_amount": 100
}

POST orders/_doc/1002
{
  "total_amount": 200,
  "status": null
}

GET orders/_search
{
  "size": 0,
  "aggs": {
    "orders_without_status": {
      "missing": {
        "field": "status.keyword"
      },
      "aggs": {
        "missing_sum": {
          "sum": {
            "field": "total_amount"
          }
        }
      }
    }
  }
}

DELETE orders/_doc/1001

DELETE orders/_doc/1002