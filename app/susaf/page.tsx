import { Card } from "../ui/susaf/card";
import { Button } from "../ui/susaf/button";
import TextInput from "../ui/susaf/textinput";
import SortList from "../ui/susaf/sortable-list";
export default async function Page() {    
    return <div>
        <h1>Home</h1>
        <TextInput id='test' placeholder='place' defaultValue="def" label="test" input_width_percentage={80} />
        <Button text='test' type='submit'/>
        <Card title='card title' children={<Button text='another'/>} leading={<Button text='leading'/>} trailing={<Button text='trailing'/>}/>
        <SortList data={{
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
        }}/>
    </div>
}