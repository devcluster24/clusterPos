/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/brand";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBrand: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    getAllBrand: build.query({
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
      providesTags: [tagTypes.brand],
    }),

    getBrandById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.brand],
    }),

    updateBrand: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    deleteBrand: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandQuery,
  useGetBrandByIdQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
