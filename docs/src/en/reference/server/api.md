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

| Parameter | Type   | Description                                                                                                                                                          |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path      | string | Article id for comment                                                                                                                                               |
| page      | number | Comment page                                                                                                                                                         |
| pageSize  | number | Comment list page size                                                                                                                                               |
| sortBy    | string | Which sort type for comment list, default descending sort by create time, also you can ascending sort by create_time, or descending thread popularity (`like_desc`). |

`like_desc` ranks an entire thread by **root likes + public reply count + public reply likes**. Nested replies count toward their root. Waiting/spam replies and replies from another page do not contribute, including when the viewer can see them. Pinned comments remain first; equal scores use the comment ID as a descending tie-breaker. The returned `like` value still means likes on that individual comment.

Scores are computed at query time, before pagination, so existing comments and subsequent likes, moderation, deletion and imports need no backfill. SQL, MongoDB and CloudBase perform the ranking in the database. GitHub storage already loads its CSV in memory. The legacy LeanCloud adapter reads ranking metadata for the page and sorts it in memory before fetching the selected comments; its memory and query cost grow with the page's comment count.

For existing SQL databases, add an index on `(rid, url, status)` to avoid scanning all comments for every root. The bundled SQL schemas include it for new installations. For example (adjust the table name/prefix to your deployment):

```sql
CREATE INDEX idx_comment_rid_url_status ON wl_Comment (rid, url, status);
```

For MongoDB/CloudBase, create the corresponding compound index on `rid`, `url` and `status`.

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
