# Blog API Documentation

## Base URL

```
https://blogging-api-xi.vercel.app/blog
```

## Endpoints

### **1. Create a Blog**

**Endpoint:**

```
POST /create
```

**Description:** Creates a new blog entry with a title, content, hashtags, links, and an image.

**Request Type:** `multipart/form-data`

**Request Body:**

| Field   | Type            | Required | Description           |
| ------- | --------------- | -------- | --------------------- |
| title   | String          | Yes      | Title of the blog     |
| content | String          | Yes      | Content of the blog   |
| hashtag | String          | Yes      | List of hashtags      |
| links   | String          | Yes      | List of related links |
| img     | File            | Yes      | Image to be uploaded  |

**Example Request (Using cURL):**

```sh
curl -X POST "https://blogging-api-xi.vercel.app/blog/create" \
  -H "Content-Type: multipart/form-data" \
  -F "title=Sample Title" \
  -F "content=Sample Content" \
  -F "hashtag=tech" \
  -F "links=https://example.com" \
  -F "img=@path/to/image.jpg"
```

**Response:**

```json
{
  "message": "Blog added successfully",
  "blog": {
    "_id": "1234567890abcdef",
    "title": "Sample Title",
    "content": "Sample Content",
    "hashtag": "tech",
    "links": "https://example.com",
    "img": "https://cloudinary.com/sample-image-url"
  }
}
```

---

### **2. Get a Blog by ID**

**Endpoint:**

```
GET /:id
```

**Description:** Retrieves a single blog post using its ID.

**Request Parameters:**

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| id        | String | Yes      | ID of the blog post |

**Example Request:**

```
GET https://blogging-api-xi.vercel.app/blog/1234567890abcdef
```

**Response:**

```json
{
  "_id": "1234567890abcdef",
  "title": "Sample Title",
  "content": "Sample Content",
  "hashtag": "tech",
  "links": "https://example.com",
  "img": "https://cloudinary.com/sample-image-url"
}
```

---

### **3. Get All Blogs**

**Endpoint:**

```
GET /
```

**Description:** Fetches all blog posts.

**Example Request:**

```
GET https://blogging-api-xi.vercel.app/blog/
```

**Response:**

```json
[
  {
    "_id": "1234567890abcdef",
    "title": "Sample Title",
    "content": "Sample Content",
    "hashtag": "tech",
    "links": "https://example.com",
    "img": "https://cloudinary.com/sample-image-url"
  },
  {
    "_id": "abcdef1234567890",
    "title": "Another Blog",
    "content": "More content",
    "hashtag": "coding",
    "links": "https://example2.com",
    "img": "https://cloudinary.com/sample-image-url-2"
  }
]
```

---

### **4. Delete a Blog by ID**

**Endpoint:**

```
DELETE /:id
```

**Description:** Deletes a specific blog post using its ID.

**Request Parameters:**

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| id        | String | Yes      | ID of the blog post |

**Example Request:**

```
DELETE https://blogging-api-xi.vercel.app/blog/1234567890abcdef
```

**Response:**

```json
{
  "message": "Blog deleted successfully"
}
```

---

## **Notes**

- Ensure that `Content-Type` is set to `multipart/form-data` when uploading images.
- The image is stored using Cloudinary, and the returned URL is saved in the database.
- Error handling is in place for missing fields and incorrect data types.

**Happy Blogging! 🚀**

