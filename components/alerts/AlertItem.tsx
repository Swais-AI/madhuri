"use client";

interface AlertItemProps {
  level: string;
  message: string;
  action?: string;
  time: string;
}

const alertStyles = {
  Critical: {
    icon: "🔴",
    color: "border-red-500",
  },
  High: {
    icon: "🟠",
    color: "border-orange-500",
  },
  Medium: {
    icon: "🟡",
    color: "border-yellow-500",
  },
  Info: {
    icon: "🔵",
    color: "border-blue-500",
  },
};

export default function AlertItem({
  level,
  message,
  action,
  time,
}: AlertItemProps) {

const style = alertStyles[level as keyof typeof alertStyles] ?? alertStyles.Info;

  return (
    <div className="mb-6">

      <div className="flex items-center gap-2 mb-2">
        <span>{style.icon}</span>
        <h3 className="text-sm font-semibold text-gray-200">
          {level}
        </h3>
      </div>


      <div
        className={`
          bg-[#111827]
          border-l-4
          ${style.color}
          rounded-xl
          p-5
          shadow-lg
        `}
      >

        <p className="text-gray-100 text-sm">
          {message}
        </p>


        {action && (
          <p className="text-gray-400 text-sm mt-2">
            {action}
          </p>
        )}


        <div className="text-right mt-3 text-xs text-gray-500">
          {time}
        </div>

      </div>

    </div>
  );
}