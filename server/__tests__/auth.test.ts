import { prismaMock } from '../src/singleton'
import { createUser, findUser } from '../src/prisma/user'

test('should create new user ', async () => {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'thisismysupersecurehashedpassword'
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'John Doe',
    email: 'john@doe.com',
    password: 'thisismysupersecurehashedpassword'
  })
})
