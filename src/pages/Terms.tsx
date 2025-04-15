
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { RhythmHeader } from "@/components/rhythm-header";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Terms = () => {
  const { termsAccepted, acceptTerms, signOut } = useAuth();
  const [isAgreeing, setIsAgreeing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  // If terms are already accepted, redirect to home
  useEffect(() => {
    if (termsAccepted) {
      navigate("/");
    }
  }, [termsAccepted, navigate]);

  const handleAcceptTerms = async () => {
    if (!agreedToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    setIsAgreeing(true);
    try {
      await acceptTerms();
      navigate("/");
    } catch (error) {
      console.error("Error accepting terms:", error);
    } finally {
      setIsAgreeing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RhythmHeader title="Terms & Conditions" showProfile={false} />

      <main className="container px-4 py-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
          
          <div className="h-64 overflow-y-auto border rounded p-4 mb-6 text-sm">
            <h3 className="font-medium mb-2">1. Introduction</h3>
            <p className="mb-4">
              Welcome to Rhythm. These Terms and Conditions govern your use of our application and the services we provide. By using our application, you agree to these terms in full. If you disagree with any part of these terms, please do not use our application.
            </p>

            <h3 className="font-medium mb-2">2. Privacy and Data Protection</h3>
            <p className="mb-4">
              We take the privacy of our users very seriously. Our Privacy Policy, which is available in the application, outlines how we collect, use, and protect your personal information. By using Rhythm, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>

            <h3 className="font-medium mb-2">3. Health Information</h3>
            <p className="mb-4">
              Rhythm is designed to track menstrual cycles and related health information. However, it is not a medical device and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>

            <h3 className="font-medium mb-2">4. User Accounts</h3>
            <p className="mb-4">
              You are responsible for safeguarding the password that you use to access the application and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account. You agree not to disclose your password to any third party.
            </p>

            <h3 className="font-medium mb-2">5. Limitation of Liability</h3>
            <p className="mb-4">
              In no event shall Rhythm, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the application.
            </p>

            <h3 className="font-medium mb-2">6. Changes to Terms</h3>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>

          <div className="flex items-start space-x-2 mb-6">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            />
            <label htmlFor="terms" className="text-sm cursor-pointer">
              I have read and agree to the Terms and Conditions and Privacy Policy
            </label>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={signOut}>
              Decline & Sign Out
            </Button>
            <Button 
              onClick={handleAcceptTerms} 
              disabled={isAgreeing || !agreedToTerms}
            >
              {isAgreeing ? "Accepting..." : "Accept & Continue"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
