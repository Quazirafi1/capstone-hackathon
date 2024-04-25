import { Card } from "../ui/susaf/card";
import { Button } from "../ui/susaf/button";
import { TextInput } from "../ui/susaf/textinput";
import { CheckBox } from "../ui/susaf/checkbox";
import { ProgressBar } from "../ui/susaf/progressBar";

export default async function Page() {  
    return <div>
        <h1>Home</h1>
        <TextInput id='test' placeholder='place' defaultValue="def" label="test" input_width_percentage={20} />
        <Button text='test' type='submit'/>
        <Card title='card title' children={<Button text='another'/>} leading={<Button text='leading'/>} trailing={<CheckBox id='2' defaultChecked={true}/>}/>
        <ProgressBar percentage={80}/>
    </div>
}