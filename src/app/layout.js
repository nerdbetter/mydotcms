import RenderNav from "@/components/NavBar";
import 'tailwindcss/tailwind.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RenderNav />
        {children}
      </body>
    </html>
  );
}
