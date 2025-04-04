"use client"

//import { Button } from "@/components/ui/button"

import type React from "react"
import {
  TextField,
  Select,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  type TextFieldProps,
  type SelectChangeEvent,
  Box,
  Button,
} from "@mui/material"

export type FieldType = "text" | "email" | "password" | "number" | "tel" | "select" | "textarea" | "checkbox" | "file"

export interface SelectOption {
  value: string
  label: string
}

export interface FormFieldProps {
  name: string
  label: string
  type: FieldType
  value: string | number | boolean | File | null
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  placeholder?: string
  options?: SelectOption[]
  multiline?: boolean
  rows?: number
  fullWidth?: boolean
  disabled?: boolean
  checked?: boolean
  accept?: string
  helperText?: string
  inputProps?: TextFieldProps["inputProps"]
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  options = [],
  multiline = false,
  rows = 4,
  fullWidth = true,
  disabled = false,
  checked,
  accept,
  helperText,
  inputProps,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const customEvent = {
        target: {
          name,
          value: e.target.files[0],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      onChange(customEvent)
    }
  }

  switch (type) {
    case "select":
      return (
        <FormControl fullWidth={fullWidth} error={!!error} required={required} disabled={disabled}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            name={name}
            value={typeof value === "string" ? value : ""}
            onChange={onChange as (e: SelectChangeEvent) => void}
            label={label}
           // placeholder={placeholder}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
        </FormControl>
      )

    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={checked || false}
              onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
              disabled={disabled}
            />
          }
          label={label}
        />
      )

    case "file":
      return (
        <Box>
          <Button
            variant="outlined"
            component="label"
            fullWidth={fullWidth}
            disabled={disabled}
            sx={{
              height: 56,
              justifyContent: "flex-start",
              textTransform: "none",
              color: value ? "text.primary" : "text.secondary",
            }}
          >
            {value ? (typeof value === "string" ? value : value instanceof File ? value.name : "") : placeholder || `Upload ${label}`}
            <input type="file" hidden name={name} onChange={handleFileChange} accept={accept} />
          </Button>
          {error && <FormHelperText error>{error}</FormHelperText>}
        </Box>
      )

    case "textarea":
      return (
        <>
        <Typography variant='h6'>{label}</Typography>
        <TextField
          name={name}
          //label={label}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error || helperText}
          required={required}
          placeholder={label}
          fullWidth={fullWidth}
          multiline
          rows={rows}
          disabled={disabled}
          inputProps={inputProps}
        />
        </>
      )

    default:
      return (
        <>
        <Typography variant='h6'>{label}</Typography>
        <TextField
          name={name}
          //placeholder={label}
          type={type}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error || helperText}
          required={required}
          placeholder={label}
          fullWidth={fullWidth}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          disabled={disabled}
          inputProps={inputProps}
        />
        </>
      )
  }
}

export default FormField

