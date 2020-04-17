import {AxiosRequestConfig} from "axios";

export const answearRequestConfig = <AxiosRequestConfig>{
    headers: {
        "x-tamago-api-version": "1.10",
        "x-tamago-app": "frontApp"
    },


};

const productsPerPage = 20;
export const requestDelay = 200;

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

export const genderMap: any = {
    D: "female",
    M: "male"
};

export const mainCategoryMap: any = {
    Дрехи: "clothes",
    Обувки: "shoes",
    Аксесоари: "accessories"
};

export const subCategoryMap: any = {
    'Дънки': 'jeans',
      'Панталони': 'pants',
      'Пуловери': 'sweaters',
      'Ризи': 'shirts',
      'Якета и палта': 'jackets',
      'Тениски и блузи с дълъг ръкав': 'tshirts',
      'Високи обувки': 'high-shoes',
      'Сникърси и спортни': 'sport-shoes',
      'Очила': 'glasses',
      'Ниски и високи кецове': 'sneakers',
      'Колани': 'belts',
      'Шапки и капели': 'caps',
      'Блузи и ризи': 'shirts',
      'Поли': 'skirts',
      'Рокли': 'dresses',
      'Панталони и клинове': 'pants',
      'Боти и чизми': 'boots',
      'Кецове': 'sneakers',
      'Бижута': 'jewelries',
      'Раници': 'backpacks',
      'Балеринки': 'flat-shoes',
      'Чехли и сандали': 'flipflops'
};

export const colorMap: any = {
    'стоманено-син':'Steel blue',
    'светлосин':'Bright blue',
    'син': 'Blue',
    'тъмносин': 'Dark blue',
    'черен': 'Black',
    'сив': 'Grey',
    'кестен': 'Hazelnut',
    'зелен': 'Green',
    'розов': 'Pink',
    'бял':'White',
    'жълт': 'Yellow',
    'виолетов': 'Purple',
    'кафяво-зелен': 'Browngreen',
    'светлосив': 'Light grey',
    'многоцветен': 'Multicolor',
    'кафяв': 'Brown',
    'кафе': 'Coffee',
    'зелено-син': 'Greenblue',
    'червен': 'Red',
    'тъмнокафяв': 'Dark brown',
    'маслина': 'Olive',
    'кремав': 'Cream',
    'тюркоазен': 'Teal',
    'бежов': 'Beige',
    'наситенорозов': 'Magenta',
    'махагон': 'Mahagony',
    'телесен': 'Skin',
    'злато': 'Gold',
    'сребърен': 'Silver',
    'червена роза': 'Crimson',
    'пясъчен': 'Sand',
    'оранжев': 'Orange',
    'светлозелен': 'Light green',
    'милитъри': 'Military',
    'фуксия': 'Fuschia',
    'горчица': 'Mustard',
    'светложълт': 'Light yellow'
};
