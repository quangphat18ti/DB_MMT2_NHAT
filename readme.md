## Database Server For Project2 - Crawl Data - Network
### Quy trình Request:
        1. Post các website mình crawl lên datbase.
        2. Post các product kèm theo tên của Category.
        Ở đây, nếu Category chưa được tạo thì nó sẽ được cho giá trị mặc định. Nếu muốn thì bạn vẫn có thể tạo nó
    Lưu ý: Vì chưa xử lý được việc so sánh tên nên chỉ nên up thử laptop lên trước

### Các Model và cách gọi API

Sẽ được trình bày theo trình tự sau:

- Tiêu đề: Chứa link API
- Request Mẫu
- Thông số cần truyền vào Request

Lưu ý: Cấu trúc lược đồ sẽ được trình bày ở cuối bài

### [Post Website](https://mmt-main-dbserver.vercel.app/api/website)

#### Mẫu request:

        POST https://mmt-main-dbserver.vercel.app/api/website
        Content-Type: application/json

        {
            "Domain": "fptshop.com.vn",
            "Icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GEt9Uh2dAhwcz8tsqDZXnPmtg2BhHbiA1vcB-bn85w&s"
        }

#### Thông số

- Phương thức: **POST**
- API: https://mmt-main-dbserver.vercel.app/api/website
- Các tham số cần truyền:
  - **Domain**: Domain của website. Đây là bắt buộc.
  - **Icon**: Link iconc của website. Đây không bắt buộc nhưng mà nên có. Để tránh bị khởi tạo mặc định

### [Post Category](https://mmt-main-dbserver.vercel.app/api/category)

#### Mẫu request:

        POST  https://mmt-main-dbserver.vercel.app/api/category
        Content-Type: application/json

        {
            "Name" : "Asus TUF Gaming FX506LHB HN188W - Intel Core I5 10300H | 8GB | .....",
            "Type": : "Laptop",
            "Desc": "Màn hình: 15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare LED-backlit\nCPU: Intel, Core i5, 10300H\nRAM: 8 GB (1 thanh 8 GB), DDR4, 2933 MHz"
        }

#### Thông số

- Phương thức: **POST**
- API: https://mmt-main-dbserver.vercel.app/api/category
- Các tham số cần truyền:
  - **Name**: Tên của Category. Đây là bắt buộc.
  - **Type**: Đây là loại của Category: Laptop, chuột, ram, ...
    - Nếu **Type** có sẵn trong tên thì không thêm trường này vào vẫn được
  - **Desc**: Ta có thể khởi tạo Description trước cho Category này. Hoặc cũng có thể bỏ trống. Nếu bỏ trống thì nó sẽ tìm tới thằng nào có Desc và copy nó qua.

### [Post Product](https://mmt-main-dbserver.vercel.app/api/product)

#### Mẫu request:

        POST https://mmt-main-dbserver.vercel.app/api/product
        Content-Type: application/json

        {
            "Url": "https://fptshop.com.vn/may-tinh-xach-tay/asus-tuf-gaming-fx506lhb-hn188w-i5-10300h",
            "Name": "Laptop Asus TUF Gaming FX506LHB-HN188W i5 10300H/8GB/512GB/15.6FHD/GeForce GTX 1650 4GB/Win11",
            "Price": 15990000,
            "OriginalPrice": 2099000,
            "NameCategory": "Laptop Asus TUF Gaming FX506LHB HN188W",
            "Imgs": ["https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/Uploads/images/2015/0511/ASUS-TUF-Gaming-F15-2021-black-fpt-3.jpg","https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/Uploads/images/2015/0511/ASUS-TUF-Gaming-F15-2021-black-fpt-1.jpg"]
        }

#### Thông số

- Phương thức: **POST**
- API: https://mmt-main-dbserver.vercel.app/api/product
- Các tham số cần truyền:
  - **Url**: Link của sản phẩm
  - **Name**: Tên của sản phẩm. Đây là trường bổ sung thôi, không có cũng được.
  - **Price**: Giá chính của sản phẩm - Đây là trường bắt buộc.
  - **OriginalPrice**: Giá trước giảm - Đây là trường bổ sung.
  - **NameCategory**: Tên của Category nó thuộc về. Đây là trường bắt buộc
  - **Imgs**: Đây là trường mảng các xâu link ảnh của sản phẩm. Định dạng, kiểu JSON.
  - **Desc**: Đây là trường bổ sung. Nhưng nếu có thông tin trong trường này thì nó sẽ được lấy để thêm vào Category.

### Lược đồ

#### Website

    1. Domain: String, require, unique
    2. Icon: String, Default
    3. LastModify: Default = Date.now --> Không cần truyền

#### Category

    1. Type: String, Default = "Laptop"
    2. Name: String, require, unique
    3. Price: Number
    4. Imgs: Mảng các String
    5. Desc: String

#### Product

    1. Url: String, require, unique
    2. Name: String
    4. Price: Number, require
    5. OriginalPrice: Number
    6. Imgs: Array[String]
    7. WebsiteID --> Không cần truyền mà cần tạo Website trước
    8. CategoryID --> Không cần truyền "nên" tạo Category trước. Nếu không có thì nó sẽ tự tạo.

### [Delete Product](https://mmt-main-dbserver.vercel.app/api/product)

#### Request: https://mmt-main-dbserver.vercel.app/api/product_id

#### Mẫu request:

`DELETE https://mmt-main-dbserver.vercel.app/api/product/644b344f9ed275fa7faec454`

### [Delete Category](https://mmt-main-dbserver.vercel.app/api/category)

### Request: https://mmt-main-dbserver.vercel.app/api/category/category_id

### Mẫu request:

`DELETE https://mmt-main-dbserver.vercel.app/api/category/644b344f9ed275fa7faec454`
