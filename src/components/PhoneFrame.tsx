interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-[375px] h-[812px] bg-gray-900 rounded-[50px] p-[10.5px] shadow-2xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[28px] bg-gray-900 rounded-b-[14px] z-10">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[6px] bg-gray-800 rounded-full"></div>
        <div className="absolute top-3 right-4 w-[10px] h-[10px] bg-gray-800 rounded-full"></div>
      </div>
      <div className="w-full h-full bg-white rounded-[40px] overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-[42px] bg-[#f5f5f5] flex items-center justify-between px-4 z-20">
          <div className="text-gray-900 font-medium text-[15px]">9:41</div>
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}