import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  isSimulatorMode?: boolean;
  onToggleSimulator?: () => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col">
      <main className="flex-1 w-full max-w-md mx-auto">
        {children}
      </main>
    </div>
  );
};
