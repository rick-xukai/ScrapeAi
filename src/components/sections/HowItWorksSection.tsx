"use client";

import { motion } from "framer-motion";
import { MessageSquare, Settings, Download, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Your Needs",
    description: "Simply tell us what data you want to extract in plain English. No technical knowledge required.",
    details: "Our AI understands natural language descriptions like 'Get all product prices from this e-commerce site' or 'Extract contact information from company websites'."
  },
  {
    icon: Settings,
    title: "AI Configures Everything",
    description: "Our intelligent system analyzes the target website and automatically configures the optimal scraping strategy.",
    details: "Advanced algorithms handle complex scenarios like dynamic content, pagination, and anti-bot measures automatically."
  },
  {
    icon: Download,
    title: "Extract & Process",
    description: "Watch as your data is extracted in real-time with our lightning-fast processing infrastructure.",
    details: "Get structured data in your preferred format: JSON, CSV, Excel, or direct API integration with your systems."
  },
  {
    icon: CheckCircle,
    title: "Deliver Results",
    description: "Receive clean, structured data ready for analysis, reporting, or integration into your workflows.",
    details: "Quality assurance ensures 99.9% accuracy with automatic data validation and error handling."
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
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
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From idea to data in minutes. Our AI-powered platform makes web scraping 
            as simple as having a conversation.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    Step {index + 1}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>
                
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.details}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1 max-w-md">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-purple-100 dark:border-purple-800"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl flex items-center justify-center">
                    <step.icon className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-6 flex justify-center">
                    <div className="flex space-x-2">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            i <= index ? 'bg-purple-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-purple-100 dark:border-purple-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience the simplicity of AI-powered web scraping. No setup required, 
              no technical expertise needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 