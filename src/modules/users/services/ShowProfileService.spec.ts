import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jean',
      email: 'jean@mail.com',
      password: 'secret',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jean');
    expect(profile.email).toBe('jean@mail.com');
  });

  it('should not be able to show profile from non user', async () => {
    expect(
      showProfile.execute({
        user_id: 'no-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
