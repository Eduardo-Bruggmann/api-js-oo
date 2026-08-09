import { prisma } from '../prisma.js'
import { makeAuthors } from '../factories/authorFactory.js'
import { makeBooks } from '../factories/bookFactory.js'

async function seedLibrary() {
  await prisma.Book.deleteMany()
  await prisma.Author.deleteMany()

  const authors = await Promise.all(
    makeAuthors().map(author => prisma.Author.create({ data: author })),
  )

  await prisma.Book.createMany({
    data: makeBooks(authors),
  })

  return {
    authors: authors.length,
    books: 40,
  }
}

async function main() {
  const result = await seedLibrary()

  console.log(
    `Seed finished: ${result.authors} authors and ${result.books} books created.`,
  )
}

main()
  .catch(error => {
    console.error('Error while executing seed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export { seedLibrary }
