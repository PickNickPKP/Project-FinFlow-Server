import prisma from '../src/config/prisma.config.js'
import bcrypt from 'bcryptjs'

const hashedPassword = bcrypt.hashSync('123456', 10)

const userData = [
  {
      email: "user@example.com",
      username: "user1",
      password: hashedPassword,
      capital: 180000,
    },
  {
      email: "user2@example.com",
      username: "user2",
      password: hashedPassword,
      capital: 100000,
    },
]

async function main() {
  await prisma.categoryIncome.createMany({
    data: [
      { name: "salary" },
      { name: "parttime" },
      { name: "bonus" },
    ],
     skipDuplicates: true,
  });

  await prisma.categoryExpense.createMany({
    data: [
      { name: "food" },
      { name: "travel" },
      { name: "fare" },
      { name: "coffee" },
    ],
     skipDuplicates: true,
  });

 await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });

  console.log("Seeding completed ✅");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());