const { db } = require('@vercel/postgres');
const {
  questions,
  users,
  actions,
  answers,
  chosenImpacts,
  impacts,
  leadTos,
  keywords,
  risks,
  selectedImpacts,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist


    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        likelihood_thres INT DEFAULT 0,
        impact_thres INT DEFAULT 0,
        cost_thres INT DEFAULT 0
      );
    `;

    console.log(`Created "User" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        console.log(user)
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO Users (id, username, email, password, likelihood_thres, impact_thres, cost_thres)
          VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword}, ${user.likelihood_thres}, ${user.impact_thres}, ${user.cost_thres})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} User`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding User:', error);
    throw error;
  }
}

async function seedQuestions(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS Question (
        id SERIAL PRIMARY KEY,
        question VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "Question" table`);

    const insertedQuestions = await Promise.all(
      questions.map(async (question) => {
        return client.sql`
          INSERT INTO Question (id, question)
          VALUES (${question.id}, ${question.question})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedQuestions.length} Question`);

    return {
      createTable,
      questions: insertedQuestions,
    };
  } catch (error) {
    console.error('Error seeding Question:', error);
    throw error;
  }
}

async function seedAnswers(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS Answer (
          qid INT,
          uid INT,
          answer VARCHAR(255),
          FOREIGN KEY (qid) REFERENCES Question(id),
          FOREIGN KEY (uid) REFERENCES Users(id),
          PRIMARY KEY (qid, uid)
      );
    `;

    console.log(`Created "Answer" table`);

    const insertedAnswers = await Promise.all(
      answers.map(async (answer) => {
        return client.sql`
          INSERT INTO Answer (qid, uid, answer)
          VALUES (${answer.qid}, ${answer.uid}, ${answer.answer})
          ON CONFLICT (qid, uid) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedAnswers.length} Answer`);

    return {
      createTable,
      answers: insertedAnswers,
    };
  } catch (error) {
    console.error('Error seeding Answer:', error);
    throw error;
  }
}

async function seedImpacts(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS Impact (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          description TEXT,
          pos_neg BOOLEAN,
          dimension VARCHAR(255)
      );
    `;

    console.log(`Created "Impact" table`);

    const insertedImpacts = await Promise.all(
      impacts.map(async (impact) => {
        return client.sql`
          INSERT INTO Impact (id, title, description, pos_neg, dimension)
          VALUES (${impact.id}, ${impact.title}, ${impact.description}, ${impact.pos_neg}, ${impact.dimension})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedImpacts.length} Impact`);

    return {
      createTable,
      impacts: insertedImpacts,
    };
  } catch (error) {
    console.error('Error seeding Impact:', error);
    throw error;
  }
}

async function seedKeywords(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS Keyword (
          word VARCHAR(50),
          iid INT,
          FOREIGN KEY (iid) REFERENCES Impact(id),
          PRIMARY KEY (word, iid)
      );
    `;

    console.log(`Created "Keyword" table`);

    const insertedKeywords = await Promise.all(
      keywords.map(async (keyword) => {
        return client.sql`
          INSERT INTO Keyword (word, iid)
          VALUES (${keyword.word}, ${keyword.iid})
          ON CONFLICT (word, iid) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedKeywords.length} Keyword`);

    return {
      createTable,
      keywords: insertedKeywords,
    };
  } catch (error) {
    console.error('Error seeding Keyword:', error);
    throw error;
  }
}

async function seedChosenImpacts(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS ChosenImpact (
          id SERIAL PRIMARY KEY,
          uid INT,
          iid INT,
          temp_category VARCHAR(50),
          likelihood INT,
          impactfulness INT,
          FOREIGN KEY (uid) REFERENCES Users(id),
          FOREIGN KEY (iid) REFERENCES Impact(id)
      );
    `;

    console.log(`Created "ChosenImpact" table`);

    const insertedChosenImpacts = await Promise.all(
      chosenImpacts.map(async (chosenImpact) => {
        return client.sql`
          INSERT INTO ChosenImpact (id, uid, iid, temp_category, likelihood, impactfulness)
          VALUES (${chosenImpact.id}, ${chosenImpact.uid}, ${chosenImpact.iid}, ${chosenImpact.temp_category}, ${chosenImpact.likelihood}, ${chosenImpact.impactfulness})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedChosenImpacts.length} ChosenImpact`);

    return {
      createTable,
      chosenImpacts: insertedChosenImpacts,
    };
  } catch (error) {
    console.error('Error seeding ChosenImpact:', error);
    throw error;
  }
}

async function seedLeadTos(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS LeadTo (
          id SERIAL PRIMARY KEY,
          ciid1 INT,
          ciid2 INT,
          FOREIGN KEY (ciid1) REFERENCES ChosenImpact(id),
          FOREIGN KEY (ciid2) REFERENCES ChosenImpact(id)
      );
    `;

    console.log(`Created "LeadTo" table`);

    const insertedLeadTos = await Promise.all(
      leadTos.map(async (leadTo) => {
        return client.sql`
          INSERT INTO LeadTo (id, ciid1, ciid2)
          VALUES (${leadTo.id}, ${leadTo.ciid1}, ${leadTo.ciid2})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedLeadTos.length} LeadTo`);

    return {
      createTable,
      leadTos: insertedLeadTos,
    };
  } catch (error) {
    console.error('Error seeding LeadTo:', error);
    throw error;
  }
}

async function seedSelectedImpacts(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS SelectedImpact (
          id SERIAL PRIMARY KEY,
          ciid INT,
          FOREIGN KEY (ciid) REFERENCES ChosenImpact(id)
      );
    `;

    console.log(`Created "SelectedImpact" table`);

    const insertedSelectedImpacts = await Promise.all(
      selectedImpacts.map(async (selectedImpact) => {
        return client.sql`
          INSERT INTO SelectedImpact (id, ciid)
          VALUES (${selectedImpact.id}, ${selectedImpact.ciid})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedSelectedImpacts.length} SelectedImpact`);

    return {
      createTable,
      selectedImpacts: insertedSelectedImpacts,
    };
  } catch (error) {
    console.error('Error seeding SelectedImpact:', error);
    throw error;
  }
}

async function seedRisks(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS Risk (
          id SERIAL PRIMARY KEY,
          siid INT,
          description TEXT,
          FOREIGN KEY (siid) REFERENCES SelectedImpact(id)
      );
    `;

    console.log(`Created "Risk" table`);

    const insertedRisks = await Promise.all(
      risks.map(async (risk) => {
        return client.sql`
          INSERT INTO Risk (id, siid, description)
          VALUES (${risk.id}, ${risk.siid}, ${risk.description})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedRisks.length} Risk`);

    return {
      createTable,
      risks: insertedRisks,
    };
  } catch (error) {
    console.error('Error seeding Risk:', error);
    throw error;
  }
}

async function seedActions(client){
  try{
    // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS Action (
          id SERIAL,
          siid INT,
          description TEXT,
          cost_inaction INT,
          cost_action INT,
          selected BOOLEAN,
          FOREIGN KEY (siid) REFERENCES SelectedImpact(id),
          PRIMARY KEY (id)
      );
    `;

    console.log(`Created "Action" table`);

    const insertedActions = await Promise.all(
      actions.map(async (action) => {
        return client.sql`
          INSERT INTO action (id, siid, description, cost_inaction, cost_action, selected)
          VALUES (${action.id}, ${action.siid}, ${action.description}, ${action.cost_inaction}, ${action.cost_action}, ${action.selected})
          ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedActions.length} Action`);

    return {
      createTable,
      actions: insertedActions,
    };
  } catch (error) {
    console.error('Error seeding Action:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedQuestions(client);
  await seedAnswers(client);
  await seedImpacts(client);
  await seedKeywords(client);
  await seedChosenImpacts(client);
  await seedLeadTos(client);
  await seedSelectedImpacts(client);
  await seedRisks(client);
  await seedActions(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
