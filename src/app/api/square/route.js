import { NextResponse } from 'next/server';

const SQUARE_URL = `https://connect.squareup.com`;

export async function GET(request) {
  console.log('nothing');
  const url = `${SQUARE_URL}${'/v2/orders/search'}`;
  let headersWithDefault = {
    'Content-Type': 'application/json',
    'Square-Version': '2024-02-22',
  };

  headersWithDefault.Authorization = `Bearer EAAAljQTeSM8HFAHAJvpGaImWnV8h3XzGzG5Gv2IdHtegXYDk0LywN3zVCCcXDSN`;

  const fetchOptions = {
    method: 'POST',
    headers: headersWithDefault,
    withCredentials: true,
    credentials: 'include',
  };

  fetchOptions.body = JSON.stringify({
    query: {
      filter: {
        date_time_filter: {
          created_at: {
            start_at: '2025-02-01T17:55:00.000Z',
          },
        },
        state_filter: {
          states: ['COMPLETED'],
        },
      },
    },
    location_ids: ['L6RH2QJRF6HCD'],
  });

  const response = await fetch(url, fetchOptions);
  const jsonRes = await response.json();

  return NextResponse.json(jsonRes, { status: response.status });
}
