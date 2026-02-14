---
title: API
icon: api
---

## Comment

### Comment List

Get comment list for article

```http
GET /api/comment
```

**Parameters**:

| Parameter | Type   | Description                                                                                                                                               |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | Article id for comment                                                                                                                                    |
| page      | number | Comment page                                                                                                                                              |
| pageSize  | number | Comment list page size                                                                                                                                    |
| sortBy    | string | Which sort type for comment list, default descending sort by create time, also you can ascending sort by create_time, or descending sort by comment like. |

### Comment Count

Get comment count for article

```http
GET /api/comment?type=count
```

**Parameters**:

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| url       | string | Article id for comment, return site comment count if it empty |

### Recent Comment

Get recent comment

```http
GET /api/comment?type=recent
```

**Parameters**:

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| count     | number | comment count return |

### Submit comment

```http
POST /api/comment
```

**Parameters**:

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| comment   | string | comment content                     |
| link      | string | commentator site                    |
| mail      | string | commentator email                   |
| nick      | string | commentator nick                    |
| pid       | string | comment id which one replied        |
| rid       | string | root comment id which one owned     |
| ua        | string | commentator's user agent            |
| url       | string | Article id for comment              |
| at        | string | comment nick name which one replied |

## Reading statistics

### Get reading statistics

Get the number of readings corresponding to an article or multiple articles.

```http
GET /api/article
```

**Parameters**:

| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| path      | string | Article id for comment，multiple ids should be spliced with commas. |

### Update reading statistics

Update the reading count of an article.

```http
POST /api/article
```

**Parameters**:

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| path      | string | Article id for comment |
