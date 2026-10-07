import Image from "next/image";

/** A flat device frame around a full-resolution screenshot. */
export function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`aspect-[1170/2532] rounded-[13%/6%] bg-[#1c1b18] p-[3.2%] shadow-[0_40px_80px_-30px_rgb(22_21_15/0.45)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1170}
        height={2532}
        priority={priority}
        sizes="(min-width: 768px) 320px, 60vw"
        className="h-full w-full rounded-[10.5%/4.9%] object-cover"
      />
    </div>
  );
}
