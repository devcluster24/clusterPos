/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/products";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    getAllProduct: build.query({
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
      providesTags: [tagTypes.product],
    }),

    getProductById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.product],
    }),

    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
