import Header from "./_components/Header";
import '../app/_styles/globals.css'
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ['latin']
})

export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: "%s | The Wild Oasis",
    default: 'Welcome | The Wild Oasis'
  },
  description: 'Luxurious cabin Hotel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-900 text-primary-50 min-h-screen flex flex-col`}>
        <Header/>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
