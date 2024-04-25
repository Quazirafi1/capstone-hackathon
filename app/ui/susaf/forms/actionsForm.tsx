"use client";

import { z } from 'zod';
import { useFormState } from "react-dom";
import { updateAction } from "@/app/lib/actions";
import { Button } from "../button";
import { TextInput } from "../textinput";
import { LargeTextInput } from "../largeTextInput";
import { Action } from '@/app/lib/definitions';
import { describe } from 'node:test';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// const FormSchema = z.object({
//     id: z.string(),
//     cost_of_action: z.coerce.number({
//         invalid_type_error: 'Please enter a number'
//     }),
//     cost_of_inaction: z.coerce.number({
//         invalid_type_error: 'Please enter a number'
//     }),
//     notes: z.string()
//   });

// const UpadteAction = FormSchema.omit({ id: true });

export function ActionsForm({ action }: { action: Action }) {

    async function submitForm(prevState: any, formData: FormData) {

        var costOfAction = undefined;
        if (formData.get('cost_of_action') != null){
            costOfAction = Number.parseInt(formData.get('cost_of_action') as string)
        }

        var costOfInaction = undefined;
        if (formData.get('cost_of_inaction') != null){
            costOfInaction = Number.parseInt(formData.get('cost_of_inaction') as string)
        }

        const id = action.id

        await updateAction(
            id,
            undefined,
            undefined,
            costOfAction,
            costOfInaction,
            undefined
        )

        redirect(`actions?id=${id+1}`)

        return { message: null, errors: {} }
    }

    const initialState = { message: null, errors: {} };
    // const submitFormWithId = submitForm.bind(null, action.id, action.siid, action.description);
    const [state, dispatch] = useFormState(submitForm, initialState);

    return (
        <div className="w-full h-full">
            <h1>{action.id}</h1>
            <h1>{action.id}</h1>
            <form action={dispatch} >
                <TextInput id='cost_of_action' placeholder="Cost of action" label='Cost of action' input_width_percentage={80} />
                {/* {state.errors?.cost_of_action &&
                    state.errors.cost_of_action?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                        </p>
                    ))} */}
                <TextInput id='cost_of_inaction' placeholder="Cost of inaction" label='Cost of inaction' input_width_percentage={80} />
                <LargeTextInput id='notes' placeholder="Notes" />
                <div className='p-4'>
                    <Button text="submit" type="submit" />
                </div>
            </form>
        </div>
    );
}