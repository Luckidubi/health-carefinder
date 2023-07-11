import FirebaseAppWrapper from "@/lib/firebase";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <FirebaseAppWrapper>{children}</FirebaseAppWrapper>
    </section>
  );
}
