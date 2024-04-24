// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

// Users
const users = [
  { id: 1, username: "alice123", password: "password1", email: "user1@gmail.com", likelihood_thres: 5, impact_thres: 6, cost_thres: 7 },
  { id: 2, username: "bob456", password: "password2", email: "user2@gmail.com", likelihood_thres: 4, impact_thres: 5, cost_thres: 6 },
  { id: 3, username: "charlie789", password: "password3", email: "user3@gmail.com", likelihood_thres: 6, impact_thres: 7, cost_thres: 8 },
  { id: 4, username: "david001", password: "password4", email: "user4@gmail.com", likelihood_thres: 3, impact_thres: 4, cost_thres: 5 },
  { id: 5, username: "eve002", password: "password5", email: "user5@gmail.com", likelihood_thres: 7, impact_thres: 8, cost_thres: 9 }
];

// Questions
const questions = [
  { id: 1, question: "What is your biggest challenge?" },
  { id: 2, question: "How do you measure success?" },
  { id: 3, question: "What strategies do you use to manage risks?" },
  { id: 4, question: "How important is innovation in your business?" },
  { id: 5, question: "What are the core values of your organization?" }
];

// Answers
const answers = [
  { qid: 1, uid: 1, answer: "Resource allocation" },
  { qid: 2, uid: 1, answer: "Through KPIs" },
  { qid: 3, uid: 2, answer: "Regular assessments" },
  { qid: 4, uid: 2, answer: "Very important" },
  { qid: 5, uid: 3, answer: "Integrity and transparency" }
];

// Impacts
const impacts = [
  { id: 1, title: "Revenue Growth", description: "Potential increase in revenue", pos_neg: true, dimension: "Financial" },
  { id: 2, title: "Brand Damage", description: "Possible negative public perception", pos_neg: false, dimension: "Reputation" },
  { id: 3, title: "Operational Efficiency", description: "Improvement in operations", pos_neg: true, dimension: "Operational" },
  { id: 4, title: "Regulatory Risk", description: "Risk of non-compliance", pos_neg: false, dimension: "Legal" },
  { id: 5, title: "Employee Satisfaction", description: "Enhanced workplace environment", pos_neg: true, dimension: "HR" }
];

// Keywords
const keywords = [
  { word: "growth", iid: 1 },
  { word: "revenue", iid: 1 },
  { word: "damage", iid: 2 },
  { word: "brand", iid: 2 },
  { word: "efficiency", iid: 3 }
];

// ChosenImpacts
const chosenImpacts = [
  { id: 1, uid: 1, iid: 1, temp_category: "immediate", likelihood: 7, impactfulness: 8 },
  { id: 2, uid: 1, iid: 2, temp_category: "structural", likelihood: 6, impactfulness: 9 },
  { id: 3, uid: 1, iid: 3, temp_category: "structural", likelihood: 6, impactfulness: 9 },
  { id: 4, uid: 2, iid: 3, temp_category: "enabling", likelihood: 8, impactfulness: 7 },
  { id: 5, uid: 3, iid: 4, temp_category: "immediate", likelihood: 5, impactfulness: 6 },
  { id: 6, uid: 4, iid: 5, temp_category: "structural", likelihood: 9, impactfulness: 10 }
];

// ImpactsLeadTo
const leadTos = [
  { id: 1, ciid1: 1, ciid2: 2},
  { id: 2, ciid1: 1, ciid2: 3 },
];

// SelectedImpacts
const selectedImpacts = [
  { id: 1, ciid: 2 },
  { id: 2, ciid: 3 },
  { id: 3, ciid: 1 },
];

// Risks
const risks = [
  { id: 1, siid: 1, description: "Potential market changes affecting revenue" },
  { id: 2, siid: 2, description: "Negative media exposure" },
  { id: 3, siid: 3, description: "Failures in adopting new operational procedures" },
  { id: 4, siid: 1, description: "Legal penalties from non-compliance" },
  { id: 5, siid: 2, description: "High turnover if ignored" }
];

// Actions
const actions = [
  { id: 1, siid: 1, description: "As a manager, I want to ensure adaptable market strategies...", cost_inaction: 50000, cost_action: 10000, selected: true },
  { id: 2, siid: 2, description: "As a brand manager, I need a crisis management plan...", cost_inaction: 30000, cost_action: 20000, selected: false },
  { id: 3, siid: 3, description: "As an operations head, I want to streamline processes...", cost_inaction: 40000, cost_action: 15000, selected: true },
  { id: 4, siid: 2, description: "As a compliance officer, I need to update our legal frameworks...", cost_inaction: 60000, cost_action: 25000, selected: false },
  { id: 5, siid: 1, description: "As an HR manager, I want to improve employee engagement...", cost_inaction: 20000, cost_action: 5000, selected: true }
];

// Export all the data
module.exports = {
  users,
  questions,
  answers,
  impacts,
  keywords,
  chosenImpacts,
  leadTos,
  selectedImpacts,
  risks,
  actions
};
