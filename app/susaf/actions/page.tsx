import { getAction, getAllActions, insertUser } from "@/app/lib/actions"
import { ActionsForm } from "@/app/ui/susaf/forms/actionsForm";
import { Action } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { list } from "postcss";
import { forEachChild } from "typescript";
import { contains } from "@/app/lib/localFunctions";

const action = {
    id: 1,
    siid: 1,
    description: 'This is the description',
    cost_inaction: 200,
    cost_action: 100, 
    selected: true
}

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      id?: number
    };
  }) {
    const actions: Action[] = await getAllActions()
    const ids = actions.map((action) => (action.id))
    const firstAction = Math.min(...ids)

    
    const id = searchParams?.id || -1;
    console.log(ids)
    console.log(id)

    if(!contains(ids, id)){
        redirect(`actions?id=${firstAction}`)
    }
    
    const actionObject = await getAction(id)
    return <div className="w-full h-full">
        <ActionsForm action={actionObject[0]} />
    </div>
}