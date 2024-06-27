import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataFilePath);
  const parsedData = JSON.parse(jsonData);
  return parsedData.businessTrips;
};

export async function GET(request, {params}) {
    const data = readData();
    const id = Number(params.id);
    
    const object = data.find(item => item.id === id);
    if (!object) {
        return NextResponse.error('Object not found', { status: 404 });
    }
    return NextResponse.json(object);
  }