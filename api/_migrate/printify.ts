import axios from 'axios';

interface PrintifyProductsResponseImages {
    src: string;
    variant_ids: number[];
    is_default: boolean;
}

interface PrintifyProductsResponseVariants {
    id: number;
    title: string;
    price: number;
    is_enabled: boolean;
}

interface PrintifyProductsResponse {
    id: string;
    title: string;
    description: string;
    images: PrintifyProductsResponseImages[];
    variants: PrintifyProductsResponseVariants[];
}

interface PrintifyProductMetadata {
    case: string;
    image: string;
    tags: string[];
}

const getPrintifyProducts = async (): Promise<PrintifyProductsResponse[]> => {
    const response = await axios.get(
        `https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json?limit=100`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PRINTIFY_TOKEN}`,
            },
        },
    );

    return <PrintifyProductsResponse[]>response.data.data;
};

export { getPrintifyProducts, PrintifyProductMetadata };
