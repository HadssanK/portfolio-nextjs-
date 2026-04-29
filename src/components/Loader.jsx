"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-colors duration-300">
      <div className="loader"></div>
    </div>
  );
}