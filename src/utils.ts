import {answearCategories} from "./config/answear.config";

function getAllCategoriesRec(categoriesObject: any, categories: string[], accCat: string) {
    for (const [key, value] of Object.entries(categoriesObject)) {
        if (Array.isArray(value)) {
            for (const el of value) {
                categories.push(accCat + key + '/' + el);
            }
        } else {
            getAllCategoriesRec(value, categories, accCat + key + '/');
        }
    }
}

export function getAllCategories(): string[] {
    const categories: string[] = [];
    getAllCategoriesRec(answearCategories, categories, '');
    return categories;
}
