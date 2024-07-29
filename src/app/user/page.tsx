'use client'
import { genSignEndPoint } from '../utils'
export default async function User() {
  const { sign, stime, version, nonce } = genSignEndPoint()
  // const inforUser = useSelector((state: RootState) => state.inforUser)
  const data = await fetch('http://localhost:4000/users/all', {
    headers: {
      'Content-Type': 'application/json',
      nonce,
      stime: stime.toString(),
      sign,
      version
    }
  })
  const user = await data.json()

  return (
    <div>
      {user &&
        user.data.map((i, index) => (
          <div key={index}>
            <p>ID: {i.name}</p>
            <p>Name: {i.email}</p>
          </div>
        ))}
    </div>
  )
}
