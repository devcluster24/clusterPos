/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/warranties";

export const warrantyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createWarrenty: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.warranty],
    }),

    getAllWarrenty: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${URL}`,
        method: "GET",
        params: arg,
      }),
      //   transformResponse: (response: any, meta: IMeta) => {
      //     return {
      //       Bookcategorys: response,
      //       meta,
      //     };
      //   },
      providesTags: [tagTypes.warranty],
    }),

    getWarrentyById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.warranty],
    }),

    updateWarrenty: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.warranty],
    }),

    deleteWarrenty: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.warranty],
    }),
  }),
});

export const {
  useCreateWarrentyMutation,
  useGetAllWarrentyQuery,
  useGetWarrentyByIdQuery,
  useUpdateWarrentyMutation,
  useDeleteWarrentyMutation,
} = warrantyApi;
