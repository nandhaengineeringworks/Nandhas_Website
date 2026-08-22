export const PRODUCT_PLACEHOLDER = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';

export const getProductPrimaryImage = (product) => {
  if (product?.primaryImageUrl && !product.primaryImageUrl.startsWith('blob:')) {
    return product.primaryImageUrl;
  }
  const primaryImg = product?.images?.find(img => img.isPrimary === true);
  if (primaryImg?.imageUrl && !primaryImg.imageUrl.startsWith('blob:')) {
    return primaryImg.imageUrl;
  }
  const firstImg = product?.images?.[0];
  if (firstImg?.imageUrl && !firstImg.imageUrl.startsWith('blob:')) {
    return firstImg.imageUrl;
  }
  return PRODUCT_PLACEHOLDER;
};
