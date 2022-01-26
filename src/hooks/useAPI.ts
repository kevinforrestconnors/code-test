import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Task, Transaction } from '../types';

type AuthParams = {
  email: string;
  password: string;
};

const useAPI = () => {
  const getTasks = useCallback(async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return [];
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
    }

    return [];
  }, []);

  const authenticate = async (formData: AuthParams): Promise<{ user: string } | null> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/authenticate`, {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return null;
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
      return null;
    }
  };

  const loadData = async (page: string): Promise<{ [key: string]: Transaction } | null> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions?page=${page}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
      });

      if (response.status !== 200) {
        toast(`API request failed`, { type: 'error' });

        return null;
      }

      return await response.json();
    } catch (e) {
      console.log(e);

      toast(`API request failed`, { type: 'error' });
      return null;
    }
  };

  return {
    getTasks,
    authenticate,
    loadData
  };
};

export default useAPI;
