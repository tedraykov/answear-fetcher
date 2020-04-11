import {AxiosRequestConfig} from "axios";

export const answearRequestConfig = <AxiosRequestConfig>{
    headers: {
        "x-tamago-api-version": "1.10",
        "x-tamago-app": "frontApp"
    },


};

const productsPerPage = 1;
export const requestDelay = 300;

export const allProductsUrl = 'https://api.answear.bg/api/front/products';
export const productUrl = 'https://api.answear.bg/api/front/product/';

export function getCategoryRequestData(category: String) {
    return {
        sort: "",
        filters: {},
        productsPerPage,
        category,
        page: 1
    };
}

export const answearCategories = {
    toy: {
        drehi: [
            'danki',
            'pantaloni',
            'puloveri',
            'rizi',
            'teniski-i-bluzi-s-dalag-rakav',
            'yaketa-i-palta'

        ],
        obuvki: [
            'visoki-obuvki',
            'snikarsi-i-sportni',
            'niski-i-visoki-ketsove'
        ],
        aksesoari: [
            'kolani',
            'ochila',
            'shapki-i-kapeli'
        ]
    },
    tya: {
        drehi: [
            'bluzi-i-rizi',
            'danki',
            'pantaloni-i-klinove',
            'poli',
            'rokli',
            'yaketa-i-palta'
        ],
        obuvki: [
            'balerinki',
            'boti-i-chizmi',
            'ketsove',
            'chehli-i-sandali'
        ],
        aksesoari: [
            'bizhuta',
            'ochila',
            'ranitsi'
        ]
    }
};
