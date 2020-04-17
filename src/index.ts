import {Brand, Item, ItemCategory, Size, Color} from "./models/item.model";
import {from, Observable, of} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {
    allProductsUrl,
    answearRequestConfig, colorMap, genderMap,
    getCategoryRequestData, mainCategoryMap,
    productUrl,
    requestDelay, subCategoryMap
} from "./config/answear.config";
import {getAllCategories} from "./utils";
import {concatMap, delay, map, mergeMap, reduce, take, toArray} from "rxjs/operators";
import {AnswearItem, AnswearSimpleItem} from "./models/answear.model";
import { readFile, existsSync, readFileSync } from "fs";
import path from "path";

function fetchProductsSummary(): Observable<AnswearSimpleItem[]> {
    const categories = getAllCategories();

    return from(categories).pipe(
        // TODO remove after implementation complete
        // Takes only the first two categories for performance sake
        // take(2),
        // Creates delay between each category
        concatMap(category => of(category).pipe(delay(requestDelay))),
        // Makes request to fetch n items from the specified category and flattens the response to an array
        mergeMap(category =>
            from(axios.post(allProductsUrl, getCategoryRequestData(category), answearRequestConfig))
                .pipe(map((response: AxiosResponse) => response.data.items))
        ),
        // Merges the result arrays of each request into a single array
        reduce((acc: AnswearSimpleItem[], val: AnswearSimpleItem[]) => acc.concat(val)),
        // tap(console.log)
    );
}

function fetchDetailedProducts(simpleItems: Observable<AnswearSimpleItem[]>): Observable<AnswearItem[]> {
    return simpleItems.pipe(
        // Strip each element of the items array into a single emission
        mergeMap((items: AnswearSimpleItem[]) => from(items)),
        // Add delay between each item
        concatMap((item: AnswearSimpleItem) => of(item).pipe(delay(requestDelay))),
        // Make request for specific item and flatten the response to an AnswearItem
        mergeMap((item: AnswearSimpleItem) => {
            return from(axios.get(productUrl + item.id, answearRequestConfig)).pipe(
                map((response: AxiosResponse) => (<AnswearItem>response.data.product))
            )
        }),
        // Accumulate all items into a single array
        toArray()
    );
}

function mapFromAnswear(answearItems: Observable<AnswearItem[]>): Observable<Item[]> {
    return answearItems.pipe(
        map(items => {
            return items.map(item => {
               return <Item> {
                   name: item.name,
                   price: item.priceRegular,
                   discountedPrice: item.price,
                   description: item.description,
                   fullDescription: item.fullDescription,
                   brand: <Brand> {
                       name: item.productBrand.name,
                       companyLogoUrl: item.productBrand.logo
                   },
                   category: <ItemCategory> {
                       gender: genderMap[item.sex],
                       mainCategory: mainCategoryMap[item.category[1].name],
                       subCategory: subCategoryMap[item.category[2].name]
                   },
                   color: {
                       name: colorMap[item.colorversions[0].color.name],
                       hex: item.colorversions[0].hex
                   },
                   images: item.productImages.orderedImages,
                   sizes: item.allSizes.map(size => {
                        return {
                            value: size.name,
                            sizeCategory: mainCategoryMap[item.category[1].name],
                            quantity: size.variation.quantity || 0
                        }
                   })
               }
            });
        })
    )
}

export function getAnswearItems(): Observable<AnswearItem[]>{
    // Get all products in all categories
    const answearSimpleItems = fetchProductsSummary();

    // Fetch detailed information for each item
    return fetchDetailedProducts(answearSimpleItems);

}

export function getItems(): Observable<Item[]> {
    const filePath = path.join('resources/answear-items.json');
    let answearItems: Observable<AnswearItem[]>;
    if (!existsSync(filePath)) {
        answearItems = getAnswearItems();
    } else {
        const fileData = JSON.parse(readFileSync(filePath).toString());
        answearItems = of(fileData);
    }
    // Map Answear items to custom items
    const items = mapFromAnswear(answearItems);
    // return answearItems;
    return items;
}

export function getItemAttributes(): {brand: Brand[], color: Color[], category: ItemCategory[]} {
    const items: Item[] = JSON.parse(readFileSync(path.join('resources/item.json')).toString());
    const brandSet = new Set(items.map(item => item.brand));
    const colorSet = new Set(items.map(item => item.color));
    const categorySet = new Set(items.map(item => item.category));
    return {
        brand: Array.from(brandSet.values()),
        color: Array.from(colorSet.values()),
        category: Array.from(categorySet.values())
    };
    
}

export function printAllSubCategories(callback: () => any) {
    readFile(path.join('resources/answear-items.json'), (err, stream) => {
        const answearData: AnswearItem[] = JSON.parse(stream.toString());
        const categories = answearData.map(item => item.colorversions[0].color.name);
        const uniqueCategories: Set<string> = new Set(categories);
        console.log(uniqueCategories);
        callback();
    })
}