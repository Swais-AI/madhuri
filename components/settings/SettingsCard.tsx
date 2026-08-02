interface SettingsCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

export default function SettingsCard({
  title,
  icon,
  children,
}: SettingsCardProps) {

  return (
    <div className="
      bg-[#111827]
      border border-gray-700
      rounded-xl
      p-6
    ">

      <h2 className="
        text-xl
        font-semibold
        text-white
        mb-5
      ">
        {icon} {title}
      </h2>

      {children}

    </div>
  );
}