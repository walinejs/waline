# API

## 评论接口

### 评论列表

获取某篇文章对应的评论列表

```http
GET /comment
```

**参数**:

| 字段     | 类型   | 描述                       |
| -------- | ------ | -------------------------- |
| path     | string | 获取对应文章标识的评论列表 |
| page     | number | 评论列表的页数             |
| pageSize | number | 每页评论列表的条数         |

### 评论数

获取某篇文章对应的评论总数

```http
GET /comment?type=count
```

**参数**:

| 字段 | 类型   | 描述                       |
| ---- | ------ | -------------------------- |
| path | string | 获取对应文章标识的评论列表 |

### 最近评论

获取当前网站的最近评论

```http
GET /comment?type=recent
```

**参数**:

| 字段  | 类型   | 描述               |
| ----- | ------ | ------------------ |
| count | number | 返回最新评论的条数 |

### 发布评论

发布一条评论

```http
POST /comment
```

**参数**:

| 字段    | 类型   | 描述                         |
| ------- | ------ | ---------------------------- |
| comment | string | 评论内容                     |
| link    | string | 用户输入的网站               |
| mail    | string | 用户输入的邮箱               |
| nick    | string | 用户输入的昵称               |
| pid     | string | 该条评论回复的评论 objectId  |
| rid     | string | 该条评论的根评论 objectId    |
| ua      | string | 用户的 user agent            |
| url     | string | 评论的文章标识               |
| at      | string | 该条评论回复的评论的作者昵称 |
