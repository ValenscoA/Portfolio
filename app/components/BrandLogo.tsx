import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      className={className}
      src="/images/valensco-logo.svg"
      alt="Valensco Aurelius logo"
      width={1024}
      height={1024}
      priority={priority}
      unoptimized
    />
  );
}
