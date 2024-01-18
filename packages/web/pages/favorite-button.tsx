import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function FavoriteButton() {
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);
  const { query = {} } = router;

  return (
    <div className="d-flex justify-content-center">
      <Button
        variant="contained"
        onClick={() => {
          setFavorite(!favorite);
          // eslint-disable-next-line no-console
          console.log({
            productId: query?.productId,
            customerId: query?.customerId,
            shop: query?.shop,
          });
        }}
        size="large"
        style={{
          fontSize: Number(query?.fontSize),
          backgroundColor: `${query?.backgroundColor}`,
          color: `${query?.color}`,
        }}
      >
        {favorite ? 'Added' : 'Add'} to favorite
      </Button>
    </div>
  );
}
