"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Button, Grid, Typography, Alert } from "@mui/material"
import { z } from "zod"
import FormField, { type FormFieldProps } from "./form-field"

export interface FormConfig {
  fields: (Omit<FormFieldProps, "value" | "onChange" | "onBlur" | "error"> & {
    gridProps?: {
      xs?: number
      sm?: number
      md?: number
      lg?: number
    }
  })[]
  submitLabel?: string
  title?: string
  description?: string
  schema?: z.ZodType<any>
  onSubmit: (values: Record<string, any>) => void | Promise<void>
  initialValues?: Record<string, any>
  resetAfterSubmit?: boolean
}

const Form: React.FC<FormConfig> = ({
  fields,
  submitLabel = "Submit",
  title,
  description,
  schema,
  onSubmit,
  initialValues = {},
  resetAfterSubmit = false,
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: any } },
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    // Validate field on blur if schema exists
    if (schema) {
      validateField(name, values[name])
    }
  }

  const validateField = (name: string, value: any) => {
    if (!schema) return true

    try {
      // Create a partial schema for just this field
      const fieldSchema = z.object({ [name]: schema.shape[name] })
      fieldSchema.parse({ [name]: value })

      // Clear error if validation passes
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })

      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((err) => err.path[0] === name)
        if (fieldError) {
          setErrors((prev) => ({
            ...prev,
            [name]: fieldError.message,
          }))
        }
      }
      return false
    }
  }

  const validateForm = () => {
    if (!schema) return true

    try {
      schema.parse(values)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}

        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })

        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {}
    fields.forEach((field) => {
      allTouched[field.name] = true
    })
    setTouched(allTouched)

    // Validate form
    const isValid = validateForm()

    if (isValid) {
      setIsSubmitting(true)

      try {
        await onSubmit(values)
        setSubmitSuccess(true)

        if (resetAfterSubmit) {
          setValues(initialValues)
          setTouched({})
        }
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "An error occurred while submitting the form")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      )}

      {description && (
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
      )}

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Form submitted successfully!
        </Alert>
      )}

      <Grid container spacing={2}>
        {fields.map((field) => {
          const { gridProps = { xs: 12 }, ...fieldProps } = field

          return (
            <Grid item {...gridProps} key={field.name}>
              <FormField
                {...fieldProps}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[field.name] ? errors[field.name] : undefined}
              />
            </Grid>
          )
        })}

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : submitLabel}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Form

