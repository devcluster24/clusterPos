/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const URL = "/units/unit-type";

export const unitTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUnitType: build.mutation({
      query: (data) => ({
        url: `${URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.unitType],
    }),

    getAllUnitType: build.query({
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
      providesTags: [tagTypes.unitType],
    }),

    getUnitTypeById: build.query({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "GET",
      }),

      providesTags: [tagTypes.unitType],
    }),

    updateUnitType: build.mutation({
      query: ({ id, data }) => ({
        url: `${URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.unitType],
    }),

    deleteUnitType: build.mutation({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.unitType],
    }),
  }),
});

export const {
  useCreateUnitTypeMutation,
  useGetAllUnitTypeQuery,
  useGetUnitTypeByIdQuery,
  useUpdateUnitTypeMutation,
  useDeleteUnitTypeMutation,
} = unitTypeApi;
