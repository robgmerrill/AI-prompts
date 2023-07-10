import '@styles/globals.css';

export const metadata = {
  title: 'Promptopia',
  description: 'A place to find inspiration for your next prompt.',
}

function RootLayout({children}: any) {
  return (
   <html lang='en'>
    <body>
      <div className='main'>
        <div className='gradient'></div>
      </div>
      <main className='app'>
        {children}
      </main>
    </body>
   </html>
  )
}

export default RootLayout