import * as Yup from "yup";
import { CUSTOMER_STATUS } from "../../types";

const customerSchema = Yup.object({
  firstName: Yup.string().nullable(),
  lastName: Yup.string().nullable(),
  preferredName: Yup.string().nullable(),
  email: Yup.string().email().nullable(),
  instagram: Yup.string().nullable(),
  status: Yup.mixed<keyof typeof CUSTOMER_STATUS>(),
});

export default customerSchema;
