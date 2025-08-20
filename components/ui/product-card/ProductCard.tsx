import { Product } from "@/lib/types/product.type";
import { Card, CardContent, CardHeader } from "../card";
import Link from "next/link";
import Image from "next/image";
import Price from "../price/Price";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
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
