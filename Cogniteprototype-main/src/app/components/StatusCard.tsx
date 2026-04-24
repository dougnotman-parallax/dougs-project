interface StatusCardProps {
  status: 'critical' | 'warning' | 'ok';
  equipment: string;
}

export function StatusCard({ status, equipment }: StatusCardProps) {
  const statusConfig = {
    critical: {
      icon: 'M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM7.7 10.5C7.7 10.8866 7.3866 11.2 7 11.2C6.6134 11.2 6.3 10.8866 6.3 10.5V6.3C6.3 5.9134 6.6134 5.6 7 5.6C7.3866 5.6 7.7 5.9134 7.7 6.3V10.5ZM7 4.2C6.50295 4.2 6.1 3.79705 6.1 3.3C6.1 2.80295 6.50295 2.4 7 2.4C7.49705 2.4 7.9 2.80295 7.9 3.3C7.9 3.79705 7.49705 4.2 7 4.2Z',
      color: '#F43D5C',
      label: 'Critical'
    },
    warning: {
      icon: 'M7.6489 0.585938L13.8739 11.5609C14.3614 12.4234 13.7364 13.4984 12.7239 13.4984H0.273883C-0.738617 13.4984 -1.36362 12.4234 0.123883 11.5609L6.34888 0.585938C6.83638 -0.191562 7.96138 -0.191562 8.44888 0.585938H7.6489ZM7.49888 11.7484C7.08888 11.7484 6.74888 11.4084 6.74888 10.9984C6.74888 10.5884 7.08888 10.2484 7.49888 10.2484C7.90888 10.2484 8.24888 10.5884 8.24888 10.9984C8.24888 11.4084 7.90888 11.7484 7.49888 11.7484ZM6.74888 5.99844V8.99844C6.74888 9.40844 7.08888 9.74844 7.49888 9.74844C7.90888 9.74844 8.24888 9.40844 8.24888 8.99844V5.99844C8.24888 5.58844 7.90888 5.24844 7.49888 5.24844C7.08888 5.24844 6.74888 5.58844 6.74888 5.99844Z',
      color: '#F59E0B',
      label: 'Warning'
    },
    ok: {
      icon: 'M7 0C3.13438 0 0 3.13438 0 7C0 10.8656 3.13438 14 7 14C10.8656 14 14 10.8656 14 7C14 3.13438 10.8656 0 7 0ZM10.2031 5.57812L6.57812 9.95312C6.46562 10.0781 6.30937 10.15 6.14062 10.15C5.97187 10.15 5.81562 10.0781 5.70312 9.95312L3.79688 7.76562C3.55937 7.5 3.58125 7.08437 3.84687 6.84687C4.1125 6.60937 4.52812 6.63125 4.76562 6.89687L6.14062 8.48438L9.23438 4.67188C9.47187 4.40625 9.8875 4.38438 10.1531 4.62187C10.4187 4.85938 10.4406 5.275 10.2031 5.54062V5.57812Z',
      color: '#10B981',
      label: 'Ok'
    }
  };

  const config = statusConfig[status];

  return (
    <div className="relative max-w-full min-w-0 shrink-0 self-stretch justify-self-stretch rounded-[8px] bg-[#f9fafa]">
      <div className="size-full overflow-hidden rounded-[inherit] lg:overflow-clip">
        <div className="content-stretch flex flex-col items-start justify-between p-4 sm:p-[16px] relative size-full min-w-0">
          <div className="content-stretch flex w-full min-w-0 max-w-full flex-col gap-[4px] items-start relative shrink-0">
            <div className="content-stretch flex w-full min-w-0 items-center gap-[8px] relative shrink-0">
              <div className="relative shrink-0 overflow-clip size-[16px]">
                <div className="absolute inset-[6.25%]">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <path d={config.icon} fill={config.color} />
                  </svg>
                </div>
              </div>
              <div className="relative flex min-w-0 flex-1 flex-col justify-center font-sans font-medium not-italic leading-[0] text-[#111213] text-[16px] tracking-[-0.08px]">
                <p className="leading-[20px]">{config.label}</p>
              </div>
            </div>
            <div className="content-stretch flex w-full min-w-0 items-center justify-center pl-0 sm:pl-[24px] relative shrink-0">
              <div className="relative flex min-w-0 w-full flex-col justify-center font-sans font-normal not-italic leading-[0] text-[#5e666d] text-[14px] tracking-[-0.04px]">
                <p className="leading-[18px] break-words">{equipment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
