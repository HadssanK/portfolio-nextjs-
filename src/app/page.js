"use client";
import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/Skills_Bar";
import AboutME_Hero from "@/components/AboutME_Hero"
import { useEffect, useState } from "react";
import ServicesExpertise from "@/components/Services_Hero";
import HowIWork from "@/components/Workflow_Hero";
import CommonQuestions from "@/components/Fqa_Hero";
import LetsConnect from "@/components/Connect_Hero";
import Loader from "@/components/Loader";


export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // show loader for 1s
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loader/>;
  return (
    <>
      <Hero/>
      <SkillsMarquee/>
      <AboutME_Hero/>
      <ServicesExpertise/>
      <HowIWork/>
      <CommonQuestions/>
      <LetsConnect/>
    </>
  );
}
