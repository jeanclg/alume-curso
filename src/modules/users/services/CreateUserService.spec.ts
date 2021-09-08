import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Jean',
      email: 'jean@mail.com',
      password: 'secret',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const userEmail = 'jean@mail.com';

    await createUser.execute({
      name: 'Jean',
      email: userEmail,
      password: 'secret',
    });

    expect(
      createUser.execute({
        name: 'Jean',
        email: userEmail,
        password: 'secret',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});