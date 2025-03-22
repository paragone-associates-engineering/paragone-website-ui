"use client"

import type React from "react"
import { Box, Typography } from "@mui/material"
import { z } from "zod"
import Form from "../../../common/form"
//import Form from "../../common/form"

interface ContactAgentFormProps {
  propertyId: string
  propertyTitle: string
}

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactAgentForm: React.FC<ContactAgentFormProps> = ({ propertyId, propertyTitle }) => {
  // const handleSubmit = async (values: ContactFormData) => {
  //   // In a real application, this would submit the form data to an API
  //   console.log("Contact submitted:", { propertyId, ...values })

  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1000))
  // }

  return (
    <Box sx={{ bgcolor: "primary.main", color:"#fff", p:2, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Get in touch
      </Typography>

      {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar src="/agent-avatar.jpg" alt="Agent" sx={{ width: 50, height: 50, mr: 2 }} />
        <Box>
          <Typography variant="subtitle1">John Smith</Typography>
          <Typography variant="body2" color="text.secondary">
            Lead Agent
          </Typography>
        </Box>
      </Box> */}
  <Box sx={{bgcolor:'background.paper', mt:2, p:3}}>
      <Form
        schema={contactSchema}
        //onSubmit={handleSubmit}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: `I'm interested in ${propertyTitle}. Please contact me with more information.`,
        }}
        resetAfterSubmit={false}
        submitLabel="Send message"
        fields={[
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
            required: true,
            rows: 4,
          },
        ]}
      />
      </Box>
    </Box>
  )
}

export default ContactAgentForm

