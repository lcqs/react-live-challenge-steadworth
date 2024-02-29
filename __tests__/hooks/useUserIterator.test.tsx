import { getUser } from '../../src/app/api.ts'
import { renderHook, act } from '@testing-library/react-hooks';
import { useUserIterator }  from '../../src/hooks/useUserIterator';
import axios from 'axios';


//Tesing useUserIterator custom hook functionality
//Prev functionality would follow the same approach, so for simplicity only Next method is tested.
jest.mock('axios');
jest.mock('../../src/app/api.ts', () => {

  const mockGetUser = jest.fn();
  return {
    getUser: mockGetUser,
  }
});

const mockResponseDataDefault = {
  data: {
    results: [
      {
        name: {
          title: "Mrs",
          first: "Sam",
          last: "Baxter"
        },
        picture:{
          medium: 'path/to/medium.jpg'
        }
      }
    ]
  }
};
const mockResponseData1 = {
  data: {
    results: [
      {
        name: {
          title: "Mr",
          first: "Luis",
          last: "Que"
        },
        picture:{
          medium: 'path/to/medium.jpg'
        }
      }
    ]
  }
};

const mockResponseData2 = {
  data: {
    results: [
      {
        name: {
          title: "Mr",
          first: "Paco",
          last: "Chan"
        },
        picture:{
          medium: 'path/to/medium.jpg'
        }
      }
    ]
  }
}; 

describe('useUserIterator', () => {

  test("useUserIterator hook should return: user, users, prev, next proerties", async () => {

    const { result, waitForNextUpdate } = renderHook(() => useUserIterator());  

    await waitForNextUpdate();
    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('users');
    expect(result.current).toHaveProperty('next');
    expect(result.current).toHaveProperty('prev');
  });

  test("user should be set on first load with data from api", async() =>{
      getUser.mockReturnValue(mockResponseDataDefault.data.results[0]);
      const { result, waitForNextUpdate } = renderHook(() => useUserIterator());
      await waitForNextUpdate();
      expect(result.current.user).toBe(mockResponseDataDefault.data.results[0]);
  })

  test("users should be set on first load with 2 results from api", async() =>{
      getUser
        .mockReturnValue(mockResponseDataDefault.data.results[0])
        .mockReturnValueOnce(mockResponseData1.data.results[0]);
      const { result, waitForNextUpdate } = renderHook(() => useUserIterator());

      await waitForNextUpdate();
      
      expect(result.current.users).toEqual([
        mockResponseData1.data.results[0],
        mockResponseDataDefault.data.results[0],
      ]);
  })
  test("when next is clicked user should update to next in list", async() =>{
      getUser
        .mockReturnValueOnce(mockResponseDataDefault.data.results[0])
        .mockReturnValueOnce(mockResponseData1.data.results[0]);
      const { result, waitForNextUpdate } = renderHook(() => useUserIterator());

      await waitForNextUpdate();

      act(() => {
       result.current.next()
      });
      expect(result.current.user).toBe(
        mockResponseData1.data.results[0]
      );
   });
  
   test("when next is clicked and user is last item add 1 more", async() =>{
      getUser
        .mockReturnValue(mockResponseDataDefault.data.results[0])
        .mockReturnValueOnce(mockResponseData1.data.results[0])
        .mockReturnValueOnce(mockResponseData2.data.results[0]);
      const { result, waitForNextUpdate } = renderHook(() => useUserIterator());

      await waitForNextUpdate();

      act(() => {
       result.current.next()
      });
      expect(result.current.users).toHaveLength(2);

      act(() => {
       result.current.next()
      });
      await waitForNextUpdate();
      expect(result.current.users).toHaveLength(3);
   });
});
