export interface Size {
    value: string;
    sizeCategory: string;
}

export interface Item {
    name: string;
    price: number;
    discountedPrice: number;
    description: string;
    fullDescription: string;
    brand: Brand;
    category: ItemCategory;
    color: Color;
    images: Image[]; //Links to images
    itemVarieties: ItemVariety[]; //size & quantity of this size
}

export interface ItemVariety {
    quantity: number;
    ean: string;
    size: Size;
}

export interface Image {
    name: string;
    version: string;
}

export interface Color {
    name: string;
    hex: string;
}

export interface ItemCategory {
    gender: string;
    mainCategory: string;
    subCategory: string;
}

export interface Brand {
    name: string;
    companyCode: string;
    companyLogoUrl: string;
}
