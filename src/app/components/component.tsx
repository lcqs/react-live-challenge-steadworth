"use client";
import User from './user';
import UsersContext from '../context.ts';
import { useUserIterator } from '../../hooks/useUserIterator.tsx';

export default function Component() {
    const {
      user, 
      users,
      next,
      prev
    } = useUserIterator();
    return (
          <div className="py-2 px-4 flex flex-col items-center ">
              <div className="">
                { 
                  user ?
                  <User
                    {...user}
                  />:
                  <span>No user yet</span>
                 }
              </div>
              <div className="flex space-between mt-2">
              <button
                onClick={prev}
                type="button" 
                className="text-black py-2 px-4 rounded">
                  Prev
              </button>
              <button 
                onClick={next}
                type="button" 
                className="text-black py-2 px-4 rounded">
                  Next
              </button>
              </div>

          </div>
    );
}
