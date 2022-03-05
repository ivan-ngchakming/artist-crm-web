import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { editCustomer } from "../../queries";
import { Customer } from "../../types";
import customerSchema from "./customerSchema";

const EditCustomerDialog = ({
  open,
  customer,
  onClose,
}: {
  open?: boolean;
  customer?: Customer | null;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(["editCustomer"], editCustomer, {
    onSuccess: () => {
      queryClient.invalidateQueries("listCustomers");
      onClose();
    },
  });

  const handleSubmit = (values: Partial<Customer>) => {
    mutate(values);
  };

  if (!customer) return null;

  return (
    <Dialog open={!!open} onClose={onClose}>
      <Formik
        initialValues={customer}
        onSubmit={handleSubmit}
        validationSchema={customerSchema}
        validateOnMount
      >
        {({
          values,
          touched,
          errors,
          isValid,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              {isLoading && <LinearProgress />}
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogContent>
                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="customerId"
                  name="id"
                  label="ID"
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.id && Boolean(errors.id)}
                  helperText={touched.id && errors.id}
                  disabled
                />

                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />

                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="preferredName"
                  name="preferredName"
                  label="Preferred Name"
                  value={values.preferredName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.preferredName && Boolean(errors.preferredName)}
                  helperText={touched.preferredName && errors.preferredName}
                />

                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  id="instagram"
                  name="instagram"
                  label="Instagram"
                  value={values.instagram}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.instagram && Boolean(errors.instagram)}
                  helperText={touched.instagram && errors.instagram}
                />

                <FormControl fullWidth sx={{ my: 2 }}>
                  <InputLabel id="customer-status-select-label">
                    Status
                  </InputLabel>
                  <Select
                    labelId="customer-status-select-label"
                    id="status"
                    name="status"
                    value={values.status}
                    label="Status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="Potential">Potential</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions sx={{ mx: 2, mb: 2 }}>
                <Button variant="contained" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading || !isValid}
                >
                  Update
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditCustomerDialog;
