# Node.js Quiz

항해99 Node.js 주특기 시험입니다.

## 실행방법

``` shell
# yarn 패키지를 설치합니다.
$ yarn

# Prisma Client와 연결된 데이터베이스를 동기화합니다.
#  실행 전, .env 파일에 정의된 `DATABASE_URL`은 꼭 수정해주세요!
$ npx prisma db push

# nodemon을 이용해 프로젝트를 실행합니다.
#  만약 nodemon 실행이 되지 않을 경우 [$ node app.js ] 명령어로 실행해주세요.
$ yarn dev
```

## DB ERD

![노드 숙련 프로젝트 DB ERD](https://user-images.githubusercontent.com/49636918/210510061-1d9fd51e-e335-43cb-b96e-4ea1d8ae39f1.png)

## MySQL Create Table Query

``` sql
CREATE TABLE Users
(
    userId    INTEGER      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nickname  VARCHAR(191) NOT NULL UNIQUE,
    password  VARCHAR(191) NOT NULL,
    createdAt DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Posts
(
    postId    INTEGER       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UserId    INTEGER       NOT NULL,
    title     VARCHAR(191)  NOT NULL,
    content   VARCHAR(3000) NOT NULL,
    createdAt DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    FOREIGN KEY (UserId) REFERENCES Users (userId) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Comments
(
    commentId INTEGER      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    PostId    INTEGER      NOT NULL,
    UserId    INTEGER      NOT NULL,
    comment   VARCHAR(191) NOT NULL,
    createdAt DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    FOREIGN KEY (PostId) REFERENCES Posts (postId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users (userId) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Likes
(
    likeId    INTEGER     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    PostId    INTEGER     NOT NULL,
    UserId    INTEGER     NOT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    FOREIGN KEY (PostId) REFERENCES Posts (postId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users (userId) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
