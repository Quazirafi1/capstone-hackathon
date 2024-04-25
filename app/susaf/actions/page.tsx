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
export default async function Page() {
    
    return <h1>Actions</h1>
}