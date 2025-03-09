import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-Types";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userRegister: build.mutation({
      query: (registerData) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        data: registerData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    verifyEmail: build.mutation({
      query: (verifyData) => ({
        url: `${AUTH_URL}/verify-email`,
        method: "POST",
        data: verifyData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/change-password`,
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    refreshToken: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/refresh-token`,
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
