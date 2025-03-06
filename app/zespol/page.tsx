"use client";

import { Link } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { ImageComponent } from "../components/image-component";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function NewPage() {
  const { content } = useContent("pl");
  return (
    <main className="p-4">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">
            {content.team.sectionLabel}
          </h2>
          <p className="text-center text-sm text-primary mb-12">
            {content.team.sectionTitle}
          </p>
          <div className="flex flex-col gap-24">
            {content.team.members.map((member, index) => (
              <motion.section
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                variants={fadeInUp}
                className="scroll-m-20"
                id={`member-${index}`}
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 mb-8`}
                >
                  <div className="md:w-1/3 relative h-96 md:h-[600px]">
                    <ImageComponent
                      src={member.image || "/placeholder.svg"}
                      alt={member.imageAlt}
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="md:w-2/3 space-y-6">
                    <h3 className="text-3xl font-bold text-primary">
                      {member.name}
                    </h3>
                    <p className="text-xl text-primary font-medium">
                      {member.title}
                    </p>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                    {member.specializations && (
                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold">
                          Specializations
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {member.specializations.map((spec, i) => (
                            <li key={i} className="text-gray-600">
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Link
                      href={member.linkHref}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      {member.linkText} <span className="ml-1">→</span>
                    </Link>
                  </div>
                </div>

                {member.certificates && member.certificates.length > 0 && (
                  <div className="mt-12">
                    <h4 className="text-2xl font-semibold mb-6 text-center">
                      Certificates & Achievements
                    </h4>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
