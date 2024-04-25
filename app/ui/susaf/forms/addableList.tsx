import { getAllStakeholders } from "@/app/lib/actions";
import { Stakeholder } from "@/app/lib/definitions";
import { Card } from "@/app/ui/susaf/card";
import { CopyLinkToQuestionnaireButton } from "@/app/ui/susaf/copyLinkToQuestionnaireButton";
import { StakeholderForm } from "@/app/ui/susaf/forms/stakeholderForm";


export default async function AddableList<T>({ getObjects, mapObjectToCard, form }: {
    getObjects: () => Promise<T[]>;
    mapObjectToCard: (object: T) => React.ReactNode;
    form: React.ReactNode;
}) {
    const objects = await getObjects();

    return <div className="h-full">
        {objects.map((ob: T) => (mapObjectToCard(ob)))}
        {form}
    </div>
}