import './globals.css'
import Provider from './provider'
import Header from './header'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Provider>
          <main>
            {/* <Header /> */}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
