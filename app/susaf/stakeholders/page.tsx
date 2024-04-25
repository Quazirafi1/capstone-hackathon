import { Card } from "@/app/ui/susaf/card";
import { StakeholderForm } from "@/app/ui/susaf/forms/stakeholderForm";

export default async function Page() {
    const stakeholders = await getAllStakeholders();

    return <div className="h-full">
        {stakeholders.map((sh: Stakeholder) => (
            <Card title={sh.name} children={sh.description}></Card>
        ))}
        <StakeholderForm/>
    </div>
}