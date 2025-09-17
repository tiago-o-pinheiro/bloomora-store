import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  categories: [
    {
      id: "3f2b6a1e-8c1a-4c8a-9f24-1a3f6b2d9d8a",
      name: "Uncategorized",
      slug: "uncategorized",
    },
    {
      id: "b6b2cfc8-3b7d-4f0e-b9cb-4f1c0a276f06",
      name: "Men's Shirts",
      slug: "mens-shirts",
    },
    {
      id: "c1e2d3f4-5a6b-4c8d-9e0f-1a2b3c4d5e6f",
      name: "Men's Sweatshirts",
      slug: "mens-sweatshirts",
    },
  ],

  users: [
    {
      email: "tiago@gmail.com",
      name: "Tiago",
      password: hashSync("tiagoo", 10),
      role: "ADMIN",
    },
    {
      email: "elgervalarga@example.com",
      name: "Elver Galarga",
      password: hashSync("1234", 10),
      role: "USER",
    },
    {
      email: "rosamel@example.com",
      name: "Rosa Melano",
      password: hashSync("1234", 10),
      role: "USER",
    },
  ],

  products: [
    {
      name: "Polo Sporting Stretch Shirt",
      slug: "polo-sporting-stretch-shirt",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/p1-1.jpg",
        "/images/sample-products/p1-2.jpg",
      ],
      price: 59.99,
      brand: "Polo",
      rating: 4.5,
      numReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: "banner-1.jpg",
      categoryIds: ["b6b2cfc8-3b7d-4f0e-b9cb-4f1c0a276f06"],
    },
    {
      name: "Brooks Brothers Long Sleeved Shirt",
      slug: "brooks-brothers-long-sleeved-shirt",
      description: "Timeless style and premium comfort",
      images: [
        "/images/sample-products/p2-1.jpg",
        "/images/sample-products/p2-2.jpg",
      ],
      price: 85.9,
      brand: "Brooks Brothers",
      rating: 4.2,
      numReviews: 8,
      stock: 10,
      isFeatured: true,
      banner: "banner-2.jpg",
      categoryIds: ["b6b2cfc8-3b7d-4f0e-b9cb-4f1c0a276f06"],
    },
    {
      name: "Tommy Hilfiger Classic Fit Dress Shirt",
      slug: "tommy-hilfiger-classic-fit-dress-shirt",
      description: "A perfect blend of sophistication and comfort",
      images: [
        "/images/sample-products/p3-1.jpg",
        "/images/sample-products/p3-2.jpg",
      ],
      price: 99.95,
      brand: "Tommy Hilfiger",
      rating: 4.9,
      numReviews: 3,
      stock: 0,
      isFeatured: false,
      banner: null,
      categoryIds: ["b6b2cfc8-3b7d-4f0e-b9cb-4f1c0a276f06"],
    },
    {
      name: "Calvin Klein Slim Fit Stretch Shirt",
      slug: "calvin-klein-slim-fit-stretch-shirt",
      description: "Streamlined design with flexible stretch fabric",
      images: [
        "/images/sample-products/p4-1.jpg",
        "/images/sample-products/p4-2.jpg",
      ],
      price: 39.95,
      brand: "Calvin Klein",
      rating: 3.6,
      numReviews: 5,
      stock: 10,
      isFeatured: false,
      banner: null,
      categoryIds: ["b6b2cfc8-3b7d-4f0e-b9cb-4f1c0a276f06"],
    },
    {
      name: "Polo Ralph Lauren Oxford Shirt",
      slug: "polo-ralph-lauren-oxford-shirt",
      description: "Iconic Polo design with refined oxford fabric",
      images: [
        "/images/sample-products/p5-1.jpg",
        "/images/sample-products/p5-2.jpg",
      ],
      price: 79.99,
      brand: "Polo",
      rating: 4.7,
      numReviews: 18,
      stock: 6,
      isFeatured: false,
      banner: null,
      categoryIds: ["b6b2cfc8-3b7d-4f0e-b9cb-4f1c0a276f06"],
    },
    {
      name: "Polo Classic Pink Hoodie",
      slug: "polo-classic-pink-hoodie",
      description: "Soft, stylish, and perfect for laid-back days",
      images: [
        "/images/sample-products/p6-1.jpg",
        "/images/sample-products/p6-2.jpg",
      ],
      price: 99.99,
      brand: "Polo",
      rating: 4.6,
      numReviews: 12,
      stock: 8,
      isFeatured: true,
      banner: null,
      categoryIds: ["c1e2d3f4-5a6b-4c8d-9e0f-1a2b3c4d5e6f"],
    },
  ],
};

export default sampleData;
