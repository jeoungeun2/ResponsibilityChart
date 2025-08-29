import Header from './_components/Header'

export default function ExecutiveFrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
