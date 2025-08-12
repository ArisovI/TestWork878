import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_TOKEN } from '@/shared/http/cookie'
import { http } from '@/shared/http/http'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(COOKIE_TOKEN.ACCESS)?.value

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token provided' },
        { status: 401 },
      )
    }

    const { status, data } = await http('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (status === 200) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: 'Invalid token' }, { status: status })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
