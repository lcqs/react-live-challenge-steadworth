import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Component from '@/app/components/component';
import '@testing-library/jest-dom';
import { useUserIterator } from '@/hooks/useUserIterator';
import User from '@/app/components/user';


//Component test.
// the idea is to make sure the rendering is working fine and handlers are mapped to 
// the correspondent events. No more than that is need since functionality is teste in hook
//
//
jest.mock('../../src/app/components/user.tsx');
jest.mock('../../src/hooks/useUserIterator.tsx');

const mockNext = jest.fn();
const mockPrev = jest.fn();
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


describe("component", () => {
  test("renders", async () => {
      useUserIterator.mockReturnValue({
          user: null,
          users: [],
          next: mockNext,
          prev: mockPrev,
      });
      render(<Component/>);
      
      const btnPrev =  screen.getByText('Prev');
      const btnNext =  screen.getByText('Next'); 
      const noUserYetSpan = screen.getByText('Loading') 
      expect(btnPrev).toBeInTheDocument();
      expect(btnNext).toBeInTheDocument();
      expect(noUserYetSpan).toBeInTheDocument();
  }); 

  test("when next btn is click next handler from hook should be invoked", async () => {
      const user = userEvent.setup();

      useUserIterator.mockReturnValue({
          user: mockResponseDataDefault,
          users: [mockResponseDataDefault, mockResponseData1, mockResponseData2],
          next: mockNext,
          prev: mockPrev,
      });
      render(<Component/>);
      
      const btnNext =  screen.getByText('Next'); 
      await user.click(btnNext);
      
      expect(btnNext).toBeInTheDocument();
      expect(mockNext).toBeCalledTimes(1);
  }); 
  test("component renders User component with current user from hook", async ()=>{
      const currentUserFirstName = mockResponseDataDefault.data.results[0].name.first;
      const MockUserCmpt = () => <>{currentUserFirstName}</> 
      useUserIterator.mockReturnValue({
          user: mockResponseDataDefault,
          users: [mockResponseDataDefault, mockResponseData1, mockResponseData2],
          next: mockNext,
          prev: mockPrev,
      });
      User.mockImplementation(MockUserCmpt);
      render(<Component/>);
      const userCmpt = screen.getByText(currentUserFirstName);
      expect(userCmpt).toBeInTheDocument();
  });
});
