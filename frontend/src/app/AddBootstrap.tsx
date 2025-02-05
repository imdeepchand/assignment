"use client";

import { useEffect } from "react";

export default function AddBootstrap()
{
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.js").then(() => {
          console.log("Bootstrap loaded");
        });
      }, []);
    
      return <></>;
}