import {getAnswearItems, getItemAttributes, getItems, printAllSubCategories} from '../index';
import {Brand, Item, Color, ItemCategory, Size} from "../models/item.model";
import {writeFileSync, writeFile} from "fs";
import path from "path";

describe('Fetching items', () => {

    it('should return list of brands', () => {
        const attributes: {brand: Brand[], color: Color[], category: ItemCategory[], size: Size[]} = getItemAttributes()
        writeFileSync('resources/brand.json', JSON.stringify(attributes.brand));
        writeFileSync('resources/color.json', JSON.stringify(attributes.color));
        writeFileSync('resources/category.json', JSON.stringify(attributes.category));
        writeFileSync('resources/size.json', JSON.stringify(attributes.size))
    });

    it('should get all items', done => {
        getAnswearItems().pipe().subscribe(
            (items) => {
                const filepath = path.join('resources/answear-items.json');
                writeFileSync(filepath, JSON.stringify(items));
            },
            error => {
                console.log(error)
                done();
            }, () => {
                done();
            }
        );
    }, 3000000);

    it('should read fetched answear data', done => {
        printAllSubCategories(done);
    });

    it('should get items', done => {
       getItems().subscribe(
           (items: Item[]) => {
            writeFileSync('resources/item.json', JSON.stringify(items));
           },
           err => console.error(err),
           () => done()
       ) 
    });
});
