/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/varients";

export const variantsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVarients: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.varients],
    }),

    getAllVarients: build.query({
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
      providesTags: [tagTypes.varients],
    }),

    getVarientsById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.varients],
    }),

    updateVarients: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.varients],
    }),

    deleteVarients: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.varients],
    }),
  }),
});

export const {
  useCreateVarientsMutation,
  useGetAllVarientsQuery,
  useGetVarientsByIdQuery,
  useUpdateVarientsMutation,
  useDeleteVarientsMutation,
} = variantsApi;
