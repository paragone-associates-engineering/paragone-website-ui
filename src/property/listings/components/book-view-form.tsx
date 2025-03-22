"use client"

import type React from "react"
import { Box, Typography } from "@mui/material"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { z } from "zod"
import Form from "../../../common/form"

interface BookViewingFormProps {
  propertyId: string
  propertyTitle: string
}

const bookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date",
  }),
  time: z.string().min(1, "Please select a time"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const BookViewingForm: React.FC<BookViewingFormProps> = ({ propertyId }) => {
  const handleSubmit = async (values: BookingFormData) => {
    // In a real application, this would submit the form data to an API
    console.log("Booking submitted:", { propertyId, ...values })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
  ]

  return (
    <Box sx={{ bgcolor:"primary.main", color:"#fff", p: 2, borderRadius: 2 }}>
      <Typography variant="h5"  gutterBottom>
        Book a Viewing
      </Typography>

     <Box sx={{bgcolor:'background.paper', mt:2, p:3}}>
        <Form
          schema={bookingSchema}
          onSubmit={handleSubmit}
          initialValues={{
            date: new Date(),
            time: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          }}
          resetAfterSubmit={true}
          submitLabel="Send request"
          fields={[
            {
              name: "date",
              label: "Date for Showing",
              type: "text", // Custom handling for date picker
              required: true,
              gridProps: { xs: 12, sm: 6 },
              // Custom render for date picker would be implemented here
            },
            {
              name: "time",
              label: "Time",
              type: "select",
              required: true,
              gridProps: { xs: 12, sm: 6 },
              options: [
                { value: "", label: "Select time" },
                ...timeSlots.map((slot) => ({ value: slot.value, label: slot.label })),
              ],
            },
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              required: true,
              gridProps: { xs: 12, sm: 6 },
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text",
              required: true,
              gridProps: { xs: 12, sm: 6 },
            },
            {
              name: "email",
              label: "Email Address",
              type: "email",
              required: true,
              gridProps: { xs: 12, sm: 6 },
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "tel",
              required: true,
              gridProps: { xs: 12, sm: 6 },
            },
            {
              name: "message",
              label: "Message",
              type: "textarea",
              rows: 4,
              placeholder: "Add any additional information",
            },
          ]}
        />
     </Box>
    </Box>
  )
}

export default BookViewingForm

