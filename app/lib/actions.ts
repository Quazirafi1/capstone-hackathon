'use server';
/*
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

// This is temporary
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
 */


import { sql } from '@vercel/postgres';

// Typescript interfaces from definitions.ts
import {
  User,
  Question,
  Answer,
  Impact,
  Keyword,
  ChosenImpact,
  LeadTo,
  SelectedImpact,
  Risk,
  Action
} from './definitions';

// ========== Insert Functions ==========

// Insert a new user
export async function insertUser(user: Omit<User, 'id'>, client: any): Promise<void> {
  await client.sql`
    INSERT INTO Users (username, email, password, likelihood_thres, impact_thres, cost_thres)
    VALUES (${user.username}, ${user.email}, ${user.password}, ${user.likelihood_thres}, ${user.impact_thres}, ${user.cost_thres});
  `;
}

// Insert a new question
export async function insertQuestion(question: string): Promise<void> {
  console.log("IS this working?")
  await sql`
    INSERT INTO Question (question)
    VALUES (${question});
  `;
}

// Insert a new answer
export async function insertAnswer(answer: Answer, client: any): Promise<void> {
  await client.sql`
    INSERT INTO Answer (qid, uid, answer)
    VALUES (${answer.qid}, ${answer.uid}, ${answer.answer});
  `;
}

// Insert a new impact
export async function insertImpact(impact: Omit<Impact, 'id'>, client: any): Promise<void> {
  await client.sql`
    INSERT INTO Impact (title, description, pos_neg, dimension)
    VALUES (${impact.title}, ${impact.description}, ${impact.pos_neg}, ${impact.dimension});
  `;
}

// ========== Read Functions ==========

// Get all users
export async function getAllUsers(client: any): Promise<User[]> {
  return (await client.sql`SELECT * FROM Users`).rows;
}

// Get all questions
export async function getAllQuestions(client: any): Promise<Question[]> {
  return (await client.sql`SELECT * FROM Question`).rows;
}

// Get all answers
export async function getAllAnswers(client: any): Promise<Answer[]> {
  return (await client.sql`SELECT * FROM Answer`).rows;
}

// Get all impacts
export async function getAllImpacts(client: any): Promise<Impact[]> {
  return (await client.sql`SELECT * FROM Impact`).rows;
}

// ========== Update Functions ==========

// Update a user
export async function updateUser(user: User, client: any): Promise<void> {
  await client.sql`
    UPDATE Users SET 
    username = ${user.username},
    email = ${user.email},
    password = ${user.password},
    likelihood_thres = ${user.likelihood_thres},
    impact_thres = ${user.impact_thres},
    cost_thres = ${user.cost_thres}
    WHERE id = ${user.id};
  `;
}

// Update a question
export async function updateQuestion(question: Question, client: any): Promise<void> {
  await client.sql`
    UPDATE Question SET 
    question = ${question.question}
    WHERE id = ${question.id};
  `;
}

// Update an answer
export async function updateAnswer(answer: Answer, client: any): Promise<void> {
  await client.sql`
    UPDATE Answer SET 
    answer = ${answer.answer}
    WHERE qid = ${answer.qid} AND uid = ${answer.uid};
  `;
}

// Update an impact
export async function updateImpact(impact: Impact, client: any): Promise<void> {
  await client.sql`
    UPDATE Impact SET 
    title = ${impact.title},
    description = ${impact.description},
    pos_neg = ${impact.pos_neg},
    dimension = ${impact.dimension}
    WHERE id = ${impact.id};
  `;
}

// ========== Delete Functions ==========

// Delete a user
export async function deleteUser(userId: number, client: any): Promise<void> {
  await client.sql`
    DELETE FROM Users WHERE id = ${userId};
  `;
}

// Delete a question
export async function deleteQuestion(questionId: number, client: any): Promise<void> {
  await client.sql`
    DELETE FROM Question WHERE id = ${questionId};
  `;
}

// Delete an answer
export async function deleteAnswer(qid: number, uid: number, client: any): Promise<void> {
  await client.sql`
    DELETE FROM Answer WHERE qid = ${qid} AND uid = ${uid};
  `;
}

// Delete an impact
export async function deleteImpact(impactId: number, client: any): Promise<void> {
  await client.sql`
    DELETE FROM Impact WHERE id = ${impactId};
  `;
}
