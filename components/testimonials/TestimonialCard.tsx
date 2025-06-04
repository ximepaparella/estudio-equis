import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  imageSrc: string;
  color: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="flex flex-col md:flex-row items-center p-6 md:p-12">
      <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
        <div className="relative">
          <div
            className={`bg-gradient-to-br ${testimonial.color} p-[1px] rounded-full`}
          >
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={testimonial.imageSrc || "/placeholder.svg"}
                alt={testimonial.author}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* Quoted icon */}
          <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1">
            <div
              className={`bg-gradient-to-br ${testimonial.color} rounded-full p-1`}
            >
              <svg
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-2/3 md:pl-8">
        <p className="text-xl md:text-2xl font-medium mb-6">{testimonial.quote}</p>
        <div>
          <div className="flex items-center mb-2">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <h4 className="text-xl font-bold">{testimonial.author}</h4>
          <p className="text-gray-400">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};
