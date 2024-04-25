import { LargeTextInput } from "@/app/ui/susaf/largeTextInput";

export default async function Page() {
    return <div className="h-full">
        <h1>Stakehodlers</h1>
        <LargeTextInput id='lti' placeholder="type here" label='explain'/>
    </div>
}