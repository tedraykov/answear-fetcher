export interface AnswearSimpleItem {
    id: string;
    slug: string;
}

export interface AnswearItem {
    id: string;
    price: number;
    priceRegular: number;
    name: string;
    sizes: AnswearSize[];
    allSizes: AnswearItem[];
}

interface AnswearSize {
    name: string;
    variation: {ean: string}
}
