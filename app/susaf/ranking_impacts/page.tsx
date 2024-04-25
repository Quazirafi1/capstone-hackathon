import { getAllChosenImpacts } from "@/app/lib/actions";
import SortableLists from "../../ui/susaf/sortableLists";
import SortList from "../../ui/susaf/sortableLists";

export default async function Page() {
    const impacts = await getAllChosenImpacts()
    return <div>
        <SortableLists impacts={impacts}/>
    </div>
}