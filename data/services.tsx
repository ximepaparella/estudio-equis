import type React from "react";
import { Code, Lightbulb, Smartphone, Briefcase, Database, BarChart, PenTool, Layers } from "lucide-react";

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  color?: string;
  image?: string;
}

export const services: Service[] = [
  {
    icon: <Lightbulb />,
    title: "UX/UI Design",
    description:
      "We create intuitive, engaging, and accessible user experiences that delight your customers and achieve your business goals.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Visual Design",
      "Interaction Design",
      "Usability Testing",
    ],
    color: "from-purple-500 to-pink-500",
    image: "/placeholder.svg?height=600&width=800&text=UX/UI+Design",
  },
  {
    icon: <Code />,
    title: "Software Development",
    description:
      "Our expert developers build custom software solutions that are scalable, secure, and tailored to your specific business needs.",
    features: ["Web Applications", "Custom Software", "API Development", "E-commerce Solutions", "CMS Development"],
    color: "from-blue-500 to-cyan-500",
    image: "/placeholder.svg?height=600&width=800&text=Software+Development",
  },
  {
    icon: <Smartphone />,
    title: "Mobile Applications",
    description:
      "We develop native and cross-platform mobile apps that provide seamless experiences across all devices and platforms.",
    features: [
      "iOS Development",
      "Android Development",
      "Cross-platform Solutions",
      "Mobile UI/UX Design",
      "App Store Optimization",
    ],
    color: "from-green-500 to-teal-500",
    image: "/placeholder.svg?height=600&width=800&text=Mobile+Applications",
  },
  {
    icon: <Briefcase />,
    title: "Project Management",
    description:
      "Our experienced project managers ensure your project is delivered on time, within budget, and to the highest standards.",
    features: [
      "Agile Methodology",
      "Sprint Planning",
      "Resource Allocation",
      "Risk Management",
      "Continuous Delivery",
    ],
    color: "from-orange-500 to-amber-500",
    image: "/placeholder.svg?height=600&width=800&text=Project+Management",
  },
  {
    icon: <Database />,
    title: "Database Solutions",
    description:
      "We design and implement database solutions that are optimized for performance, security, and scalability.",
    features: [
      "Database Design",
      "Data Migration",
      "Performance Optimization",
      "Cloud Database Solutions",
      "Database Security",
    ],
    color: "from-red-500 to-rose-500",
    image: "/placeholder.svg?height=600&width=800&text=Database+Solutions",
  },
  {
    icon: <BarChart />,
    title: "Digital Marketing",
    description:
      "We help you reach your target audience and achieve your marketing goals through data-driven digital strategies.",
    features: [
      "SEO & Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "PPC Advertising",
      "Analytics & Reporting",
    ],
    color: "from-violet-500 to-purple-500",
    image: "/placeholder.svg?height=600&width=800&text=Digital+Marketing",
  },
  {
    icon: <PenTool />,
    title: "Branding & Identity",
    description:
      "We create compelling brand identities that communicate your values and resonate with your target audience.",
    features: ["Logo Design", "Brand Strategy", "Visual Identity", "Brand Guidelines", "Rebranding"],
    color: "from-fuchsia-500 to-pink-500",
    image: "/placeholder.svg?height=600&width=800&text=Branding",
  },
  {
    icon: <Layers />,
    title: "Cloud Solutions",
    description:
      "We help you leverage the power of cloud computing to improve efficiency, scalability, and security.",
    features: [
      "Cloud Migration",
      "AWS/Azure/GCP Solutions",
      "Serverless Architecture",
      "DevOps Implementation",
      "Cloud Security",
    ],
    color: "from-sky-500 to-indigo-500",
    image: "/placeholder.svg?height=600&width=800&text=Cloud+Solutions",
  },
]; 
