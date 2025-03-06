"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent } from "../hooks/useContent";
import { ImageComponent } from "../components/image-component";

interface Procedure {
  id: string;
  name: string;
  price: string;
  description: string;
  backgroundImage: string;
  doctors: string[];
}

export default function ServicesPage() {
  const { content } = useContent();
  const { title, description, procedures, bookButton } = content.services;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-lg text-gray-700 mb-8">{description}</p>
      </section>

      <section>
        <Accordion type="single" className="w-full">
          {procedures.map((procedure: Procedure) => (
            <AccordionItem key={procedure.id} value={procedure.id}>
              <AccordionTrigger className="flex justify-between items-center p-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{procedure.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-primary font-medium">
                      {procedure.price}
                    </p>
                    <span className="text-sm text-gray-500">|</span>
                    <div className="flex gap-2">
                      {procedure.doctors.map((doctor, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600"
                        >
                          {doctor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative h-64">
                  <ImageComponent
                    src={procedure.backgroundImage}
                    alt={procedure.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/80 z-10" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-20">
                    <p className="mb-4 text-white text-lg font-medium">
                      {procedure.description}
                    </p>
                    <button className="bg-primary w-fit text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      {bookButton}
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
