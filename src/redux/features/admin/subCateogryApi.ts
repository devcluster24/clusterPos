/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/sub-category";

export const subcategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubcategory: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.productSubCategory],
    }),

    getAllSubcategory: build.query({
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
      providesTags: [tagTypes.productSubCategory],
    }),

    getSubcategoryById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.productSubCategory],
    }),

    updateSubcategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.productSubCategory],
    }),

    deleteSubcategory: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productSubCategory],
    }),
  }),
});

export const {
  useCreateSubcategoryMutation,
  useGetAllSubcategoryQuery,
  useGetSubcategoryByIdQuery,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = subcategoryApi;
