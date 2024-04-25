import { Card } from "../ui/susaf/card";
import { Button } from "../ui/susaf/button";
import { TextInput } from "../ui/susaf/textinput";
import { CheckBox } from "../ui/susaf/checkbox";
import { ProgressBar } from "../ui/susaf/progressBar";
import ImpactList from "../ui/susaf/list";
// import SortList from "../ui/susaf/sortable-list";


export default async function Page() {  
    let myMap = new Map()
    myMap.set('id', '2');
    myMap.set('title', "Jobs created");
    myMap.set('description', "More jobs are created");
    myMap.set('pos_neg', 1);
    myMap.set('dimension', "Economic")

    let myMap2 = new Map()
    myMap2.set('id', '6');
    myMap2.set('title', "Awareness increase");
    myMap2.set('description', "Awareness was increased");
    myMap2.set('pos_neg', 1);
    myMap2.set('dimension', "Social")

    let myMap3 = new Map()
    myMap3.set('id', '4');
    myMap3.set('title', "CO2 emissions increase");
    myMap3.set('description', "50 pourcent more CO2 were generated");
    myMap3.set('pos_neg', 0);
    myMap3.set('dimension', "Environment")

    let myMap4 = new Map()
    myMap4.set('id', '10');
    myMap4.set('title', "Policy change");
    myMap4.set('description', "The emergency for change in the mobility behaviour of people led to implementation of 'no plane policy'");
    myMap4.set('pos_neg', 1);
    myMap4.set('dimension', "Environment")



    const listOfImpacts = []
    listOfImpacts.push(myMap)  
    listOfImpacts.push(myMap2) 
    listOfImpacts.push(myMap3) 
    listOfImpacts.push(myMap4) 
    return <div>

        <h1>Home</h1>
        <TextInput id='test' placeholder='place' defaultValue="def" label="test" input_width_percentage={20} />
        <Button text='test' type='submit'/>
        <Card title='card title' children={<Button text='another'/>} leading={<Button text='leading'/>} trailing={<CheckBox id='2' defaultChecked={true}/>}/>
        <ProgressBar percentage={80}/>
        <ImpactList impacts={listOfImpacts}/> 

        <TextInput id='test' placeholder='place' defaultValue="def" label="test" input_width_percentage={80} />
        <Button text='test' type='submit'/>
        <Card title='card title' children={<Button text='another'/>} leading={<Button text='leading'/>} trailing={<Button text='trailing'/>}/>
        {/* <SortList data={{
            left: [
            { id: 1, name: 'John Doe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
            { id: 3, name: 'Adam Smith', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
            ],
            right: [
            { id: 2, name: 'Max Walters', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
            { id: 4, name: 'Tom Johnson', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
            ],
            third: [
                { id: 2, name: 'Max Walters', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
                { id: 4, name: 'Tom Johnson', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', sets: '3x10' },
            ]
        }}/> */}
    </div>
}