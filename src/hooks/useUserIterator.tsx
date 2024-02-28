"use client";
import axios from 'axios';
import { getUser } from '@/app/api';
import { useContext, useEffect, useState } from 'react'; 

export const useUserIterator = (url: string) => {
  const [ user, setUser ] = useState(null);
  const [ users, setUsers ] = useState([]);
  
  const getCurrentIdx = (users) => {
    return users?.findIndex((usr) => usr.name.first === user.name.first);
  }

  const next = async() => {
    const currentIdx = getCurrentIdx(users);
    if(users[currentIdx + 1]){
      setUser(users[currentIdx +1])
    }else{
      const newRandomUser = await getUser();
      setUser(newRandomUser);
      setUsers([...users, newRandomUser]);
    }
  };

  const prev = async() => {
    const currentIdx = getCurrentIdx(users);
    if(currentIdx === 0){
      return 
    }else{
      setUser(users[currentIdx -1])
    }
    
  };
  
  useEffect(() => {
    const loadUser = async () => {    
      const userFromApi1 = await getUser();
      const userFromApi2 = await getUser();
      setUser(userFromApi1);
      setUsers([userFromApi1, userFromApi2])
    };
    loadUser();
  }, []);
 
  return {
    next,
    prev,
    user,
    users,
  }
}
