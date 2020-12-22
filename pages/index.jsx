import Link from 'next/link'

const HomePage = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/class-example">
            <a>Class Example</a>
          </Link>
        </li>
        <li>
          <Link href="/function-example">
            <a>Function Example</a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default HomePage