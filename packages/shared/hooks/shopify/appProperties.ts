export const appProperties = {
  BACKEND_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://shopify-product-favorite.herokuapp.com'
      : 'https://e976-2401-4900-1b1e-3cd8-f0af-c4a2-4d0d-926d.ngrok.io',
  favoriteFormFields: {
    storeUrl: 'Store URL',
  },
};
