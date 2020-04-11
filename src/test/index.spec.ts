import {getBrands, getItems} from '../index';
import {Brand} from "../models/item.model";
import {writeFileSync} from "fs";
import path from "path";

describe('Fetching items', () => {

    it('should return list of brands', () => {
        const brands: Brand[] = getBrands();
        expect(brands).toBeDefined();
    });

    it('should get all items', done => {
        getItems().pipe().subscribe(
            (items) => {
                const filepath = path.join('resources/fetched-items.json');
                writeFileSync(filepath, JSON.stringify(items));
            },
            error => {
                console.log(error)
                done();
            }, () => {
                done();
            }
        );
    }, 30000);

});
