"use client";
import React from "react";

import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

export default function HomeAccordion() {
  const accordionData = [
    {
      index: 0,
      question: "What opportunities are available for the youth?",
      answer:
        "Our platform highlights training programs, job openings, entrepreneurship support, and funding opportunities specifically curated for youth in agriculture and agribusiness.",
    },
    {
      index: 1,
      question: "How does the marketplace for farmers work?",
      answer:
        "Farmers can list their products, connect with local buyers, and receive payments securely through our integrated platform. This ensures fair pricing and direct access to customers.",
    },
    {
      index: 2,
      question: "What are extension services and how can I access them?",
      answer:
        "Extension services offer expert guidance on farming practices, livestock care, and crop management. Farmers can book sessions or access digital content provided by certified agricultural officers.",
    },
    {
      index: 3,
      question: "Where can I find financial providers on the platform?",
      answer:
        "We have a dedicated page listing microfinance institutions, banks, and cooperative societies offering loans, grants, and other financial services tailored for farmers and agripreneurs.",
    },
    {
      index: 4,
      question: "What kind of content is in the blog and climate action panel?",
      answer:
        "The blog shares success stories, farming tips, and sector news. The climate action panel provides insights on sustainable practices, weather updates, and eco-friendly farming innovations.",
    },
    {
      index: 5,
      question: "How are local farmers connected to the county government?",
      answer:
        "Through verified profiles and local directories, farmers can communicate with agricultural officers, access support programs, and receive real-time updates from their county government.",
    },
    {
      index: 6,
      question: "What kind of government opportunities are posted here?",
      answer:
        "We publish agricultural grants, youth empowerment initiatives, equipment support programs, and upcoming government-funded projects available to the local community.",
    },
    {
      index: 7,
      question: "How do county tenders work on the platform?",
      answer:
        "The platform lists county-level tenders and procurement opportunities. Users can view eligibility criteria, deadlines, and instructions for submitting applications.",
    },
    {
      index: 8,
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
