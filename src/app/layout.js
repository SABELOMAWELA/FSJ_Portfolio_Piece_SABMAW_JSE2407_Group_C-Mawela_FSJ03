import "./globals.css";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";





export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body >
      <Navbar />
      <main>
      {children}
   </main>
   <Footer />
   </body>

    </html>
  );
}
