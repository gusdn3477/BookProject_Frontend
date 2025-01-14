## 👩‍🏫PROJECT 소개

---

클라우드 네이티브 애플리케이션 개발자 교육 과정 안에서 진행한 프로젝트입니다.

교육 내에서 진행된 기술들을 바탕으로 주문, 장바구니 등의 간단한 서비스를 제공하는 온라인 서점을 웹 사이트를 만들어 보았습니다.

프론트엔드는 React.js, 백엔드는 Spring Boot를 활용하였고, MSA 방식으로 개발하였습니다. 

클라우드 환경으로 AWS의 EC2, RDS를 활용하였고, RDS 환경에서 mariadb를 사용하였습니다.

Docker 이미지를 만든 뒤 Docker hub에 push하였고, 이미지를 여러 EC2 인스턴스에서 내려받아 실행하는 방식으로 배포하였습니다.

🗓️ **작업기간** : 2021.09

👨‍💻 **투입인원** : 3명(전공자 2, 비전공자 1)

📒 **주요 기능** 

- user-service : 사용자에 관한 기능을 제공합니다. 회원 가입, 회원정보 수정, 회원 탈퇴 기능을 담당합니다. (로그인의 경우 jwt를 활용한 스프링 시큐리티를 사용했습니다.)
- catalog-service : 상품에 관한 기능을 제공합니다. 상품 등록, 수정, 삭제할 수 있으며, 작가 이름과 상품 이름으로 검색할 수 있습니다.
- order-service : 상품 주문을 하는 서비스입니다. 주문 시에 kafka를 사용하였고, catalog-service와의 통신을 통하여 주문 성공 시에 상품 수량이 줄어들게 돕니다.
- cart-service : 장바구니를 관리하는 서비스입니다. 상품을 장바구니에 담거나 삭제할 수 있습니다. 이 곳에서 구매하기 버튼을 클릭하여 구매하기 페이지로 갈 수 이동할 수 있습니다.

🌱 **기술 스택**

프론트엔드 : `React.js`  
백엔드 : `Spring Boot` `Spring Cloud Eureka` `JPA` `kafka` `rabbitmq` `AWS RDS(Mariadb)` `AWS EC2` `Docker`  
협업 툴 : `github` `freedcamp`  

<br/>

🌱 **구성도**

![image](https://user-images.githubusercontent.com/46596758/150811005-3e525214-4716-4d13-85d0-70ad29c22aa8.png)


### 사용법
- Frontend의 경우, npm install 후 사용해 주세요.
- 개발 완료 후, 레포지토리를 하나로 합쳤고, 그로 인하여 백엔드 부분의 커밋 내역이 보이지 않습니다. 아래에 기존의 백엔드 레포지토리 링크 첨부하겠습니다.
- https://github.com/momo0503/BookProjectBackEnd


