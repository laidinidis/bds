import prisma from ".";

interface CreateUser {
  email: string
  name: string
  password: string
}

export const createUser = async ({ name, email, password }: CreateUser) => prisma.user.create({
  data: {
    name,
    email,
    password
  },
  select: { id: true, name: true, email: true }
})

export const findUser = (id: number) => prisma.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true }
})
