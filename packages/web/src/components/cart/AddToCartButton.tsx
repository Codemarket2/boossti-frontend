import { Button } from '@mui/material';
import { useAddToCart } from '@frontend/shared/hooks/cart/useAddToCart';
import React from 'react';

export default function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useAddToCart(productId, 1);
  return (
    <div>
      <Button onClick={addToCart}>Add to Cart</Button>
    </div>
  );
}
