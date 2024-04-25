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

export function StakeholderForm({ stakeholders }: { stakeholders: Stakeholder[] }) {

    async function submitForm(prevState: any, formData: FormData) {

        var name = undefined;
        if (formData.get('name') != null){
            name = formData.get('description') as string
        }

        var description = undefined;
        if (formData.get('description') != null){
            description = formData.get('description') as string
        }

        await insertStakeholder(
            id,
            name,
            description
        )

        return { message: null, errors: {} }
    }

    const initialState = { message: null, errors: {} };
    // const submitFormWithId = submitForm.bind(null, action.id, action.siid, action.description);
    const [state, dispatch] = useFormState(submitForm, initialState);

    return (
        <div className="w-[60%] h-full">
            <form action={dispatch} >
                <TextInput id='name' placeholder="Name" label='Name' input_width_percentage={80} />
                <TextInput id='description' placeholder="Description" label='Description' input_width_percentage={80} />
                <div className='p-4'>
                    <Button text="add" type="submit" />
                </div>
            </form>
        </div>
    );
}