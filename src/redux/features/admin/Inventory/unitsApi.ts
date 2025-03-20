/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/units";

export const unitsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUnits: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.productBrand],
    }),

    getAllUnits: build.query({
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
      providesTags: [tagTypes.productBrand],
    }),

    getUnitsById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.productBrand],
    }),

    updateUnits: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.productBrand],
    }),

    deleteUnits: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productBrand],
    }),
  }),
});

export const {
  useCreateUnitsMutation,
  useGetAllUnitsQuery,
  useGetUnitsByIdQuery,
  useUpdateUnitsMutation,
  useDeleteUnitsMutation,
} = unitsApi;
