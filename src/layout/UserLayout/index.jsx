import React from 'react';
import NavBarComponent from "@/components/navbar";

export default function UserLayout({children}) {
  return (
    <div>
        <NavBarComponent />
        {children}
      
    </div>
  )
}
