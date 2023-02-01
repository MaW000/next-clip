import "@/app/(site)/globals.css";
import Provider from "@/app/(site)/provider";
import Header from "./header";
export default function VideoLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Provider>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
