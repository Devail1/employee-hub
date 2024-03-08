import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => "employees",
      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "employees",
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
    uploadImage: builder.mutation({
      query: ({ id, file }) => ({
        url: `employees/${id}/image-upload`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUploadImageMutation,
} = employeesApi;
