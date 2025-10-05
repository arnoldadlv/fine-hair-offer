"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { trackLead } from "@/lib/facebook-client";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  cameras: string;
}

interface SecurityAuditFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityAuditForm({ isOpen, onClose }: SecurityAuditFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    cameras: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    return !!formData.name.trim() &&
           !!formData.email.trim() &&
           /\S+@\S+\.\S+/.test(formData.email) &&
           !!formData.company.trim() &&
           !!formData.phone.trim() &&
           !!formData.cameras.trim() &&
           !isNaN(Number(formData.cameras)) &&
           Number(formData.cameras) >= 1;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Google Apps Script webhook URL
      const googleSheetURL = 'https://script.google.com/macros/s/AKfycbwpZkKkXIFBvliCmcFpWxcGyqGF6WYE35x8q8s7bRJV2nnQgnvfGaLKO3k3ndbLFPIR/exec';

      // Prepare form data for Google Sheets
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('fullName', formData.name);
      formDataToSubmit.append('businessEmail', formData.email);
      formDataToSubmit.append('companyName', formData.company);
      formDataToSubmit.append('phoneNumber', formData.phone);
      formDataToSubmit.append('numberOfCameras', formData.cameras);

      // Submit to Google Sheets
      const response = await fetch(googleSheetURL, {
        method: 'POST',
        body: formDataToSubmit,
      });

      if (response.ok) {
        // Send Facebook Lead event
        trackLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        });

        alert('Form submitted successfully! We will contact you soon.');
        
        // Reset form and close modal
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          cameras: "",
        });
        onClose();
      } else {
        throw new Error('Failed to submit to Google Sheets');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isDismissable={false}
      hideCloseButton={true}
      classNames={{
        base: "mx-2 my-2 sm:mx-auto sm:my-auto max-h-[95vh]",
        wrapper: "items-center justify-center"
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Get Your Security Camera Audit</h2>
          <p className="text-sm text-gray-600">
            Fill out the form below and we&apos;ll assess your camera security vulnerabilities.
          </p>
        </ModalHeader>
        <ModalBody className="py-6 px-4 sm:px-6">
          <div className="flex flex-col gap-5 sm:gap-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              description="We'll use this to personalize your security audit report"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              isRequired
              errorMessage="Please enter your full name"
              variant="bordered"
              size="lg"
              autoComplete="name"
            />
            
            <Input
              label="Business Email"
              placeholder="Enter your business email"
              description="Your primary business contact email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              isRequired
              errorMessage="Please enter a valid business email address"
              variant="bordered"
              size="lg"
              autoComplete="email"
              inputMode="email"
            />
            
            <Input
              label="Company Name"
              placeholder="Enter your company name"
              description="The business we'll be conducting the security audit for"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              isRequired
              errorMessage="Please enter your company name"
              variant="bordered"
              size="lg"
              autoComplete="organization"
            />
            
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              description="Best number to reach you for follow-up questions"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              isRequired
              errorMessage="Please enter a valid phone number"
              variant="bordered"
              size="lg"
              autoComplete="tel"
              inputMode="tel"
            />
            
            <Input
              label="Number of Cameras"
              placeholder="How many cameras do you have?"
              description="Include all security cameras in your system (indoor and outdoor)"
              type="number"
              value={formData.cameras}
              onChange={(e) => handleInputChange("cameras", e.target.value)}
              isRequired
              errorMessage="Please enter the number of cameras (minimum 1)"
              variant="bordered"
              size="lg"
              min="1"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </ModalBody>
        <ModalFooter className="flex-col sm:flex-row gap-4 px-4 sm:px-6 py-4 sm:py-6 sticky bottom-0 bg-white border-t">
          <Button
            color="primary"
            onPress={handleSubmit}
            isLoading={isSubmitting}
            className="w-full sm:w-auto order-1 min-h-[48px]"
            size="lg"
            isDisabled={!validateForm()}
          >
            Submit Audit Request
          </Button>
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            className="w-full sm:w-auto order-2 min-h-[48px]"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}