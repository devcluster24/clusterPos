/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/variants/variant-type";

export const variantTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVarientType: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.varientType],
    }),

    getAllVarientType: build.query({
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
      providesTags: [tagTypes.varientType],
    }),

    getVarientTypeById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.varientType],
    }),

    updateVarientType: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.varientType],
    }),

    deleteVarientType: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.varientType],
    }),
  }),
});

export const {
  useCreateVarientTypeMutation,
  useGetAllVarientTypeQuery,
  useGetVarientTypeByIdQuery,
  useUpdateVarientTypeMutation,
  useDeleteVarientTypeMutation,
} = variantTypeApi;
