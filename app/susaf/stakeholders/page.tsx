import { getAllStakeholders } from "@/app/lib/actions";
import { Stakeholder } from "@/app/lib/definitions";
import { Card } from "@/app/ui/susaf/card";
import { CopyLinkToQuestionnaireButton } from "@/app/ui/susaf/copyLinkToQuestionnaireButton";
import { StakeholderForm } from "@/app/ui/susaf/forms/stakeholderForm";


export default async function Page() {
    const stakeholders = await getAllStakeholders();



    return <div className="h-full">
        {stakeholders.map((sh: Stakeholder) => {
            "use client"
            
            return <Card 
                title={sh.name} 
                children={sh.description}
                trailing={<CopyLinkToQuestionnaireButton stakeholder_group={sh.name} text='copy link' />}
            ></Card>
        })}
        <StakeholderForm/>
    </div>
}