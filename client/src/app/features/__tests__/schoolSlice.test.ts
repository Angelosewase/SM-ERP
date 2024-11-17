import schoolReducer, { SchoolState, setSchool } from '../schoolSlice';

describe('school reducer', () => {
  const initialState: SchoolState = {
    school: null,
    loading: false,
    error: null,
  };

  it('should handle setSchool', () => {
    const mockSchool = {
      _id: '1',
      name: 'Test School',
      address: '123 Test St',
      email: 'test@school.com',
      admin: ['user123'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newState = schoolReducer(initialState, setSchool(mockSchool));

    expect(newState.school).toEqual(mockSchool);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBeNull();
  });
}); 