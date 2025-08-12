import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContactFormProps {
  onSubmit?: (formData: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = ({ onSubmit = () => {} }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#121212] p-6 rounded-xl border border-gray-800 shadow-lg">
      {submitStatus && (
        <Alert
          className={`mb-4 ${submitStatus.success ? "bg-green-900/20 border-green-800" : "bg-red-900/20 border-red-800"}`}
        >
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-semibold tracking-wide">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-[#1a1a1a] border-gray-700 focus:border-[#1F51FF] focus:ring-[#1F51FF]/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-semibold tracking-wide">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-[#1a1a1a] border-gray-700 focus:border-[#1F51FF] focus:ring-[#1F51FF]/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="font-semibold tracking-wide">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            placeholder="What's this about?"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-[#1a1a1a] border-gray-700 focus:border-[#1F51FF] focus:ring-[#1F51FF]/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="font-semibold tracking-wide">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            className="min-h-[120px] bg-[#1a1a1a] border-gray-700 focus:border-[#1F51FF] focus:ring-[#1F51FF]/20"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#1F51FF] hover:bg-[#1F51FF]/80 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-[0_0_10px_rgba(31,81,255,0.5)] hover:shadow-[0_0_15px_rgba(31,81,255,0.8)]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Send className="mr-2 h-4 w-4" /> Send Message
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
