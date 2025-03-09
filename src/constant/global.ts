export const genders = ["Male", "Female", "Other"];
export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const paymentMethod = ["BKASH", "NAGAD", "CELLFINE"];
export const paymentMethodOptions = paymentMethod.map((item) => ({
  value: item,
  label: item,
}));

export const paymentStatus = ["PENDING", "COMPLETED", "FAILED"];
export const paymentStatusOptions = paymentStatus.map((item) => ({
  value: item,
  label: item,
}));
