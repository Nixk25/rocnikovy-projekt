import React from "react";

export default function Loading() {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="container  flex-col gap-3 flex justify-center items-center">
        <span className="text-primary font-bold sm-clamp">Načítání...</span>
        <div className="loader"></div>
      </div>
    </section>
  );
}
