# API

## Comment

### Comment List

Get comment list for article

```http
GET /comment
```

**Parameters**:

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| path      | string | Article id for comment |
| page      | number | Comment page           |
| pageSize  | number | Comment list page size |

### Comment Count

Get comment count for article

```http
GET /comment?type=count
```

**Parameters**:

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| path      | string | Article id for comment |

### Recent Comment

Get recent comment

```http
GET /comment?type=recent
```

**Parameters**:

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| count     | number | comment count return |

### Submit comment

```http
POST /comment
```

**Parameters**:

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| comment   | string | comment content                     |
| link      | string | commentator site                    |
| mail      | string | commentator email                   |
| nick      | string | commentator nick                    |
| pid       | string | comment id which one replied        |
| rid       | string | root comment id which one ownerd    |
| ua        | string | commentator's user agent            |
| url       | string | Article id for comment              |
| at        | string | comment nick name which one replied |

## Reading statistics

### Get reading statistics

Get the number of readings corresponding to an article or multiple articles.

```http
GET /article
```

**Parameters**:
| Parameter | Type | Description |
| --------- | ------ | ------------------------------------------------------------------- |
| path | string | Article id for comment，multiple ids should be spliced with commas. |

### Update reading statistics

Update the reading count of an article.

```http
POST /article
```

**Parameters**:

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| path      | string | Article id for comment |
