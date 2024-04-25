import { getAllStakeholders } from "@/app/lib/actions";
import { Stakeholder } from "@/app/lib/definitions";
import { Card } from "@/app/ui/susaf/card";
import { CopyLinkToQuestionnaireButton } from "@/app/ui/susaf/copyLinkToQuestionnaireButton";
import AddableList from "@/app/ui/susaf/forms/addableList";
import { StakeholderForm } from "@/app/ui/susaf/forms/stakeholderForm";


export default async function Page() {
    // const stakeholders = await getAllStakeholders();

    return <AddableList
        getObjects={getAllStakeholders}
        mapObjectToCard={(sh: Stakeholder) => (<Card
            title={sh.name}
            children={sh.description}
            trailing={<CopyLinkToQuestionnaireButton stakeholder_group={sh.name} text='copy link' />}
        />
        )}
        form={<StakeholderForm />}
    />
}
