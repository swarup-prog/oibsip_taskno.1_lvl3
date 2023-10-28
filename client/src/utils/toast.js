import { toast } from "sonner";

export const toastSuccess = (message) => {
  toast.success(message);
};

export const toastError = (message) => {
  toast.error(message);
};

export const toastLoading = (message) => {
  toast.loading(message);
};
