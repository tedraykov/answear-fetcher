import {Brand} from "./models/item.model";
import {from, Observable, of} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {
    allProductsUrl,
    answearRequestConfig,
    getCategoryRequestData,
    productUrl,
    requestDelay
} from "./config/answear.config";
import {getAllCategories} from "./utils";
import {concatMap, delay, map, mergeMap, reduce, take, toArray} from "rxjs/operators";
import {AnswearItem, AnswearSimpleItem} from "./models/answear.model";

function fetchProductsSummary(): Observable<AnswearSimpleItem[]> {
    const categories = getAllCategories();

    return from(categories).pipe(
        // TODO remove after implementation complete
        // Takes only the first two categories for performance sake
        take(2),
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

function mapFromAnswear(answearItems: Observable<AnswearItem[]>) {
    
}

export function getItems(): Observable<any> {
    // Get all products in all categories
    const answearSimpleItems = fetchProductsSummary();

    // Fetch detailed information for each item
    const answearItems = fetchDetailedProducts(answearSimpleItems);

    // Map Answear items to custom items
    const items = mapFromAnswear(answearItems);
    return answearItems;
}

export function getBrands(): Brand[] {
    return [];
}
