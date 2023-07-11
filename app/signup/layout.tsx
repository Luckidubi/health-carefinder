import FirebaseAppWrapper from "@/lib/firebase";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
<FirebaseAppWrapper>

      {children}
</FirebaseAppWrapper>
    </section>
  );
}
