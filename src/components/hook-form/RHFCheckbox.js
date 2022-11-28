/* eslint-disable react/prop-types */
import React from 'react';
// form
import { Controller } from 'react-hook-form';
// @mui
import { Checkbox, Stack, TextField, Link, Typography } from '@mui/material';

const RHFCheckbox = ({ control }) => (
  <div>
    <Stack spacing={3}>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
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
              helperText={error ? 'Email is required' : ''}
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
      <Stack direction="row" alignItems="center" justifyContent="start" sx={{ my: 2 }}>
        <Controller
          name="checkbox"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Checkbox value={value} onChange={onChange} />
              <Typography>Remember me</Typography>
              <Stack marginLeft={'12rem'}>
                <Link variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>
            </>
          )}
        />
      </Stack>
    </Stack>
  </div>
);
export default RHFCheckbox;
