export default function AssistantIcon({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <img
        src="/logosinfondo.png"
        alt="VendexChat"
        className="absolute inset-0 w-full h-full object-cover scale-[1.20]"
      />
    </span>
  );
}
