import { Card } from "../ui/susaf/card";
import { Button } from "../ui/susaf/button";
import TextInput from "../ui/susaf/textinput";

export default async function Page() {    
    return <div>
        <h1>Home</h1>
        <TextInput id='test' placeholder='place' defaultValue="def" label="test" input_width_percentage={80} />
        <Button text='test' type='submit'/>
        <Card title='card title' children={<Button text='another'/>} leading={<Button text='leading'/>} trailing={<Button text='trailing'/>}/>
    </div>
}