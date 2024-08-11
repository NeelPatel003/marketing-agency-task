import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addFormData, updateFormData } from '../redux/formSlice';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, IconButton, Grid, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.array().of(
    Yup.object().shape({
      number: Yup.string().required('Phone number is required'),
      personName: Yup.string().required('Person name is required'),
    })
  ).min(1, 'At least one phone is required').max(4, 'Maximum 4 phones allowed'),
  address: Yup.array().of(
    Yup.object().shape({
      address: Yup.string().required('Address is required'),
      addressType: Yup.string().required('Address type is required'),
    })
  ).min(1, 'At least one address is required').max(4, 'Maximum 4 addresses allowed'),
  remarks: Yup.string().required('Remarks are required'),
  reference: Yup.string().required('Reference is required'),
});

const FormComponent = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: [{ number: '', personName: '' }],
      address: [{ address: '', addressType: '' }],
      remarks: '',
      reference: '',
    },
  });

  const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
    control,
    name: 'phone',
  });

  const { fields: addressFields, append: appendAddress, remove: removeAddress } = useFieldArray({
    control,
    name: 'address',
  });

  const onSubmit = (data) => {
    dispatch(addFormData(data)); // Changed to addFormData
    console.log('Form Data: ', data);
    alert('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                variant="outlined"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Phone Numbers</Typography>
        </Grid>
        {phoneFields.map((item, index) => (
          <React.Fragment key={item.id}>
            <Grid item xs={5}>
              <Controller
                name={`phone[${index}].number`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    variant="outlined"
                    error={!!errors?.phone?.[index]?.number}
                    helperText={errors?.phone?.[index]?.number?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Controller
                name={`phone[${index}].personName`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Person Name"
                    variant="outlined"
                    error={!!errors?.phone?.[index]?.personName}
                    helperText={errors?.phone?.[index]?.personName?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removePhone(index)} disabled={phoneFields.length === 1}>
                <Remove />
              </IconButton>
              {index === phoneFields.length - 1 && phoneFields.length < 4 && (
                <IconButton onClick={() => appendPhone({ number: '', personName: '' })}>
                  <Add />
                </IconButton>
              )}
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <Typography variant="h6">Addresses</Typography>
        </Grid>
        {addressFields.map((item, index) => (
          <React.Fragment key={item.id}>
            <Grid item xs={5}>
              <Controller
                name={`address[${index}].address`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    variant="outlined"
                    error={!!errors?.address?.[index]?.address}
                    helperText={errors?.address?.[index]?.address?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={5}>
              <Controller
                name={`address[${index}].addressType`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address Type"
                    variant="outlined"
                    error={!!errors?.address?.[index]?.addressType}
                    helperText={errors?.address?.[index]?.addressType?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removeAddress(index)} disabled={addressFields.length === 1}>
                <Remove />
              </IconButton>
              {index === addressFields.length - 1 && addressFields.length < 4 && (
                <IconButton onClick={() => appendAddress({ address: '', addressType: '' })}>
                  <Add />
                </IconButton>
              )}
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <Controller
            name="remarks"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Remarks"
                variant="outlined"
                error={!!errors.remarks}
                helperText={errors.remarks?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="reference"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reference"
                variant="outlined"
                error={!!errors.reference}
                helperText={errors.reference?.message}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormComponent;
