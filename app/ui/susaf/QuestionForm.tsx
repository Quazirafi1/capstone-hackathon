"use client";
import { TextInput } from "./textinput";
import { Button } from "./button";
import { useFormState } from 'react-dom';
import { Question } from "@/app/lib/definitions";
import React, { useEffect, useState } from 'react';
import { processAnswerSubmission } from '@/app/lib/actions';
import { getQuestion } from "@/app/lib/actions";





export function QuestionForm({ qid }: { qid: string }) {
    console.log("in QuestionForm");
    const [question, setQuestion] = useState<Question | null>(null);  // Now expecting a single Question object
  
    const [formData, setFormData] = useState({
      uid: '',  // This might be pulled from user context or similar
      answer: ''
    });
    const [message, setMessage] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchQuestion = async () => {
        try {
          const questionData: Question = await getQuestion(Number.parseInt(qid));  // Assume this now correctly returns a single Question
          setQuestion(questionData);  // Correct type
        } catch (error) {
          console.log('Failed to load question.');
        }
      };
  
      fetchQuestion();
    }, [qid]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Correctly type assert event.target to HTMLFormElement
        const form = event.target as HTMLFormElement;
        const response = await processAnswerSubmission(new FormData(form));
        // Handle response...
      };
  
    if (!question) {
      return <p>Loading question...</p>;
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="uid">User ID:</label>
          <input
            type="number"
            id="uid"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>{question.question}</p>  // Displaying the question text
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Input your answer here"
            required
          />
        </div>
        <button type="submit">Submit Answer</button>
        {message && <p>{message}</p>}
      </form>
    );
  }