'use server';

import { number, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
/*
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
*/

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

export async function getUser(id: string) {
  unstable_noStore();
  try {
    const data = await sql<User>`SELECT * FROM Users WHERE id=${id}`;
    console.log("getUser successful for id:", id);
    return data.rows; // returns the array of user rows directly
  } catch (error) {
    console.error("Failed to get user with id:", id, error);
    throw error; // rethrowing the error is usually good practice for handling errors further up the call stack
  }
}

export async function getAllUsers() {
  unstable_noStore();
  try {
    const data = await sql<User>`SELECT * FROM Users`;
    console.log("getAllUsers successful");
    return data.rows; // returns the array of user rows directly
  } catch (error) {
    console.error("Failed to get all users", error);
    throw error;
  }
}

export async function insertUser(
  id: number,
  username: string,
  email: string,
  password: string,
  likelihood_thres: number,
  impact_thres: number,
  cost_thres: number,
): Promise<void> {
  try {
    await sql`
      INSERT INTO Users (id, username, email, password, likelihood_thres, impact_thres, cost_thres)
      VALUES (${id}, ${username}, ${email}, ${password}, ${likelihood_thres}, ${impact_thres}, ${cost_thres});
    `;
    console.log("insertUser successful for id:", id);
  } catch (error) {
    console.error("Failed to insert user with id:", id, error);
    throw error;
  }
}

export async function updateUser(
  id: number,
  username: string,
  email: string,
  password: string,
  likelihood_thres: number,
  impact_thres: number,
  cost_thres: number,
): Promise<void> {
  try {
    await sql`
      UPDATE Users SET 
      username = ${username},
      email = ${email},
      password = ${password},
      likelihood_thres = ${likelihood_thres},
      impact_thres = ${impact_thres},
      cost_thres = ${cost_thres}
      WHERE id = ${id};
    `;
    console.log("updateUser successful for id:", id);
  } catch (error) {
    console.error("Failed to update user with id:", id, error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    await sql` DELETE FROM Users WHERE id = ${id}; `;
    console.log("deleteUser successful for id:", id);
    return { message: 'Deleted User' };
  } catch (error) {
    console.error("Database Error: Failed to delete user with id:", id, error);
    return { message: 'Database Error: Failed to Delete user ' + id };
  }
}




//answers



export async function getAnswer(qid: number, uid: number) {
   unstable_noStore()
  try {
    const data = await sql<Answer>`SELECT * FROM Answer WHERE qid = ${qid} AND uid = ${uid}`;
    console.log("getAnswer successful for qid:", qid, "and uid:", uid);
    return data.rows;
  } catch (error) {
    console.error("Failed to get answer for qid:", qid, "and uid:", uid, error);
    throw error;
  }
}

export async function getAllAnswers() {
  unstable_noStore()
  try {
    const data = await sql<Answer>`SELECT * FROM Answer`;
    console.log("getAllAnswers successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all answers", error);
    throw error;
  }
}






const AnswerFormSchema = z.object({
  qid: z.number({
    required_error: 'Question ID is required.',
    invalid_type_error: 'Question ID must be a number.'
  }),
  uid: z.number({
    required_error: 'User ID is required.',
    invalid_type_error: 'User ID must be a number.'
  }),
  answer: z.string({
    required_error: 'Answer text is required.',
    invalid_type_error: 'Answer text must be a string.'
  }).min(1, 'Answer text cannot be empty.')
});

export type AnswerFormState = {
  errors?: {
    qid?: string[];
    uid?: string[];
    answer?: string[];
  };
  message?: string | null;
};


export async function processAnswerSubmission(formData: FormData): Promise<AnswerFormState> {
  const parsedData = {
    qid: Number(formData.get('qid')),
    uid: Number(formData.get('uid')),
    answer: formData.get('answer') as string
  };

  const validation = AnswerFormSchema.safeParse(parsedData);

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Validation failed for one or more fields.'
    };
  }

  try {
    await insertAnswer(validation.data.qid, validation.data.uid, validation.data.answer);
    console.log('Answer successfully submitted.');
    return {
      message: 'Answer successfully submitted.'
    };
  } catch (error) {
    console.error('Error submitting answer:', error);
    return {
      message: 'Failed to submit answer due to a server error.'
    };
  }
}




export async function insertAnswer(qid: number, uid: number, answer: string) {
  try {
    await sql`
      INSERT INTO Answer (qid, uid, answer)
      VALUES (${qid}, ${uid}, ${answer});
    `;
    console.log("insertAnswer successful for qid:", qid, "and uid:", uid);
  } catch (error) {
    console.error("Failed to insert answer for qid:", qid, "and uid:", uid, error);
    throw error;
  }
}

export async function updateAnswer(qid: number, uid: number, answer: string) {
  try {
    await sql`
      UPDATE Answer SET 
      answer = ${answer}
      WHERE qid = ${qid} AND uid = ${uid};
    `;
    console.log("updateAnswer successful for qid:", qid, "and uid:", uid);
  } catch (error) {
    console.error("Failed to update answer for qid:", qid, "and uid:", uid, error);
    throw error;
  }
}

export async function deleteAnswer(qid: number, uid: number) {
  try {
    await sql` DELETE FROM Answer WHERE qid = ${qid} AND uid = ${uid}; `;
    console.log("deleteAnswer successful for qid:", qid, "and uid:", uid);
    return { message: 'Deleted Answer' };
  } catch (error) {
    console.error("Database Error: Failed to delete answer for qid:", qid, "and uid:", uid, error);
    return { message: 'Database Error: Failed to Delete answer for qid ' + qid + ' and uid ' + uid };
  }
}



// Get a single question by ID
export async function getQuestion(id: number) {
  unstable_noStore();
  try {
    const data = await sql<Question>`SELECT * FROM Question WHERE id = ${id}`;
    console.log("getQuestion successful for id:", id);
    return data.rows[0];
  } catch (error) {
    console.error("Failed to get question with id:", id, error);
    throw error;
  }
}

// Get all questions
export async function getAllQuestions() {
  unstable_noStore();
  try {
    const data = await sql<Question>`SELECT * FROM Question`;
    console.log("getAllQuestions successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all questions", error);
    throw error;
  }
}

// Insert a new question
export async function insertQuestion(id: number, question: string) {
  try {
    await sql`
      INSERT INTO Question (id, question)
      VALUES (${id}, ${question});
    `;
    console.log("insertQuestion successful for id:", id);
  } catch (error) {
    console.error("Failed to insert question with id:", id, error);
    throw error;
  }
}

// Update an existing question
export async function updateQuestion(id: number, question: string) {
  try {
    await sql`
      UPDATE Question SET 
      question = ${question}
      WHERE id = ${id};
    `;
    console.log("updateQuestion successful for id:", id);
  } catch (error) {
    console.error("Failed to update question with id:", id, error);
    throw error;
  }
}

// Delete a question
export async function deleteQuestion(id: number) {
  try {
    await sql` DELETE FROM Question WHERE id = ${id}; `;
    console.log("deleteQuestion successful for id:", id);
    return { message: 'Deleted Question' };
  } catch (error) {
    console.error("Database Error: Failed to delete question with id:", id, error);
    return { message: 'Database Error: Failed to Delete question ' + id };
  }
}


//impacts

export async function getImpact(id: number) {
  unstable_noStore();
  try {
    const data = await sql<Impact>`SELECT * FROM Impact WHERE id = ${id}`;
    console.log("getImpact successful for id:", id);
    return data.rows;
  } catch (error) {
    console.error("Failed to get impact with id:", id, error);
    throw error;
  }
}

export async function getAllImpacts() {
  unstable_noStore();
  try {
    const data = await sql<Impact>`SELECT * FROM Impact`;
    console.log("getAllImpacts successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all impacts", error);
    throw error;
  }
}

export async function insertImpact(id: number, title: string, description: string, pos_neg: boolean, dimension: string) {
  unstable_noStore();
  try {
    await sql`
      INSERT INTO Impact (id, title, description, pos_neg, dimension)
      VALUES (${id}, ${title}, ${description}, ${pos_neg}, ${dimension});
    `;
    console.log("insertImpact successful for id:", id);
  } catch (error) {
    console.error("Failed to insert impact with id:", id, error);
    throw error;
  }
}

export async function updateImpact(id: number, title: string, description: string, pos_neg: boolean, dimension: string) {
  try {
    await sql`
      UPDATE Impact SET 
      title = ${title},
      description = ${description},
      pos_neg = ${pos_neg},
      dimension = ${dimension}
      WHERE id = ${id};
    `;
    console.log("updateImpact successful for id:", id);
  } catch (error) {
    console.error("Failed to update impact with id:", id, error);
    throw error;
  }
}

export async function deleteImpact(id: number) {
  try {
    await sql` DELETE FROM Impact WHERE id = ${id}; `;
    console.log("deleteImpact successful for id:", id);
    return { message: 'Deleted Impact' };
  } catch (error) {
    console.error("Database Error: Failed to delete impact with id:", id, error);
    return { message: 'Database Error: Failed to Delete impact ' + id };
  }
}




//keywords
export async function getKeyword(word: string, iid: number) {
  unstable_noStore();
  try {
    const data = await sql<Keyword>`SELECT * FROM Keyword WHERE word = ${word} AND iid = ${iid}`;
    console.log("getKeyword successful for word:", word, "and iid:", iid);
    return data.rows;
  } catch (error) {
    console.error("Failed to get keyword with word:", word, "and iid:", iid, error);
    throw error;
  }
}

export async function getAllKeywords() {
  unstable_noStore();
  try {
    const data = await sql<Keyword>`SELECT * FROM Keyword`;
    console.log("getAllKeywords successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all keywords", error);
    throw error;
  }
}

export async function insertKeyword(word: string, iid: number) {
  try {
    await sql`
      INSERT INTO Keyword (word, iid)
      VALUES (${word}, ${iid});
    `;
    console.log("insertKeyword successful for word:", word, "and iid:", iid);
  } catch (error) {
    console.error("Failed to insert keyword with word:", word, "and iid:", iid, error);
    throw error;
  }
}

export async function updateKeyword(word: string, iid: number) {
  try {
    await sql`
      UPDATE Keyword SET 
      word = ${word}
      WHERE iid = ${iid};
    `;
    console.log("updateKeyword successful for word:", word, "and iid:", iid);
  } catch (error) {
    console.error("Failed to update keyword with word:", word, "and iid:", iid, error);
    throw error;
  }
}

export async function deleteKeyword(word: string, iid: number) {
  try {
    await sql` DELETE FROM Keyword WHERE word = ${word} AND iid = ${iid}; `;
    console.log("deleteKeyword successful for word:", word, "and iid:", iid);
    return { message: 'Deleted Keyword' };
  } catch (error) {
    console.error("Database Error: Failed to delete keyword with word:", word, "and iid:", iid, error);
    return { message: 'Database Error: Failed to Delete keyword ' + word + ' and iid ' + iid };
  }
}


//choosen impact
export async function getChosenImpact(id: number) {
  unstable_noStore();
  try {
    const data = await sql<ChosenImpact>`SELECT * FROM ChosenImpact WHERE id = ${id}`;
    console.log("getChosenImpact successful for id:", id);
    return data.rows;
  } catch (error) {
    console.error("Failed to get chosen impact with id:", id, error);
    throw error;
  }
}

export async function getAllChosenImpacts() {
  unstable_noStore();
  try {
    const data = await sql<ChosenImpact>`SELECT * FROM ChosenImpact`;
    console.log("getAllChosenImpacts successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all chosen impacts", error);
    throw error;
  }
}

export async function insertChosenImpact(id: number, uid: number, iid: number, temp_category: string, likelihood: number, impactfulness: number) {
  try {
    await sql`
      INSERT INTO ChosenImpact (id, uid, iid, temp_category, likelihood, impactfulness)
      VALUES (${id}, ${uid}, ${iid}, ${temp_category}, ${likelihood}, ${impactfulness});
    `;
    console.log("insertChosenImpact successful for id:", id);
  } catch (error) {
    console.error("Failed to insert chosen impact with id:", id, error);
    throw error;
  }
}

export async function updateChosenImpact(id: number, uid: number, iid: number, temp_category: string, likelihood: number, impactfulness: number) {
  try {
    await sql`
      UPDATE ChosenImpact SET 
      uid = ${uid},
      iid = ${iid},
      temp_category = ${temp_category},
      likelihood = ${likelihood},
      impactfulness = ${impactfulness}
      WHERE id = ${id};
    `;
    console.log("updateChosenImpact successful for id:", id);
  } catch (error) {
    console.error("Failed to update chosen impact with id:", id, error);
    throw error;
  }
}

export async function deleteChosenImpact(id: number) {
  try {
    await sql` DELETE FROM ChosenImpact WHERE id = ${id}; `;
    console.log("deleteChosenImpact successful for id:", id);
    return { message: 'Deleted Chosen Impact' };
  } catch (error) {
    console.error("Database Error: Failed to delete chosen impact with id:", id, error);
    return { message: 'Database Error: Failed to Delete chosen impact ' + id };
  }
}


//leads to

export async function getLeadTo(id: number) {
  unstable_noStore();
  try {
    const data = await sql<LeadTo>`SELECT * FROM LeadTo WHERE id = ${id}`;
    console.log("getLeadTo successful for id:", id);
    return data.rows;
  } catch (error) {
    console.error("Failed to get LeadTo with id:", id, error);
    throw error;
  }
}

export async function getAllLeadTos() {
  try {
    const data = await sql<LeadTo>`SELECT * FROM LeadTo`;
    console.log("getAllLeadTos successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all LeadTos", error);
    throw error;
  }
}

export async function insertLeadTo(id: number, ciid1: number, ciid2: number) {
  try {
    await sql`
      INSERT INTO LeadTo (id, ciid1, ciid2)
      VALUES (${id}, ${ciid1}, ${ciid2});
    `;
    console.log("insertLeadTo successful for id:", id);
  } catch (error) {
    console.error("Failed to insert LeadTo with id:", id, error);
    throw error;
  }
}

export async function updateLeadTo(id: number, ciid1: number, ciid2: number) {
  try {
    await sql`
      UPDATE LeadTo SET 
      ciid1 = ${ciid1},
      ciid2 = ${ciid2}
      WHERE id = ${id};
    `;
    console.log("updateLeadTo successful for id:", id);
  } catch (error) {
    console.error("Failed to update LeadTo with id:", id, error);
    throw error;
  }
}

export async function deleteLeadTo(id: number) {
  try {
    await sql` DELETE FROM LeadTo WHERE id = ${id}; `;
    console.log("deleteLeadTo successful for id:", id);
    return { message: 'Deleted LeadTo' };
  } catch (error) {
    console.error("Database Error: Failed to delete LeadTo with id:", id, error);
    return { message: 'Database Error: Failed to Delete LeadTo ' + id };
  }
}


//selected impact

export async function getSelectedImpact(id: number) {
  unstable_noStore();
  try {
    const data = await sql<SelectedImpact>`SELECT * FROM SelectedImpact WHERE id = ${id}`;
    console.log("getSelectedImpact successful for id:", id);
    return data.rows;
  } catch (error) {
    console.error("Failed to get SelectedImpact with id:", id, error);
    throw error;
  }
}

export async function getAllSelectedImpacts() {
  try {
    const data = await sql<SelectedImpact>`SELECT * FROM SelectedImpact`;
    console.log("getAllSelectedImpacts successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all SelectedImpacts", error);
    throw error;
  }
}

export async function insertSelectedImpact(id: number, ciid: number) {
  try {
    await sql`
      INSERT INTO SelectedImpact (id, ciid)
      VALUES (${id}, ${ciid});
    `;
    console.log("insertSelectedImpact successful for id:", id);
  } catch (error) {
    console.error("Failed to insert SelectedImpact with id:", id, error);
    throw error;
  }
}

export async function updateSelectedImpact(id: number, ciid: number) {
  try {
    await sql`
      UPDATE SelectedImpact SET 
      ciid = ${ciid}
      WHERE id = ${id};
    `;
    console.log("updateSelectedImpact successful for id:", id);
  } catch (error) {
    console.error("Failed to update SelectedImpact with id:", id, error);
    throw error;
  }
}

export async function deleteSelectedImpact(id: number) {
  try {
    await sql` DELETE FROM SelectedImpact WHERE id = ${id}; `;
    console.log("deleteSelectedImpact successful for id:", id);
    return { message: 'Deleted SelectedImpact' };
  } catch (error) {
    console.error("Database Error: Failed to delete SelectedImpact with id:", id, error);
    return { message: 'Database Error: Failed to Delete SelectedImpact ' + id };
  }
}


//Risk

export async function getRisk(id: number) {
  unstable_noStore();
  try {
    const data = await sql<Risk>`SELECT * FROM Risk WHERE id = ${id}`;
    console.log("getRisk successful for id:", id);
    return data.rows;
  } catch (error) {
    console.error("Failed to get risk with id:", id, error);
    throw error;
  }
}

export async function getAllRisks() {
  try {
    const data = await sql<Risk>`SELECT * FROM Risk`;
    console.log("getAllRisks successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all risks", error);
    throw error;
  }
}

export async function insertRisk(id: number, siid: number, description: string) {
  try {
    await sql`
      INSERT INTO Risk (id, siid, description)
      VALUES (${id}, ${siid}, ${description});
    `;
    console.log("insertRisk successful for id:", id);
  } catch (error) {
    console.error("Failed to insert risk with id:", id, error);
    throw error;
  }
}

export async function updateRisk(id: number, siid: number, description: string) {
  try {
    await sql`
      UPDATE Risk SET 
      siid = ${siid},
      description = ${description}
      WHERE id = ${id};
    `;
    console.log("updateRisk successful for id:", id);
  } catch (error) {
    console.error("Failed to update risk with id:", id, error);
    throw error;
  }
}

export async function deleteRisk(id: number) {
  try {
    await sql` DELETE FROM Risk WHERE id = ${id}; `;
    console.log("deleteRisk successful for id:", id);
    return { message: 'Deleted Risk' };
  } catch (error) {
    console.error("Database Error: Failed to delete risk with id:", id, error);
    return { message: 'Database Error: Failed to Delete risk ' + id };
  }
}



//Actions

export async function getAction(id: number) {
  unstable_noStore();
  try {
    const data = await sql<Action>`SELECT * FROM Action WHERE id = ${id}`;
    console.log("getAction successful for id:", id);
    return data.rows;
  } catch (error) {
    console.error("Failed to get action with id:", id, error);
    throw error;
  }
}

export async function getAllActions() {
  try {
    const data = await sql<Action>`SELECT * FROM Action`;
    console.log("getAllActions successful");
    return data.rows;
  } catch (error) {
    console.error("Failed to get all actions", error);
    throw error;
  }
}

export async function insertAction(id: number, siid: number, description: string, cost_inaction: number, cost_action: number, selected: boolean) {
  try {
    await sql`
      INSERT INTO Action (id, siid, description, cost_inaction, cost_action, selected)
      VALUES (${id}, ${siid}, ${description}, ${cost_inaction}, ${cost_action}, ${selected});
    `;
    console.log("insertAction successful for id:", id);
  } catch (error) {
    console.error("Failed to insert action with id:", id, error);
    throw error;
  }
}

export async function updateAction(
  id: number,
  siid?: number,
  description?: string,
  cost_inaction?: number,
  cost_action?: number,
  selected?: boolean
) {
  // Initialize the updates array to gather SQL fragments
  const updates = [];
  if (siid !== undefined) updates.push(`siid = ${siid}`);
  if (description !== undefined) updates.push(`description = '${description}'`);
  if (cost_inaction !== undefined) updates.push(`cost_inaction = ${cost_inaction}`);
  if (cost_action !== undefined) updates.push(`cost_action = ${cost_action}`);
  if (selected !== undefined) updates.push(`selected = ${selected}`);

  // Check if there are any updates to make
  if (updates.length === 0) {
    throw new Error("No updates provided");
  }

  // Join the updates to form the SET part of the SQL query
  const setClause = updates.join(', ');

  // Build the SQL query
  const query = `
    UPDATE Action SET
    ${setClause}
    WHERE id = ${id};
  `;

  try {
    console.log(query)
    await sql.query(query); // Use 'unsafe' if your library supports it, or another method to run raw SQL
    console.log("updateAction successful for id:", id);
  } catch (error) {
    console.error("Failed to update action with id:", id, error);
    throw error;
  }
}

export async function deleteAction(id: number) {
  try {
    await sql` DELETE FROM Action WHERE id = ${id}; `;
    console.log("deleteAction successful for id:", id);
    return { message: 'Deleted Action' };
  } catch (error) {
    console.error("Database Error: Failed to delete action with id:", id, error);
    return { message: 'Database Error: Failed to Delete action ' + id };
  }
}





//tests

export async function testQuestionOperations() {
  // Insert a new question
  await insertQuestion(10, "What is TypeScript?");
  console.log("Inserted new question.");

  // Get the inserted question
  const question = await getQuestion(1);
  console.log("Fetched inserted question:", question);

  // Update the inserted question
  await updateQuestion(1, "What is TypeScript and why use it?");
  console.log("Updated question.");

  // Get the updated question
  const updatedQuestion = await getQuestion(1);
  console.log("Fetched updated question:", updatedQuestion);

  // List all questions
  const allQuestions = await getAllQuestions();
  console.log("All questions:");
  allQuestions.forEach(q => console.log(`ID: ${q.id}, Question: ${q.question}`));

  // Delete the question
  await deleteQuestion(1);
  console.log("Deleted question.");

  // Verify deletion by trying to fetch the deleted question
  const postDeleteCheck = await getAllQuestions();
  console.log("Questions post-deletion:", postDeleteCheck);
}


export async function testAnswerOperations() {
  // Insert a new answer
  await insertAnswer(1, 1, "TypeScript is a typed superset of JavaScript.");
  console.log("Inserted new answer.");

  // Get the inserted answer
  const answer = await getAnswer(1, 1);
  console.log("Fetched inserted answer:", answer);

  // Update the inserted answer
  await updateAnswer(1, 1, "TypeScript builds on JavaScript by adding types.");
  console.log("Updated answer.");

  // Get the updated answer
  const updatedAnswer = await getAnswer(1, 1);
  console.log("Fetched updated answer:", updatedAnswer);

  // List all answers
  const allAnswers = await getAllAnswers();
  console.log("All answers:");
  allAnswers.forEach(a => console.log(`QID: ${a.qid}, UID: ${a.uid}, Answer: ${a.answer}`));

  // Delete the answer
  await deleteAnswer(1, 100);
  console.log("Deleted answer.");

  // Verify deletion by trying to fetch the list of answers
  const postDeleteCheck = await getAllAnswers();
  console.log("Answers post-deletion:", postDeleteCheck);
}





export async function testImpactOperations() {
  // Insert a new impact
  await insertImpact(10, "Environmental", "Reduction in carbon footprint", true, "Economic");
  console.log("Inserted new impact.");

  // Get the inserted impact
  const impact = await getImpact(1);
  console.log("Fetched inserted impact:", impact);

  // Update the inserted impact
  await updateImpact(1, "Environmental Impact", "Significant reduction in carbon emissions", true, "Environmental");
  console.log("Updated impact.");

  // Get the updated impact
  const updatedImpact = await getImpact(1);
  console.log("Fetched updated impact:", updatedImpact);

  // List all impacts
  const allImpacts = await getAllImpacts();
  console.log("All impacts:");
  allImpacts.forEach(i => console.log(`ID: ${i.id}, Title: ${i.title}, Description: ${i.description}, Pos/Neg: ${i.pos_neg}, Dimension: ${i.dimension}`));

  // Delete the impact
  await deleteImpact(1);
  console.log("Deleted impact.");

  // Verify deletion by trying to fetch the list of impacts
  const postDeleteCheck = await getAllImpacts();
  console.log("Impacts post-deletion:", postDeleteCheck);
}




export async function testKeywordOperations() {
  // Insert a new keyword
  await insertKeyword("sustainability", 2);
  console.log("Inserted new keyword.");

  // Get the inserted keyword
  const keyword = await getKeyword("sustainability", 1);
  console.log("Fetched inserted keyword:", keyword);

  // Update the inserted keyword (Note: Keywords typically might not have much to update except associated impact ID, simulated here)
  await updateKeyword("sustainability", 2);
  console.log("Updated keyword to new impact ID.");

  // Get the updated keyword
  const updatedKeyword = await getKeyword("sustainability", 2);
  console.log("Fetched updated keyword:", updatedKeyword);

  // List all keywords
  const allKeywords = await getAllKeywords();
  console.log("All keywords:");
  allKeywords.forEach(k => console.log(`Word: ${k.word}, Impact ID: ${k.iid}`));

  // Delete the keyword
  await deleteKeyword("sustainability", 2);
  console.log("Deleted keyword.");

  // Verify deletion by trying to fetch the list of keywords
  const postDeleteCheck = await getAllKeywords();
  console.log("Keywords post-deletion:", postDeleteCheck);
}

