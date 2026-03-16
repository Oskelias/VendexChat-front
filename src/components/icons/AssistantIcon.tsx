export default function AssistantIcon({ className }: { className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      <img
        src="/iconoVendexchat.png"
        alt="VendexChat"
        style={{ width: '122%', height: '122%', marginLeft: '-11%', marginTop: '-11%', flexShrink: 0, objectFit: 'cover' }}
      />
    </span>
  );
}
