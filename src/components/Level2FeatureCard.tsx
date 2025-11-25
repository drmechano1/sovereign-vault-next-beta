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
      flex gap-4 items-start
    ">
      <Image
        src={icon}
        width={42}
        height={42}
        alt={title}
        className="drop-shadow-[0_0_8px_rgba(255,207,110,0.45)]"
      />
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-[0.95rem] leading-relaxed opacity-80">{children}</p>
      </div>
    </div>
  );
}
