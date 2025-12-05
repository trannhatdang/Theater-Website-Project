Setup
---

Đầu tiên, clone repo về.

Sau đó, cho chạy các file sql trong folder server/DatabaseSQL.

Tải file env ở link sau:

```
https://drive.google.com/file/d/16s50Ol68H0ZGo4MISfP5Iznws7NdlquA/view?usp=sharing
```

Đổi tên file thành .env và đặt vào folder ./server. Sau đó vào file đổi DATABASE_URL thành format sau:

```
DATABASE_URL = "mysql://{tài khoản root mysql}:{mật khẩu root mysql}@localhost:3306/{tên database}"
```

Sau đó cho chạy lệnh:

```
npm i
```

Chạy dự án
---
Chạy dự án bằng cách gõ lệnh 

```
npm run dev
```

Server có đủ API (trừ trigger), giao diện employee còn thiếu patch, delete
