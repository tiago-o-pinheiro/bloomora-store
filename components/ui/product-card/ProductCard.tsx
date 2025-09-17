"use client";

import { useState } from "react";
import { Product } from "@/lib/types/product.type";
import { Card, CardContent, CardHeader } from "../card";
import Link from "next/link";
import Image from "next/image";
import Price from "../price/Price";

const ProductCard = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState(true);

  if (!product) return null;

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-all">
      <CardHeader className="p-0 items-center relative">
        <Link href={`/product/${product.slug}`}>
          <Image
            className={`w-full object-cover object-center rounded-t-md transition-opacity duration-300 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            onLoad={() => setLoading(false)}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold">{product.name}</h3>
        </Link>
        <div className="flex-between gap-4">
          <p>{product.rating} ⭐</p>
          {product.stock > 0 ? (
            <Price value={product.price} />
          ) : (
            <p className="text-red-500">Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
