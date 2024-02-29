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
                { 
                  user ?
                  <div className="
                    hover:bg-amber-400
                    flex justify-center w-4/6 w-4/6 bg-emerald-400 border-black border-8">
                    <div className="border-white border-4 w-[50%] ">
                      <User
                        {...user}
                      />
                    </div>
                  </div>:
                  <span> Loading</span>
                 }
              <div className="flex justify-between flex-row mt-2 w-4/6">
                <div className="w-[33%] p-8">
                  <button
                    onClick={prev}
                    type="button" 
                    className="w-full text-black py-2 px-4 rounded">
                      Prev
                  </button>
                </div>
                <div className="w-[33%] p-8">
                  <button 
                    onClick={next}
                    type="button" 
                    className="w-full text-black py-2 px-4 rounded">
                      Next
                  </button>
                </div>
              </div>

          </div>
    );
}
