export interface AnswearSimpleItem {
    id: string;
    slug: string;
}

interface AnswearBrand {
    name: string;
    logo: string;
}

export interface AnswearItem {
    id: string;
    price: number;
    priceRegular: number;
    name: string;
    description: string;
    fullDescription: string;
    sex: string;
    productBrand: AnswearBrand;
    sizes: AnswearSize[];
    allSizes: AnswearSize[];
    category: { name: string }[];
    colorversions: { color: { name: string }, hex: string }[];
    productImages: { orderedImages: { name: string, version: string }[] }
}

interface AnswearSize {
    name: string;
    variation: { ean: string, quantity: number }
}
