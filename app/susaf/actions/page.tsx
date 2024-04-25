import { insertUser } from "@/app/lib/actions"
import { getUser } from "@/app/lib/actions"
import { getAllUsers } from "@/app/lib/actions";
import { updateUser } from "@/app/lib/actions";
import { deleteUser } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import { testQuestionOperations } from "@/app/lib/actions";
import { testAnswerOperations } from "@/app/lib/actions";
import { testImpactOperations } from "@/app/lib/actions";
import { testKeywordOperations } from "@/app/lib/actions";
import { ActionsForm } from "@/app/ui/susaf/forms/actionsForm";

const action = {
    id: 1,
    siid: 1,
    description: 'This is the description',
    cost_inaction: 200,
    cost_action: 100, 
    selected: true
}

export default async function Page() {
    
    return <div className="w-full h-full">
        <h1>Actions</h1>
        <ActionsForm action={action} />
    </div>
}