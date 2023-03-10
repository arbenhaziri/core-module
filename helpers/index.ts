import { ProductExample } from "core-module/utils/constants/images";
import { ENVIRONMENT } from "core-module/enums";
import properties from "core-module/properties";

export const imageUrl = (images: Array<any>) => {
  return images !== undefined ? `https://api.${ENVIRONMENT}.ecocare.center${images[0].url}` : ProductExample;
};

export const mainHostUrl = (postFix: string) => {
  return properties.MAIN_HOST + postFix;
};

export const checkForProductImages = (item: any) => {
  if (item) {
    return item.product_images ? item.product_images[0] : null;
  }
};
