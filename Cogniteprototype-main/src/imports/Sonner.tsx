function TextContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-h-px min-w-px relative" data-name="Text Container">
      <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[14px] text-white w-full">Thank you for submitting your feedback</p>
    </div>
  );
}

export default function Sonner() {
  return (
    <div className="bg-[#2d3134] content-stretch flex gap-[8px] items-center overflow-clip p-[12px] relative rounded-[8px] shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.06),0px_4px_6px_-1px_rgba(0,0,0,0.1)] size-full" data-name="Sonner">
      <TextContainer />
    </div>
  );
}