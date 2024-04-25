import { list } from "postcss";
import { Impact } from "../lib/definitions";
import ImpactList from "../ui/static_list/list";

export default async function Page() {
    let myMap = new Map()
    myMap.set('id', '2');
    myMap.set('title', "Jobs created");
    myMap.set('description', "More jobs are created");
    myMap.set('pos_neg', 1);
    myMap.set('dimension', "Economic")

    const listOfImpacts = []
    listOfImpacts.push(myMap)

    return <div>
        <h1>Home</h1>
        <ImpactList impacts={listOfImpacts}/> 
    </div>
}
