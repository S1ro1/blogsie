import { NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return new NextResponse('No URL provided', { status: 400 })
  }

  const res = await fetch(url!)
  const blob = await res.blob()
  const headers = new Headers()
  headers.set('Content-Type', 'image/*')
  return new NextResponse(blob, { status: 200, statusText: 'OK', headers })
}
