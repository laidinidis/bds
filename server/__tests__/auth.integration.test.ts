import prisma from '../src/prisma'
import { createUser, findUser } from '../src/prisma/user'

beforeAll(async () => {
  await prisma.user.createMany({
    data: [
      { name: 'John Doe', email: 'john@doe.com', password: '123qweASD' }, 
      { name: 'Jane Doe', email: 'john@doe.com', password: '123qweASD' },
      { name: 'Test User', email: 'test@user.com', password: '123qweASD' }
    ]
  })
})

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany()

  await prisma.$transaction([
    deleteUsers
  ])

  await prisma.$disconnect()
})

it('Should create a new user', async () => {
  const newUser = { name: 'Fake User', email: 'fake@user.com', password: 'FaKePaSS123!@#' }
  const created = await createUser(newUser)

  const user = await prisma.user.findUnique({
    where: { email: 'john@doe.com' }
  })

  expect(newUser).toEqual(user)
})
