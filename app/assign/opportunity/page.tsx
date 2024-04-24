"use client"

import { insertQuestion } from "@/app/lib/actions";
// import { insertQuestion } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { CardSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Question } from '../../lib/definitions'



export default function Page() {
  
    return (
        <div>
          <h1>Assign / Opportunity</h1>
          <button onClick={() => insertQuestion('testingg')}>Insert question 'testing'</button>
        </div>
    )
  }