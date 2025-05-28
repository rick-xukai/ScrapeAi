"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out ScrapeAi",
    features: [
      "1,000 pages per month",
      "Basic AI extraction",
      "JSON/CSV export",
      "Email support",
      "Basic analytics"
    ],
    buttonText: "Get Started",
    popular: false,
    color: "from-gray-500 to-gray-600"
  },
  {
    name: "Professional",
    price: "$49",
    description: "For growing businesses and developers",
    features: [
      "50,000 pages per month",
      "Advanced AI extraction",
      "All export formats",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom scheduling"
    ],
    buttonText: "Start Free Trial",
    popular: true,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Unlimited pages",
      "Custom AI models",
      "White-label solution",
      "24/7 dedicated support",
      "Advanced security",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment"
    ],
    buttonText: "Contact Sales",
    popular: false,
    color: "from-indigo-500 to-indigo-600"
  }
];

export default function PricingSection() {
  const { showToast } = useToast();

  const handlePlanClick = (planName: string) => {
    switch (planName) {
      case "Starter":
        showToast("success", "Welcome to ScrapeAi!", "You can start using our free plan immediately. Redirecting to dashboard...");
        break;
      case "Professional":
        showToast("info", "Starting Free Trial", "Starting your 14-day free trial for the Professional plan. No credit card required!");
        break;
      case "Enterprise":
        showToast("info", "Thank You for Your Interest", "Our sales team will contact you within 24 hours to provide enterprise solutions.");
        break;
      default:
        showToast("success", "Thank You for Choosing ScrapeAi", "We're excited to serve you!");
    }
  };

  const handleContactSales = () => {
    showToast("info", "Contact Sales Team", "Redirecting to our sales page. You can also email us at sales@scrapeai.com or call +1 (555) 123-4567.");
  };

  const handleScheduleDemo = () => {
    showToast("info", "Schedule Demo", "Opening calendar to schedule your personalized demo. Our team will show you how ScrapeAi can transform your data extraction process.");
  };

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free, scale as you grow.
            No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${plan.popular ? 'border-2 border-purple-500 shadow-xl' : 'border shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="text-center pb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.price !== "Free" && plan.price !== "Custom" && (
                      <span className="text-gray-500 dark:text-gray-400">/month</span>
                    )}
                  </div>
                  
                  <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handlePlanClick(plan.name)}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white' 
                        : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                    } transition-all duration-200`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                What happens if I exceed my limit?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                We'll notify you before you reach your limit. You can upgrade or purchase additional pages.
              </p>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                We offer a 30-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Our team is here to help you choose the right plan and get started with ScrapeAi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleContactSales}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Contact Sales
              </Button>
              <Button 
                onClick={handleScheduleDemo}
                className="border-white text-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 