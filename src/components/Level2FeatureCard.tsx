import Image from "next/image";

interface Level2FeatureCardProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export function Level2FeatureCard({ icon, title, children }: Level2FeatureCardProps) {
  return (
    <div className="
      w-full rounded-xl p-6
      bg-[rgba(255,255,255,0.03)]
      border border-[rgba(255,255,255,0.08)]
      shadow-[0_0_40px_rgba(255,207,110,0.10)]
      backdrop-blur-md
      hover:shadow-[0_0_60px_rgba(255,207,110,0.25)]
      transition-all duration-300
      flex flex-col items-center text-center
    ">
      <Image
        src={icon}
        alt={title}
        width={80}
        height={80}
        className="mb-3 drop-shadow-[0_0_18px_rgba(248,191,60,0.7)]"
      />
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-80 leading-relaxed">
        {children}
      </p>
    </div>
  );
}
