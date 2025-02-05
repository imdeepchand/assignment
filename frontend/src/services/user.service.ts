import axiosInstance from '../utils/axiosInstance';
import { UserType } from '@/types';
export class UserServices {
  static async createUser(data:UserType) {
    const response = await axiosInstance.post('/add-user', data);
    return response;
  };

  static async userList() {
    const response = await axiosInstance.get('/users');
    return response.data;
  };

  static async userById(id: string) {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
  };

  static async updateUserById(id: string, data: UserType) {
    const response = await axiosInstance.put(`/edit-user/${id}`, data);
    return response.data;
  };

  static async deleteUser(id: string) {
    const response = await axiosInstance.delete(`/delete-user/${id}`);
    return response.data;
  };
}