"use client";
import React from "react";

import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

export default function HomeAccordion() {
  const accordionData = [
    {
      index: 1,
      question: "How does the GreenHeroes Digital AgriEnterprise Hub work?",
      answer:
        "This is an Agri-tech Platform initiated by Green Heroes Community Based Organization in collaboration with the County Government of Siaya Department of Agriculture to leverage technology for creating a sustainable agricultural ecosystem for Smallholder farmers. It provides a Value Chain acceleration pathway that empowers farmers by enhancing efficiency through accessible digital tools amongst the actors at different levels.",
    },
    {
      index: 2,
      question: "How do I register to the Digital AgriEnterprise Hub?",
      answer:
        "You can join the Platform through the online self-registration process or onboarding by our authorized field enumerators.",
    },
    {
      index: 3,
      question: "How do I access the Hub?",
      answer:
        "Users can access the Platform by dialling the dedicated USSD Code then select the option for the specific service or product that you want to access.",
    },
    {
      index: 4,
      question:
        "What is NAVCDP in full and which Value Chains does NAVCDP promote in Siaya County?",
      answer:
        "NAVCDP stands for National Agricultural Value Chain Project. This is a Kenyan Government Project being implemented by the Ministry of Agriculture and Livestock Development aimed at transforming Smallholder farming into Commercialization. In Siaya County, NAVCDP focuses on five key priority Value Chains, namely Beekeeping (Apiculture), Chicken (Poultry farming), Rice, Tomato, and Rice.",
    },
    {
      index: 5,
      question: "How can I access the services of the NAVCDP?",
      answer:
        "Farmers can access NAVCDP services through the Digital AgriEnterprise Hub by registering on the platform, selecting the NAVCDP option, and following the prompts to access resources, training, and support related to their specific value chain.",
    },
    {
      index: 6,
      question: "How are local farmers connected to the county government?",
      answer:
        "Through verified profiles and local directories, farmers can communicate with agricultural officers, access support programs, and receive real-time updates from their county government.",
    },
    {
      index: 7,
      question: "What kind of government opportunities are posted here?",
      answer:
        "We publish agricultural grants, youth empowerment initiatives, equipment support programs, and upcoming government-funded projects available to the local community.",
    },
    {
      index: 8,
      question: "How do county tenders work on the platform?",
      answer:
        "The platform lists county-level tenders and procurement opportunities. Users can view eligibility criteria, deadlines, and instructions for submitting applications.",
    },
    {
      index: 9,
      question: "Is the payment system secure and transparent?",
      answer:
        "Yes. We use a secure payment gateway to ensure transparency between buyers and sellers. Every transaction is tracked, and both parties receive digital receipts.",
    },
  ];

  return (
    <Accordion
      defaultActiveKey="0"
      flush
      className="accordion-container bg-white border w-full flex flex-col gap-2 p-4 w-full mx-auto"
    >
      {accordionData.map(({ index, question, answer }) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header className="text-sm">
            <div className="div text-sm flex gap-3 text-green-700 py-2">
              {" "}
              <div>{index}</div>
              {question}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="text-[16px] p-4 text-gray-700">{answer}</div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
