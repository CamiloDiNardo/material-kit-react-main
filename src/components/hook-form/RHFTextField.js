/* eslint-disable react/prop-types */
import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Stack } from '@mui/material';

const RHFTextField = ({ control }) => (
  <div>
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name="firstname"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextField
                placeholder="Your firstname goes here!"
                type="text"
                name="firstname"
                value={value}
                label="Firstname"
                variant="outlined"
                onChange={onChange}
                error={error}
                helperText={error ? 'Name is required' : ''}
              />
            </>
          )}
        />
        <Controller
          name="lastname"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextField
                placeholder="Your lastname goes here!"
                type="text"
                name="lastname"
                variant="outlined"
                label="Lastname"
                value={value}
                onChange={onChange}
                error={error}
                helperText={error ? 'Lastname is required' : ''}
              />
            </>
          )}
        />
      </Stack>
      <Controller
        name="email"
        control={control}
        rules={{ required: true, pattern: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextField
              placeholder="Your email goes here!"
              type="text"
              name="email"
              value={value}
              label="email"
              variant="outlined"
              onChange={onChange}
              error={error}
              pattern="/^[A-Za-z]+$/i"
              helperText={error ? 'email is required' : ''}
            />
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextField
              placeholder="Your password goes here!"
              multiline
              variant="outlined"
              label="password"
              value={value}
              onChange={onChange}
              error={error}
              helperText={error ? 'Please enter password' : ''}
            />
          </>
        )}
      />
    </Stack>
  </div>
);
export default RHFTextField;
